/* GP Investment Group Limited — site interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  /* TBD: configure the production form endpoint before launch, e.g.
     var FORM_ENDPOINT = 'https://api.gpinvestment.com/enquiry';
     When left as the placeholder, the form validates and shows the success
     state locally without sending data anywhere. */
  var FORM_ENDPOINT = 'FORM_ENDPOINT_PLACEHOLDER';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header scroll state ---------- */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
    }
    if (menu) menu.hidden = false; /* visibility handled by CSS transition */
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && menu) {
    /* stash localized aria-labels provided at build time */
    toggle.dataset.labelOpen = toggle.getAttribute('aria-label');
    toggle.dataset.labelClose = toggle.getAttribute('data-label-close') || toggle.getAttribute('aria-label');
    toggle.addEventListener('click', function () {
      setMenu(!document.body.classList.contains('menu-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
  }

  /* ---------- language switch persistence ---------- */
  document.querySelectorAll('[data-lang-switch]').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('gp-locale', a.getAttribute('data-lang-switch')); } catch (e) { /* private mode */ }
    });
  });

  /* ---------- reveal on scroll (fade-up, once) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    /* stagger siblings that share the same parent */
    var groups = new Map();
    revealEls.forEach(function (el) {
      var p = el.parentElement;
      var i = groups.get(p) || 0;
      el.style.transitionDelay = Math.min(i * 80, 480) + 'ms';
      groups.set(p, i + 1);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- count-up numbers ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = prefix + target.toLocaleString('en-US') + suffix; return; }
    var dur = 800;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = Math.round(target * eased);
      el.textContent = prefix + val.toLocaleString('en-US') + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- enquiry form ---------- */
  var form = document.getElementById('enquiry-form');
  if (form) {
    var locale = form.getAttribute('data-locale') || 'en';
    var msgs = {
      'zh-Hant': {
        required: form.dataset.msgRequired || '請填寫此欄位',
        email: form.dataset.msgEmail || '請輸入有效的電郵地址',
        phone: form.dataset.msgPhone || '請輸入有效的電話號碼',
        submitError: form.dataset.msgSubmitError || '提交時發生錯誤，請稍後再試，或直接電郵 info@gpinvestment.com。',
      },
      'zh-Hans': {
        required: form.dataset.msgRequired || '请填写此字段',
        email: form.dataset.msgEmail || '请输入有效的电邮地址',
        phone: form.dataset.msgPhone || '请输入有效的电话号码',
        submitError: form.dataset.msgSubmitError || '提交时发生错误，请稍后再试，或直接电邮 info@gpinvestment.com。',
      },
      en: {
        required: form.dataset.msgRequired || 'Please fill in this field',
        email: form.dataset.msgEmail || 'Please enter a valid email address',
        phone: form.dataset.msgPhone || 'Please enter a valid phone number',
        submitError: form.dataset.msgSubmitError || 'Something went wrong. Please try again later, or email info@gpinvestment.com directly.',
      },
    }[locale] || {};

    function fieldError(input, msg) {
      var err = document.getElementById(input.id + '-err');
      if (msg) {
        input.setAttribute('aria-invalid', 'true');
        if (err) { err.textContent = msg; err.hidden = false; }
        return false;
      }
      input.removeAttribute('aria-invalid');
      if (err) { err.textContent = ''; err.hidden = true; }
      return true;
    }
    function validate(input) {
      var v = input.value.trim();
      switch (input.name) {
        case 'name': return fieldError(input, v ? '' : msgs.required);
        case 'email':
          return fieldError(input, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : (v ? msgs.email : msgs.required));
        case 'phone':
          return fieldError(input, !v || /^[+\d][\d\s\-()]{5,20}$/.test(v) ? '' : msgs.phone);
        case 'message': return fieldError(input, v ? '' : msgs.required);
        default: return true;
      }
    }
    ['f-name', 'f-email', 'f-phone', 'f-message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('blur', function () { validate(el); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = ['f-name', 'f-email', 'f-phone', 'f-message'].map(function (id) { return document.getElementById(id); });
      var ok = fields.map(validate).every(Boolean);
      var globalErr = document.getElementById('f-global-err');
      if (globalErr) globalErr.hidden = true;
      if (!ok) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }
      var payload = {
        name: form.name.value.trim(),
        company: form.company.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        interest: form.interest.value,
        message: form.message.value.trim(),
        locale: locale,
      };
      function showSuccess() {
        form.hidden = true;
        var success = document.getElementById('form-success');
        if (success) { success.hidden = false; success.focus(); }
      }
      if (!FORM_ENDPOINT || FORM_ENDPOINT === 'FORM_ENDPOINT_PLACEHOLDER') {
        /* endpoint not configured yet (TBD) — validate locally only */
        showSuccess();
        return;
      }
      var submitBtn = form.querySelector('.form-submit');
      if (submitBtn) submitBtn.disabled = true;
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        showSuccess();
      }).catch(function () {
        if (globalErr) { globalErr.textContent = msgs.submitError; globalErr.hidden = false; }
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }
})();
