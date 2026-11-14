// Adds the WebView screen to the Android project that Bubblewrap generates in android/ (docs/android.md §11).
//
// Bubblewrap rewrites the whole project at every `bubblewrap update`, so the additions live in
// scripts/android-webview/ and this script puts them back:
//
//   cd android; bubblewrap update --appVersionName=<version>; cd ..
//   npm run android:patch
//   cd android; bubblewrap build
//
// It can be run any number of times: what is already there is left alone. It stops with an error if the project
// that Bubblewrap generated no longer has the lines it expects (for example after a Bubblewrap upgrade).
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'scripts', 'android-webview');
const app = join(root, 'android', 'app');
const main = join(app, 'src', 'main');

const fail = (message) => {
  console.error(`patch-android: ${message}`);
  process.exit(1);
};

if (!existsSync(join(main, 'AndroidManifest.xml'))) {
  fail('android/app is missing: generate the project first (cd android; bubblewrap update --skipVersionUpgrade).');
}

const twa = JSON.parse(readFileSync(join(root, 'android', 'twa-manifest.json'), 'utf8'));
const javaDir = join(main, 'java', ...twa.packageId.split('.'));

const copy = (from, to) => {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`  copied  ${to.slice(root.length + 1)}`);
};

/** Inserts `text` right before `anchor`, unless the file already contains `marker`. */
const insertBefore = (file, marker, anchor, text) => {
  const name = file.slice(root.length + 1);
  const content = readFileSync(file, 'utf8');
  if (content.includes(marker)) {
    console.log(`  ok      ${name}`);
    return;
  }
  const at = content.indexOf(anchor);
  if (at < 0) fail(`${name} has no "${anchor.trim()}": Bubblewrap's template has changed, update this script.`);
  writeFileSync(file, content.slice(0, at) + text + content.slice(at));
  console.log(`  patched ${name}`);
};

console.log('Adding the WebView screen to the Android project:');

// 1. The screen itself, the script it runs in the page, its theme and the rules for the code shrinker.
const activity = readFileSync(join(source, 'WebViewActivity.java'), 'utf8');
if (!activity.includes(`package ${twa.packageId};`)) {
  fail(`WebViewActivity.java is not in the package ${twa.packageId} of twa-manifest.json.`);
}
copy(join(source, 'WebViewActivity.java'), join(javaDir, 'WebViewActivity.java'));
copy(join(source, 'webview-bridge.js'), join(main, 'assets', 'webview-bridge.js'));
copy(join(source, 'proguard-webview.pro'), join(app, 'proguard-webview.pro'));
for (const dir of readdirSync(join(source, 'res'))) {
  for (const file of readdirSync(join(source, 'res', dir))) {
    copy(join(source, 'res', dir, file), join(main, 'res', dir, file));
  }
}

// 2. The launcher opens it, instead of a browser tab, when no browser can run the Trusted Web Activity.
insertBefore(
  join(javaDir, 'LauncherActivity.java'),
  'WebViewActivity.createLaunchIntent',
  '    @Override\n    protected Uri getLaunchingUrl()',
  `    @Override
    protected com.google.androidbrowserhelper.trusted.TwaLauncher.FallbackStrategy getFallbackStrategy() {
        return (context, twaBuilder, providerPackage, completionCallback) -> {
            context.startActivity(WebViewActivity.createLaunchIntent(context, twaBuilder.getUri()));
            if (completionCallback != null) completionCallback.run();
        };
    }

`,
);

// 3. The manifest declares it, with the permissions a WebView needs: the network, and vibration for the haptic
//    feedback that the browser gives without asking.
const manifest = join(main, 'AndroidManifest.xml');
for (const permission of ['android.permission.INTERNET', 'android.permission.VIBRATE']) {
  insertBefore(manifest, `"${permission}"`, '    <application', `    <uses-permission android:name="${permission}" />\n\n`);
}
insertBefore(
  manifest,
  'android:name=".WebViewActivity"',
  '        <provider',
  `        <activity android:name=".WebViewActivity"
            android:theme="@style/SynapseWebView"
            android:exported="false"
            android:windowSoftInputMode="adjustResize"
            android:configChanges="orientation|screenSize|screenLayout|smallestScreenSize|keyboard|keyboardHidden|navigation" />

`,
);

// 4. Files shared from the page (the share card) are handed to other apps from this folder of the cache.
insertBefore(
  join(main, 'res', 'xml', 'filepaths.xml'),
  'name="shared"',
  '</paths>',
  '    <cache-path path="shared/" name="shared" />\n',
);

// 5. The code shrinker keeps the methods that the page calls by name.
insertBefore(
  join(app, 'build.gradle'),
  'proguard-webview.pro',
  '            minifyEnabled true',
  "            proguardFiles 'proguard-webview.pro'\n",
);

// 6. The library that lets the page use its own dark theme on Android 10-12.
insertBefore(
  join(app, 'build.gradle'),
  'androidx.webkit:webkit',
  "implementation 'com.google.androidbrowserhelper:androidbrowserhelper",
  "implementation 'androidx.webkit:webkit:1.8.0'\n        ",
);

console.log('Done. Now build: cd android; bubblewrap build');
