document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  function closeMenu() {
    if (!header || !toggle) return;
    header.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (header && toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var selector = group.getAttribute('data-filter-group');
    var items = selector ? document.querySelectorAll(selector) : [];
    group.querySelectorAll('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        group.querySelectorAll('.chip').forEach(function (btn) {
          btn.setAttribute('aria-pressed', 'false');
        });
        chip.setAttribute('aria-pressed', 'true');
        var filter = chip.getAttribute('data-filter') || 'all';
        items.forEach(function (item) {
          var cats = (item.getAttribute('data-cat') || '').split(/\s+/);
          item.classList.toggle('is-hidden', filter !== 'all' && cats.indexOf(filter) < 0);
        });
      });
    });
  });

  var form = document.querySelector('form[data-validate]');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (el) {
        var field = el.closest('.field');
        var val = el.value.trim();
        var bad = !val || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val));
        if (field) field.classList.toggle('invalid', bad);
        if (bad) valid = false;
      });
      var alertBox = form.querySelector('.form-alert');
      if (valid) {
        if (alertBox) alertBox.style.display = 'block';
        form.reset();
      } else {
        if (alertBox) alertBox.style.display = 'none';
        var firstInvalid = form.querySelector('.invalid input, .invalid select, .invalid textarea');
        if (firstInvalid) firstInvalid.focus();
      }
    });
  }
});
