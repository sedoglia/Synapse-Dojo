// Run by WebViewActivity in the page after each load, only when the Android app shows the site in a WebView
// (phones with no browser able to run a Trusted Web Activity). It gives the page the two things a browser does
// on its own and a WebView does not: saving a file made by the page, and the system share sheet.
// The site needs no changes: `<a download>` and `navigator.share` keep working as in the browser.
(function () {
  var bridge = window.SynapseDojoAndroid;
  if (!bridge || window.__synapseDojoBridge) return;
  window.__synapseDojoBridge = true;

  function toBase64(blob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(String(reader.result).split(',')[1] || '');
      };
      reader.onerror = function () {
        reject(reader.error);
      };
      reader.readAsDataURL(blob);
    });
  }

  // The site's Content-Security-Policy does not allow fetching blob: URLs back, so the blobs are remembered
  // here when their URL is created, until the page revokes it.
  var blobs = new Map();
  var createObjectURL = URL.createObjectURL;
  var revokeObjectURL = URL.revokeObjectURL;
  URL.createObjectURL = function (object) {
    var url = createObjectURL.call(URL, object);
    if (object instanceof Blob) blobs.set(url, object);
    return url;
  };
  URL.revokeObjectURL = function (url) {
    blobs.delete(url);
    return revokeObjectURL.call(URL, url);
  };

  /** True when the link is a download of a file made by the page, which is then handed to the app. */
  function save(a) {
    if (!a.hasAttribute('download')) return false;
    var blob = blobs.get(a.href);
    if (!blob) return false;
    toBase64(blob)
      .then(function (base64) {
        bridge.saveFile(a.getAttribute('download') || '', blob.type || '', base64);
      })
      .catch(function () {});
    return true;
  }

  var click = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    if (!save(this)) click.call(this);
  };
  document.addEventListener(
    'click',
    function (event) {
      var a = event.target instanceof Element ? event.target.closest('a[download]') : null;
      if (a && save(a)) event.preventDefault();
    },
    true,
  );

  if (!navigator.share) {
    navigator.canShare = function (data) {
      return !!data && (!data.files || data.files.length === 1);
    };
    navigator.share = function (data) {
      data = data || {};
      var file = data.files && data.files[0];
      var text = [data.text, data.url].filter(Boolean).join('\n');
      var send = function (base64) {
        bridge.share(data.title || '', text, file ? file.name : '', file ? file.type : '', base64);
      };
      return file ? toBase64(file).then(send) : Promise.resolve().then(function () { send(''); });
    };
  }
})();
