package com.synapsedojo.app;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Insets;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.ViewGroup;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import androidx.core.content.FileProvider;
import androidx.webkit.WebSettingsCompat;
import androidx.webkit.WebViewFeature;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

/**
 * Shows the site in a full screen WebView on phones with no browser able to run a Trusted Web Activity
 * (for example Huawei phones without Google services), so that the app looks the same as on Google Play.
 *
 * The source of this file is scripts/android-webview/ in the repository; scripts/patch-android.mjs copies it into
 * the Android project that Bubblewrap generates. See docs/android.md.
 *
 * A WebView lacks a few things a browser does on its own, which are added here: choosing a file (importing a
 * save), saving a file made by the page (exporting a save, the calendar reminder, the share card), the system
 * share sheet, links to other sites, and system bars in the colour of the page.
 */
public class WebViewActivity extends Activity {
    private static final String TAG = "SynapseDojoWebView";
    private static final String EXTRA_URL = "com.synapsedojo.app.LAUNCH_URL";
    private static final String BRIDGE_NAME = "SynapseDojoAndroid";
    private static final String BRIDGE_ASSET = "webview-bridge.js";
    private static final String SHARED_DIR = "shared";
    private static final String PENDING_SAVE = "pending-save";
    private static final int REQUEST_PICK_FILE = 1;
    private static final int REQUEST_SAVE_FILE = 2;

    private FrameLayout mRoot;
    private WebView mWebView;
    private Uri mLaunchUrl;
    private String mBridgeScript = "";
    private ValueCallback<Uri[]> mFileCallback;

    public static Intent createLaunchIntent(Context context, Uri launchUrl) {
        Intent intent = new Intent(context, WebViewActivity.class);
        intent.putExtra(EXTRA_URL, launchUrl);
        return intent;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Uri home = Uri.parse(getString(R.string.launchUrl));
        Uri requested = getIntent().getParcelableExtra(EXTRA_URL);
        mLaunchUrl = requested != null && isInScope(requested, home) ? requested : home;
        mBridgeScript = readAsset(BRIDGE_ASSET);

        boolean night = (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK)
                == Configuration.UI_MODE_NIGHT_YES;
        int background = getColor(night ? R.color.colorPrimaryDark : R.color.colorPrimary);

        mRoot = new FrameLayout(this);
        mRoot.setBackgroundColor(background);
        if (Build.VERSION.SDK_INT >= 35) {
            // From Android 15 the window is drawn behind the system bars: keep the page clear of them, and of the
            // keyboard, which no longer resizes the window by itself.
            mRoot.setOnApplyWindowInsetsListener((view, insets) -> {
                Insets bars = insets.getInsets(WindowInsets.Type.systemBars()
                        | WindowInsets.Type.displayCutout() | WindowInsets.Type.ime());
                view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
                return WindowInsets.CONSUMED;
            });
        }
        setContentView(mRoot, new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        mWebView = new WebView(this);
        mWebView.setBackgroundColor(background);
        setUpWebView(night);
        mRoot.addView(mWebView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));

        if (Build.VERSION.SDK_INT >= 33) {
            // Apps targeting Android 16 no longer receive onBackPressed.
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    android.window.OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::goBackOrFinish);
        }

        if (savedInstanceState == null || mWebView.restoreState(savedInstanceState) == null) {
            mWebView.loadUrl(mLaunchUrl.toString());
        }
    }

    @SuppressWarnings("deprecation")
    private void setUpWebView(boolean night) {
        WebSettings settings = mWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true); // progress is saved in localStorage
        settings.setDatabaseEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setSupportMultipleWindows(false); // target="_blank" goes through shouldOverrideUrlLoading
        if (night && Build.VERSION.SDK_INT < 33
                && WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK)
                && WebViewFeature.isFeatureSupported(WebViewFeature.FORCE_DARK_STRATEGY)) {
            // Up to Android 12 this is what makes the page see `prefers-color-scheme: dark`, and the strategy keeps
            // the WebView from darkening the colours by itself, which would spoil the site's own dark theme.
            // From Android 13 the WebView follows the theme of the activity, which already follows the system.
            WebSettingsCompat.setForceDark(settings, WebSettingsCompat.FORCE_DARK_ON);
            WebSettingsCompat.setForceDarkStrategy(settings, WebSettingsCompat.DARK_STRATEGY_WEB_THEME_DARKENING_ONLY);
        }

        mWebView.addJavascriptInterface(new Bridge(), BRIDGE_NAME);
        mWebView.setDownloadListener((url, userAgent, disposition, mime, length) -> {
            Uri uri = Uri.parse(url);
            if ("https".equals(uri.getScheme()) || "http".equals(uri.getScheme())) openExternally(uri);
        });

        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                String scheme = uri.getScheme();
                boolean web = "https".equals(scheme) || "http".equals(scheme);
                if (!request.isForMainFrame()) {
                    // Frames (the Turnstile check) browse freely on the web, but never start other apps.
                    return !web && !"about".equals(scheme) && !"blob".equals(scheme) && !"data".equals(scheme);
                }
                if (isInScope(uri, mLaunchUrl)) return false;
                openExternally(uri);
                return true;
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                if (url != null && isInScope(Uri.parse(url), mLaunchUrl) && !mBridgeScript.isEmpty()) {
                    view.evaluateJavascript(mBridgeScript, null);
                }
            }

            @Override
            public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
                // The page's process crashed or was killed to free memory: start again instead of closing the app.
                mRoot.removeView(view);
                view.destroy();
                mWebView = null;
                recreate();
                return true;
            }
        });

        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (mFileCallback != null) mFileCallback.onReceiveValue(null);
                mFileCallback = callback;
                try {
                    startActivityForResult(params.createIntent(), REQUEST_PICK_FILE);
                } catch (ActivityNotFoundException e) {
                    try {
                        // Some file managers do not answer the page's own MIME types.
                        Intent any = new Intent(Intent.ACTION_GET_CONTENT);
                        any.addCategory(Intent.CATEGORY_OPENABLE);
                        any.setType("*/*");
                        startActivityForResult(any, REQUEST_PICK_FILE);
                    } catch (ActivityNotFoundException e2) {
                        mFileCallback = null;
                        return false;
                    }
                }
                return true;
            }
        });
    }

    /** The app shows only its own site: same scheme (https) and same host as the start address. */
    private static boolean isInScope(Uri uri, Uri home) {
        return "https".equalsIgnoreCase(uri.getScheme())
                && home.getHost() != null
                && home.getHost().equalsIgnoreCase(uri.getHost());
    }

    /** Other sites and other apps (WhatsApp, Telegram, e-mail) open outside, as they do from the browser. */
    private void openExternally(Uri uri) {
        try {
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            intent.addCategory(Intent.CATEGORY_BROWSABLE);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        } catch (ActivityNotFoundException | SecurityException e) {
            Log.w(TAG, "Nothing can open " + uri.getScheme() + " links");
        }
    }

    private void goBackOrFinish() {
        if (mWebView != null && mWebView.canGoBack()) mWebView.goBack();
        else finish();
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        goBackOrFinish();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_PICK_FILE) {
            if (mFileCallback != null) {
                mFileCallback.onReceiveValue(WebChromeClient.FileChooserParams.parseResult(resultCode, data));
                mFileCallback = null;
            }
        } else if (requestCode == REQUEST_SAVE_FILE) {
            File pending = new File(getCacheDir(), PENDING_SAVE);
            if (resultCode == RESULT_OK && data != null && data.getData() != null) {
                try (InputStream in = new FileInputStream(pending);
                     OutputStream out = getContentResolver().openOutputStream(data.getData())) {
                    if (out != null) copy(in, out);
                } catch (IOException | SecurityException e) {
                    Log.w(TAG, "Could not save the file", e);
                }
            }
            //noinspection ResultOfMethodCallIgnored
            pending.delete();
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        if (mWebView != null) mWebView.saveState(outState);
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mWebView != null) mWebView.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mWebView != null) mWebView.onResume();
    }

    @Override
    protected void onDestroy() {
        if (mWebView != null) {
            mRoot.removeView(mWebView);
            mWebView.destroy();
            mWebView = null;
        }
        super.onDestroy();
    }

    private String readAsset(String name) {
        try (InputStream in = getAssets().open(name)) {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            copy(in, out);
            return new String(out.toByteArray(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            Log.w(TAG, "Missing asset " + name);
            return "";
        }
    }

    private static void copy(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[16384];
        int n;
        while ((n = in.read(buffer)) > 0) out.write(buffer, 0, n);
    }

    /** A file name with no path in it, whatever the page sends. */
    private static String safeName(String name, String fallback) {
        String clean = name == null ? "" : name.replaceAll("[\\\\/:*?\"<>|\\p{Cntrl}]", "_").trim();
        if (clean.isEmpty() || clean.startsWith(".")) return fallback;
        return clean.length() > 100 ? clean.substring(clean.length() - 100) : clean;
    }

    private static byte[] decode(String base64) {
        try {
            return Base64.decode(base64 == null ? "" : base64, Base64.DEFAULT);
        } catch (IllegalArgumentException e) {
            return new byte[0];
        }
    }

    private boolean pageIsInScope() {
        String url = mWebView == null ? null : mWebView.getUrl();
        return url != null && isInScope(Uri.parse(url), mLaunchUrl);
    }

    private void saveFile(String name, String mime, byte[] bytes) {
        if (!pageIsInScope() || bytes.length == 0) return;
        try (OutputStream out = new FileOutputStream(new File(getCacheDir(), PENDING_SAVE))) {
            out.write(bytes);
        } catch (IOException e) {
            Log.w(TAG, "Could not prepare the file", e);
            return;
        }
        String type = mime == null || mime.isEmpty() ? "application/octet-stream" : mime;
        String fileName = safeName(name, "synapse-dojo");
        try {
            // The system "save as" screen: needs no storage permission on any Android version.
            Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            intent.setType(type);
            intent.putExtra(Intent.EXTRA_TITLE, fileName);
            startActivityForResult(intent, REQUEST_SAVE_FILE);
        } catch (ActivityNotFoundException e) {
            share("", "", fileName, type, bytes); // no file manager: at least it can be sent to another app
        }
    }

    private void share(String title, String text, String fileName, String fileMime, byte[] fileBytes) {
        if (!pageIsInScope()) return;
        Intent intent = new Intent(Intent.ACTION_SEND);
        if (!title.isEmpty()) intent.putExtra(Intent.EXTRA_SUBJECT, title);
        if (!text.isEmpty()) intent.putExtra(Intent.EXTRA_TEXT, text);
        intent.setType("text/plain");
        if (fileBytes.length > 0) {
            try {
                File dir = new File(getCacheDir(), SHARED_DIR);
                //noinspection ResultOfMethodCallIgnored
                dir.mkdirs();
                File file = new File(dir, safeName(fileName, "synapse-dojo"));
                try (OutputStream out = new FileOutputStream(file)) {
                    out.write(fileBytes);
                }
                Uri uri = FileProvider.getUriForFile(this, getString(R.string.providerAuthority), file);
                intent.setType(fileMime == null || fileMime.isEmpty() ? "application/octet-stream" : fileMime);
                intent.putExtra(Intent.EXTRA_STREAM, uri);
                intent.setClipData(ClipData.newRawUri(null, uri));
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            } catch (IOException | IllegalArgumentException e) {
                Log.w(TAG, "Could not attach the file", e);
            }
        }
        try {
            startActivity(Intent.createChooser(intent, null));
        } catch (ActivityNotFoundException e) {
            Log.w(TAG, "Nothing to share with");
        }
    }

    /**
     * What the page can ask the app, through webview-bridge.js. Both only open a system screen where the player
     * decides what happens, and both are ignored unless the page on show is the app's own site.
     */
    private final class Bridge {
        @JavascriptInterface
        public void saveFile(String name, String mime, String base64) {
            byte[] bytes = decode(base64);
            runOnUiThread(() -> WebViewActivity.this.saveFile(name, mime, bytes));
        }

        @JavascriptInterface
        public void share(String title, String text, String fileName, String fileMime, String fileBase64) {
            byte[] bytes = decode(fileBase64);
            runOnUiThread(() -> WebViewActivity.this.share(
                    title == null ? "" : title, text == null ? "" : text, fileName, fileMime, bytes));
        }
    }
}
