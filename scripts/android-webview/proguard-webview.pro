# The page calls these methods by name (webview-bridge.js), so the code shrinker must not rename or remove them.
-keepclassmembers class com.synapsedojo.app.WebViewActivity$Bridge {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes RuntimeVisibleAnnotations
