(function () {
  'use strict';

  var WA_NUMBER = '5511971246043';

  function track(name, params) {
    try {
      if (typeof gtag === 'function') gtag('event', name, params || {});
    } catch (e) { /* medição nunca deve quebrar o site */ }
  }

  var profession = document.body.getAttribute('data-profession') || 'geral';

  // Ano no rodapé
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menu móvel
  var toggle = document.getElementById('menuToggle');
  var navMobile = document.getElementById('navMobile');
  if (toggle && navMobile) {
    toggle.addEventListener('click', function () {
      var open = navMobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    navMobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navMobile.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // FAQ em acordeão
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Medição: cliques em qualquer link para o WhatsApp
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href*="w.app/domiric"], a[href*="wa.me"]') : null;
    if (!a) return;
    track('whatsapp_click', {
      profession: profession,
      link_location: a.getAttribute('data-loc') || 'link',
      page_path: location.pathname
    });
  });

  // Formulário: monta a mensagem e abre o WhatsApp
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var nome = (f.get('nome') || '').toString().trim();
      var tel = (f.get('telefone') || '').toString().trim();
      var prof = (f.get('profissao') || '').toString().trim();
      var msg = (f.get('mensagem') || '').toString().trim();

      var texto =
        'Olá! Sou ' + nome + (prof ? ' (' + prof + ')' : '') + '.\n' +
        'Quero conversar sobre contabilidade para a minha empresa.' +
        (msg ? '\nO que procuro: ' + msg : '') +
        '\nMeu WhatsApp: ' + tel;

      track('generate_lead', { profession: profession, form_profession: prof, page_path: location.pathname });

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(texto);
      var win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;
    });
  }
})();
