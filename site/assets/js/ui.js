/* ============================================================
   Small UI behaviours: accordions (roadmap + FAQ) and the
   contact form placeholder. Smooth max-height animation.
   ============================================================ */
(function () {
  function setupAccordions(selector, headSel, bodySel) {
    var items = document.querySelectorAll(selector);
    items.forEach(function (item) {
      var head = item.querySelector(headSel);
      var body = item.querySelector(bodySel);
      if (!head || !body) return;
      head.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');

      function open() {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        head.setAttribute('aria-expanded', 'true');
      }
      function close() {
        item.classList.remove('open');
        body.style.maxHeight = '0px';
        head.setAttribute('aria-expanded', 'false');
      }
      if (item.classList.contains('open')) open();

      head.addEventListener('click', function () {
        if (item.classList.contains('open')) { close(); }
        else { open(); }
      });
    });

    // Recalculate open panels on resize (text reflow changes height)
    window.addEventListener('resize', function () {
      document.querySelectorAll(selector + '.open ' + bodySel).forEach(function (b) {
        b.style.maxHeight = b.scrollHeight + 'px';
      });
    });
  }

  function init() {
    setupAccordions('.acc', '.acc-head', '.acc-body');
    setupAccordions('.faq-item', '.faq-q', '.faq-a');

    var form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = document.getElementById('formSuccess');
        if (ok) ok.classList.add('show');
        form.reset();
      });
    }
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
