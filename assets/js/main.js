/* Crypto Coins News — site scripts
   Handles: responsive text fitting, navbar menu, FAQ accordion,
   smooth anchor scrolling, news filtering and the contact form. */
(function () {
  'use strict';

  /* ---------- Fit oversized display headings to their container ---------- */
  function fitText() {
    document.querySelectorAll('[data-fit-text]').forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      var available = parent.clientWidth;
      if (available <= 0) return;
      var prevDisplay = el.style.display;
      var prevWidth = el.style.width;
      el.style.fontSize = '16px';
      el.style.display = 'inline-block';
      el.style.width = 'max-content';
      var measured = el.scrollWidth;
      el.style.display = prevDisplay;
      el.style.width = prevWidth;
      if (measured <= 0) return;
      var size = Math.max(28, Math.min(1000, (available / measured) * 16 * 0.985));
      el.style.fontSize = size + 'px';
    });
  }
  window.addEventListener('resize', fitText);

  /* ---------- Navbar menu toggle ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var panel = document.querySelector('.site-menu-panel');
    if (!toggle || !panel) return;
    toggle.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!panel.classList.contains('is-open')) return;
      if (e.target.closest('nav[data-section="navbar"]')) return;
      panel.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var header = item.querySelector('.faq-question') || item;
      header.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        item.parentElement.querySelectorAll('.faq-item.is-open').forEach(function (other) {
          other.classList.remove('is-open');
        });
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }

  /* ---------- Smooth scrolling for in-page anchors ---------- */
  function initAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('href');
        if (id.length < 2) { e.preventDefault(); return; }
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- News category filter ---------- */
  function initNewsFilter() {
    var buttons = document.querySelectorAll('.filter-btn[data-filter]');
    var cards = document.querySelectorAll('[data-category]');
    if (!buttons.length || !cards.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var filter = btn.getAttribute('data-filter');
        cards.forEach(function (card) {
          var match = filter === 'all' || card.getAttribute('data-category') === filter;
          card.classList.toggle('hidden-card', !match);
        });
      });
    });
  }

  /* ---------- Contact form (client-side confirmation only) ---------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('contact-form-status');
      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var message = form.querySelector('[name="message"]');
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        if (status) {
          status.textContent = 'Please fill in all fields before sending.';
          status.style.display = 'block';
        }
        return;
      }
      if (status) {
        status.textContent = 'Thank you, ' + name.value.trim() +
          '! Your email app should open with the message ready to send. ' +
          'If it does not, email us directly at info@cryptocoinnews.com.';
        status.style.display = 'block';
      }
      var subject = 'Website contact from ' + name.value.trim();
      var bodyText = message.value.trim() + '\n\nFrom: ' + name.value.trim() + ' <' + email.value.trim() + '>';
      window.location.href = 'mailto:info@cryptocoinnews.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyText);
      form.reset();
    });
  }

  function init() {
    fitText();
    initNav();
    initFaq();
    initAnchors();
    initNewsFilter();
    initContactForm();
    /* Re-fit once fonts finish loading so widths are accurate */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitText);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
