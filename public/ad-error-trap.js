// Global error and warning trap for third-party scripts (Google AdSense, auto-ads)
// Loaded via Next.js Script beforeInteractive
(function () {
  if (typeof window === 'undefined') return;

  function isSuppressedError(msg, src) {
    if (!msg && !src) return false;
    var str = (String(msg || '') + ' ' + String(src || '')).toLowerCase();
    return (
      str.indexOf('adsbygoogle') !== -1 ||
      str.indexOf('tagerror') !== -1 ||
      str.indexOf("all 'ins' elements") !== -1 ||
      str.indexOf('already have ads') !== -1 ||
      str.indexOf('no_div') !== -1 ||
      str.indexOf('pagead2') !== -1 ||
      str.indexOf('gsi_logger') !== -1 ||
      str.indexOf('encountered a script tag') !== -1
    );
  }

  // Intercept console.error and console.warn before dev overlays capture them
  var origConsoleError = console.error;
  console.error = function () {
    var argsStr = Array.prototype.slice.call(arguments).map(function (a) {
      return String((a && a.message) || a || '');
    }).join(' ');

    if (isSuppressedError(argsStr, '')) {
      return;
    }
    if (origConsoleError) origConsoleError.apply(console, arguments);
  };

  var origConsoleWarn = console.warn;
  console.warn = function () {
    var argsStr = Array.prototype.slice.call(arguments).map(function (a) {
      return String((a && a.message) || a || '');
    }).join(' ');

    if (isSuppressedError(argsStr, '')) {
      return;
    }
    if (origConsoleWarn) origConsoleWarn.apply(console, arguments);
  };

  window.addEventListener(
    'error',
    function (e) {
      if (
        e &&
        (isSuppressedError(e.message, e.filename) ||
          isSuppressedError(e.error && e.error.message, e.filename))
      ) {
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (e.preventDefault) e.preventDefault();
        return true;
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    function (e) {
      if (
        e &&
        (isSuppressedError(e.reason && e.reason.message, '') ||
          isSuppressedError(e.reason, ''))
      ) {
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (e.preventDefault) e.preventDefault();
      }
    },
    true
  );

  var origOnError = window.onerror;
  window.onerror = function (msg, url, line, col, err) {
    if (isSuppressedError(msg, url) || (err && isSuppressedError(err.message, url))) {
      return true;
    }
    if (origOnError) return origOnError.apply(this, arguments);
    return false;
  };
})();
