// Déclaré globalement pour être appelé par include.js après injection header
function initBurger() {

  var burger  = document.getElementById('burger');
  var nav     = document.getElementById('nav-menu');
  var overlay = document.getElementById('nav-overlay');
  var panel   = document.getElementById('dd-panel');

  // ── Burger ──────────────────────────────────────────────────────────────
  if (burger && nav && overlay) {
    burger.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('open');
      burger.classList.toggle('open', ouvert);
      overlay.classList.toggle('open', ouvert);
      document.body.style.overflow = ouvert ? 'hidden' : '';
    });
    overlay.addEventListener('click', fermerTout);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fermerTout();
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', fermerTout);
    });
  }

  function fermerTout() {
    if (burger)  burger.classList.remove('open');
    if (nav)     nav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    fermerPanel();
  }

  // ── Dropdown panel global ────────────────────────────────────────────────
  var groupeActif = null;
  var boutonActif = null;

  function ouvrirPanel(groupeId, btn) {
    if (!panel) { panel = document.getElementById('dd-panel'); }
    if (!panel) return;
    document.querySelectorAll('.dd-group').forEach(function (g) { g.style.display = 'none'; });
    var groupe = document.getElementById(groupeId);
    if (!groupe) return;
    groupe.style.display = 'block';
    positionnerPanel(btn);
    panel.style.display = 'block';
    groupeActif = groupeId;
    boutonActif = btn;
  }

  function positionnerPanel(btn) {
    if (!panel) return;
    var rect    = btn.getBoundingClientRect();
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var top     = rect.bottom + scrollY;
    var left    = rect.left;
    var largeur = Math.max(rect.width * 1.5, 180);
    var maxLeft = window.innerWidth - largeur - 8;
    if (left > maxLeft) left = maxLeft;
    if (left < 8)       left = 8;
    panel.style.top   = top + 'px';
    panel.style.left  = left + 'px';
    panel.style.right = 'auto';
    panel.style.width = largeur + 'px';
  }

  function fermerPanel() {
    if (!panel) { panel = document.getElementById('dd-panel'); }
    if (panel) panel.style.display = 'none';
    document.querySelectorAll('.dropbtn').forEach(function (b) { b.classList.remove('dd-actif'); });
    groupeActif = null;
    boutonActif = null;
  }

  // Fermer au scroll
  window.addEventListener('scroll', function () {
    if (groupeActif) fermerPanel();
  }, { passive: true });

  window.addEventListener('resize', function () {
    if (groupeActif && boutonActif) positionnerPanel(boutonActif);
  });

  document.addEventListener('click', function (e) {
    if (!panel || panel.style.display === 'none') return;
    if (!e.target.closest('.dropbtn') && !panel.contains(e.target)) fermerPanel();
  });

  var mapping = {
    'nos chiennes': 'dd-nos-chiennes',
    'portées':      'dd-portees',
    'portees':      'dd-portees',
  };

  document.querySelectorAll('.dropbtn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var label    = btn.textContent.trim().toLowerCase().replace(' ▾','').replace(' ▼','');
      var groupeId = mapping[label];
      if (!groupeId) return;
      if (groupeActif === groupeId) {
        fermerPanel();
      } else {
        fermerPanel();
        ouvrirPanel(groupeId, btn);
        btn.classList.add('dd-actif');
      }
    });
  });
}

// Appel immédiat si le header est déjà dans le DOM (pages sans include.js)
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('nav-menu')) initBurger();
});
