// Fill download versions, sizes and links from latest.json.
// The HTML already carries the current values as fallback, so the page
// stays correct even if this fetch fails.
(function () {
  function mb(bytes) {
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value !== undefined && value !== null) el.textContent = value;
  }

  function setHref(id, value) {
    var el = document.getElementById(id);
    if (el && value) el.href = value;
  }

  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
    } catch (e) { return iso; }
  }

  fetch('latest.json')
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (d.android) {
        setText('android-version', d.android.version);
        setText('android-date', fmtDate(d.android.published_at));
        setText('android-size', mb(d.android.size_bytes));
        setText('hero-android-meta', 'v' + d.android.version + ' · ' + mb(d.android.size_bytes));
        setHref('android-btn', d.android.url);
        setHref('hero-android-btn', d.android.url);
      }
      if (d.pc) {
        setText('pc-version', d.pc.version);
        setText('pc-date', fmtDate(d.pc.published_at));
        var win = d.pc.downloads && d.pc.downloads.windows;
        if (win) {
          setText('pc-windows-size', mb(win.size_bytes));
          setText('hero-pc-meta', 'v' + d.pc.version + ' · ' + mb(win.size_bytes));
          setHref('pc-windows-btn', win.url);
          setHref('hero-pc-btn', win.url);
        }
        var dl = d.pc.downloads || {};
        if (dl.linux_amd64) setHref('pc-linux-btn', dl.linux_amd64.url);
        if (dl.linux_arm64) setHref('pc-linux-arm-btn', dl.linux_arm64.url);
        if (dl.macos_arm64) setHref('pc-macos-btn', dl.macos_arm64.url);
        if (dl.macos_amd64) setHref('pc-macos-intel-btn', dl.macos_amd64.url);
        if (dl.extension) setHref('pc-extension-btn', dl.extension.url);
      }
    })
    .catch(function () { /* keep the hardcoded fallback values */ });
})();
