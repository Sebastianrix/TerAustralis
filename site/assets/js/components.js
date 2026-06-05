/* ============================================================
   Shared site chrome: navigation + footer, injected into every
   page so markup stays consistent. Works over file:// and http://
   (pure DOM, no fetch). Set data-page on <body> to highlight the
   active nav link.
   ============================================================ */
(function () {
  var PAGES = [
    { id: 'home',    href: 'index.html',   label: 'Home' },
    { id: 'vision',  href: 'vision.html',  label: 'Vision' },
    { id: 'roadmap', href: 'roadmap.html', label: 'Roadmap' },
    { id: 'team',    href: 'team.html',    label: 'Team' },
    { id: 'faq',     href: 'faq.html',     label: 'FAQ' },
    { id: 'contact', href: 'contact.html', label: 'Contact' },
  ];

  var current = document.body.getAttribute('data-page') || 'home';

  /* ---- Navigation ---- */
  var navLinks = PAGES.map(function (p) {
    return '<li><a href="' + p.href + '"' + (p.id === current ? ' class="active"' : '') + '>' + p.label + '</a></li>';
  }).join('');

  var navHTML =
    '<nav class="nav">' +
      '<div class="nav-inner">' +
        '<a class="nav-logo" href="index.html">' +
          '<span class="mark">✦</span>' +
          '<span>TerAustralis<br><small>Incognita · Starbase Down Under</small></span>' +
        '</a>' +
        '<ul class="nav-links" id="navLinks">' + navLinks + '</ul>' +
        '<div class="nav-right">' +
          '<a class="btn btn-ghost btn-sm" href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">Follow on X</a>' +
          '<a class="btn btn-primary btn-sm" href="contact.html">Get Involved</a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="Toggle menu">☰</button>' +
        '</div>' +
      '</div>' +
    '</nav>';

  /* ---- Footer ---- */
  var footHTML =
    '<footer class="footer">' +
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<div class="nav-logo"><span class="mark">✦</span><span>TerAustralis</span></div>' +
            '<p class="footer-tag">Starbase Down Under — the Southern Hemisphere coordination layer for Earth-to-multiplanetary operations. From the red dust of the Pilbara to the stars.</p>' +
          '</div>' +
          '<div>' +
            '<h4>Explore</h4>' +
            '<div class="footer-links">' +
              '<a href="vision.html">Vision &amp; Map</a>' +
              '<a href="roadmap.html">Roadmap</a>' +
              '<a href="team.html">Team</a>' +
              '<a href="faq.html">FAQ</a>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<h4>Connect</h4>' +
            '<div class="footer-links">' +
              '<a href="contact.html">Contact</a>' +
              '<a href="https://x.com/TerAustralis" target="_blank" rel="noreferrer">Twitter / X</a>' +
              '<a href="https://github.com/sebastianrix/teraustralis" target="_blank" rel="noreferrer">GitHub</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' TerAustralis Incognita. All rights reserved.</span>' +
          '<span>Discovery Phase — conceptual &amp; consent-pending where cultural framing applies.</span>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var navMount = document.getElementById('site-nav');
  var footMount = document.getElementById('site-footer');
  if (navMount) navMount.innerHTML = navHTML;
  if (footMount) footMount.innerHTML = footHTML;

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* ---- Scroll reveal ---- */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }
  if (document.readyState !== 'loading') initReveal();
  else document.addEventListener('DOMContentLoaded', initReveal);
})();
