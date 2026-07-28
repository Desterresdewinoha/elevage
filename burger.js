document.addEventListener('DOMContentLoaded', function() {

  var burger  = document.getElementById('burger');
  var nav     = document.getElementById('nav-menu');
  var overlay = document.getElementById('nav-overlay');

  if (!burger || !nav || !overlay) return;

  // Ouvrir / fermer le burger
  burger.addEventListener('click', function() {
    var ouvert = nav.classList.toggle('open');
    burger.classList.toggle('open', ouvert);
    overlay.classList.toggle('open', ouvert);
    document.body.style.overflow = ouvert ? 'hidden' : '';
  });

  // Fermer via overlay
  overlay.addEventListener('click', function() {
    burger.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Fermer via Échap
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') overlay.click();
  });

  // Liens : fermer le menu au clic
  nav.querySelectorAll('a').forEach(function(a) {
    a.addEventListener('click', function() { overlay.click(); });
  });

  // Dropdowns : Nos chiennes / Portées
  nav.querySelectorAll('.dropbtn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var dd = this.nextElementSibling;
      var estOuvert = dd.style.display === 'block';
      nav.querySelectorAll('.dropdown-content').forEach(function(d) { d.style.display = 'none'; });
      dd.style.display = estOuvert ? 'none' : 'block';
    });
  });

  // Clic extérieur : fermer les dropdowns
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) {
      nav.querySelectorAll('.dropdown-content').forEach(function(d) { d.style.display = 'none'; });
    }
  });

});


// Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown > a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const dropdown = this.parentElement;
      dropdown.classList.toggle('open');
    }
  });
});
