// Charge header.html et footer.html dans chaque page
// et marque le lien actif dans la nav

(function () {

  function charger(selector, fichier, callback) {
    var el = document.querySelector(selector);
    if (!el) return;
    fetch(fichier)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (callback) callback();
      });
  }

  function marquerActif() {
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav-menu a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('nav-actif');
      }
    });
    // Mettre l'année dans le footer
    var yr = document.getElementById('footer-year');
    if (yr) yr.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Charger header puis marquer le lien actif
    charger('#site-header', 'header.html', function () {
      marquerActif();
      // Re-init burger après injection du header
      if (typeof initBurger === 'function') initBurger();
    });
    // Charger footer
    charger('#site-footer', 'footer.html', function () {
      var yr = document.getElementById('footer-year');
      if (yr) yr.textContent = new Date().getFullYear();
    });
  });

})();

// ── Bouton retour en haut ─────────────────────────────────────────────────
(function () {
  var btn = document.createElement('button');
  btn.id = 'btn-top';
  btn.innerHTML = '↑';
  btn.title = 'Retour en haut';
  btn.setAttribute('aria-label', 'Retour en haut de la page');
  document.body.appendChild(btn);

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
