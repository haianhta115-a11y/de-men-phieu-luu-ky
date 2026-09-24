(function () {
  'use strict';

  // 1. Chặn chuột phải (Context menu)
  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);

  // 2. Chặn phím tắt mở DevTools, F12, Xem mã nguồn (View Source)
  window.addEventListener('keydown', function (e) {
    // F12
    if (e.keyCode === 123 || e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67 || e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+U (View Source), Ctrl+S (Save Page), Ctrl+P (Print)
    if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 80 || e.key === 'u' || e.key === 's' || e.key === 'p' || e.key === 'U' || e.key === 'S' || e.key === 'P')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Mac Cmd+Option+I / Cmd+Option+J / Cmd+U
    if (e.metaKey && (e.altKey && (e.key === 'i' || e.key === 'j' || e.key === 'c') || e.key === 'u' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // 3. Chặn bôi đen và kéo thả nội dung
  document.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, true);
  document.addEventListener('dragstart', function (e) { e.preventDefault(); return false; }, true);

  // 4. Vô hiệu hóa toàn bộ Console (Chống soi biến/hàm)
  try {
    const noop = function () {};
    ['log', 'debug', 'info', 'warn', 'error', 'dir', 'dirxml', 'table', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp'].forEach(function (method) {
      window.console[method] = noop;
    });
    Object.freeze(window.console);
  } catch (err) {}

  // 5. Anti-Debugging Loop (Treo DevTools nếu người dùng cố tình mở qua Menu trình duyệt)
  function antiDebug() {
    function trap() {
      try {
        (function () {
          return false;
        }['constructor']('debugger')());
      } catch (e) {}
    }
    setInterval(trap, 350);
  }
  antiDebug();
})();
