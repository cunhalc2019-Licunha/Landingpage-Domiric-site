// Gera as páginas estáticas do site da Domiric (home + uma página por profissão).
// Uso: node tools/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const data = JSON.parse(fs.readFileSync(path.join(here, 'data.json'), 'utf8'));
const { professions, faqGeral } = data;

const SITE = 'https://www.domiriccontabil.com.br';
const GA = 'G-FYGS9DL36L';
const WA = 'https://w.app/domiric';
const PHONE = '(11) 9 7124-6043';
const HOURS = 'Segunda a sexta, das 8h às 18h';
const INSTA = 'https://www.instagram.com/domiric.contabilidade/';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const icon = {
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  pulse: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
  scale: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M5 7h14M5 7l-3 7a3.5 3.5 0 007 0L5 7zm14 0l-3 7a3.5 3.5 0 007 0l-4-7z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z"/></svg>',
  trend: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17l6-6 4 4 8-9M15 6h6v6"/></svg>',
  folder: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h7l2 2h9v11H3V6z"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 11a4 4 0 10-8 0M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  wa: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.01 3C9.38 3 4 8.36 4 15c0 2.36.68 4.55 1.87 6.4L4 29l7.8-1.83A11.9 11.9 0 0016 27c6.63 0 12-5.36 12-12S22.64 3 16.01 3zm5.4 14.46c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.24-.46-2.37-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.24-.68.24-1.27.17-1.4-.07-.12-.27-.2-.56-.35z"/></svg>'
};

const professionIcons = ['pulse', 'users', 'scale', 'chat', 'trend', 'folder', 'check'];

function head({ title, desc, slug }) {
  const url = slug ? `${SITE}/${slug}/` : `${SITE}/`;
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA}');
</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="icon" href="/logo-cropped.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
</head>`;
}

function header() {
  const links = [
    ['/#para-quem', 'Para quem'],
    ['/#servicos', 'Serviços'],
    ['/#como-funciona', 'Como funciona'],
    ['/#duvidas', 'Dúvidas'],
    ['/#contato', 'Contato']
  ];
  const nav = links.map(([h, t]) => `<a href="${h}">${t}</a>`).join('');
  return `<div class="topbar"><div class="wrap"><span>Contabilidade para profissionais de saúde PJ</span><span class="hide-sm">${HOURS} · 100% online</span></div></div>
<header class="site" id="siteHeader">
  <div class="wrap nav">
    <a class="brand" href="/"><img src="/logo-cropped.png" alt="Domiric Contábil"></a>
    <nav class="links" aria-label="Principal">${nav}</nav>
    <a class="btn btn-primary btn-sm" href="${WA}" target="_blank" rel="noopener" data-loc="header">Falar no WhatsApp</a>
    <button class="menu-toggle" id="menuToggle" aria-label="Abrir menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
  <nav class="nav-mobile" id="navMobile" aria-label="Menu móvel">${nav}<a class="btn btn-primary" href="${WA}" target="_blank" rel="noopener" data-loc="menu-mobile">Falar no WhatsApp</a></nav>
</header>`;
}

function faq(items) {
  return `<div class="faq-list">${items
    .map(
      (it, i) => `<div class="faq-item${i === 0 ? ' open' : ''}">
      <button class="faq-q" aria-expanded="${i === 0}">${esc(it.q)}<span class="plus"></span></button>
      <div class="faq-a"><p>${esc(it.a)}</p></div>
    </div>`
    )
    .join('')}</div>`;
}

function form(current) {
  const opts = ['Médico(a)', 'Enfermeiro(a)', 'Anestesista', 'Psicólogo(a)', 'Fisioterapeuta', 'Nutricionista', 'Dentista', 'Outra área da saúde']
    .map((o) => `<option${current && o.toLowerCase().startsWith(current.singular.toLowerCase()) ? ' selected' : ''}>${o}</option>`)
    .join('');
  return `<form class="form-card" id="leadForm" data-profession="${current ? current.slug : 'geral'}">
    <h3>Prefere que a gente te chame?</h3>
    <p class="hint">Deixe seus dados e continue a conversa direto no WhatsApp.</p>
    <label for="fName">Nome</label>
    <input id="fName" name="nome" type="text" placeholder="Seu nome" required autocomplete="name">
    <label for="fPhone">WhatsApp</label>
    <input id="fPhone" name="telefone" type="tel" placeholder="(11) 90000-0000" required autocomplete="tel">
    <label for="fProf">Sou</label>
    <select id="fProf" name="profissao">${opts}</select>
    <label for="fMsg">O que você procura?</label>
    <textarea id="fMsg" name="mensagem" rows="3" placeholder="Ex.: revisar meu regime tributário, organizar minhas notas fiscais..."></textarea>
    <button type="submit" class="btn btn-primary btn-block">Enviar pelo WhatsApp</button>
    <p class="form-note">Ao enviar, você será redirecionado ao WhatsApp da Domiric com a sua mensagem pronta.</p>
  </form>`;
}

function contact(current) {
  return `<section id="contato" class="contact">
  <div class="wrap contact-grid">
    <div>
      <span class="eyebrow">Contato</span>
      <h2>${current ? `Vamos cuidar da contabilidade da sua empresa de ${esc(current.nome)}` : 'Vamos cuidar da contabilidade da sua empresa'}</h2>
      <p class="lead">Atendimento 100% online, em todo o Brasil. Fale com a equipe pelo WhatsApp e peça o seu diagnóstico tributário gratuito.</p>
      <ul class="contact-list">
        <li><strong>WhatsApp</strong><a href="${WA}" target="_blank" rel="noopener" data-loc="contato">${PHONE}</a></li>
        <li><strong>Horário</strong><span>${HOURS}</span></li>
        <li><strong>Instagram</strong><a href="${INSTA}" target="_blank" rel="noopener">@domiric.contabilidade</a></li>
      </ul>
    </div>
    ${form(current)}
  </div>
</section>`;
}

function footer() {
  const links = professions.map((p) => `<li><a href="/${p.slug}/">${p.singular}s</a></li>`).join('');
  return `<footer>
  <div class="wrap foot-grid">
    <div>
      <img class="foot-logo" src="/logo-cropped.png" alt="Domiric Contábil">
      <p>Contabilidade, organização financeira e RH terceirizado para profissionais de saúde que atuam como pessoa jurídica. 100% online.</p>
    </div>
    <div><h4>Para quem</h4><ul>${links}</ul></div>
    <div><h4>Contato</h4><ul>
      <li><a href="${WA}" target="_blank" rel="noopener" data-loc="rodape">WhatsApp ${PHONE}</a></li>
      <li><span>${HOURS}</span></li>
      <li><a href="${INSTA}" target="_blank" rel="noopener">@domiric.contabilidade</a></li>
    </ul></div>
  </div>
  <div class="wrap foot-bottom">
    <p>A Domiric é uma empresa privada de contabilidade, sem vínculo com órgãos governamentais.</p>
    <p>© <span id="year"></span> Domiric Serviços Contábeis LTDA. Todos os direitos reservados.</p>
  </div>
</footer>
<a href="${WA}" target="_blank" rel="noopener" class="wa-float" aria-label="Falar no WhatsApp com a Domiric" data-loc="flutuante">${icon.wa}<span class="wa-tip">Fale com um especialista</span></a>
<script src="/script.js"></script>
</body>
</html>`;
}

function steps() {
  const s = [
    ['Diagnóstico', 'Você conta sua rotina e seus números. Comparamos Simples Nacional e Lucro Presumido para a sua atividade.'],
    ['Plano', 'Definimos o enquadramento, a rotina de notas fiscais e a forma de retirada da empresa.'],
    ['Rotina cuidada', 'A contabilidade passa a rodar com a gente, e você acompanha tudo por WhatsApp.']
  ];
  return `<div class="steps">${s
    .map(([t, d], i) => `<div class="step"><div class="n">${i + 1}</div><h3>${t}</h3><p>${d}</p></div>`)
    .join('')}</div>`;
}

function home() {
  const cards = professions
    .map(
      (p, i) => `<a class="prof-card" href="/${p.slug}/">
      <span class="prof-icon">${icon[professionIcons[i % professionIcons.length]]}</span>
      <h3>${p.singular}s</h3>
      <p>${esc(p.resumo)}</p>
      <span class="prof-more">Ver página ${icon.arrow}</span>
    </a>`
    )
    .join('');

  const values = [
    ['pulse', 'Especialistas na rotina da saúde', 'Plantões, convênios, consultório e múltiplas fontes de recebimento fazem parte do nosso dia a dia.'],
    ['scale', 'Planejamento tributário', 'Comparamos Simples Nacional e Lucro Presumido com os seus números antes de você decidir.'],
    ['chat', 'Atendimento direto', '100% online, com especialista no WhatsApp, de segunda a sexta, das 8h às 18h.'],
    ['trend', 'De olho na Reforma Tributária', 'Acompanhamos a regulamentação e avisamos o que muda no seu enquadramento.']
  ]
    .map(([ic, t, d]) => `<div class="value-card"><span class="value-icon">${icon[ic]}</span><h3>${t}</h3><p>${d}</p></div>`)
    .join('');

  const services = [
    ['Contabilidade e planejamento tributário', 'Contabilidade mensal, apoio com notas fiscais, comparação de regimes, pró-labore e distribuição de lucros.', true],
    ['Organização financeira (BPO)', 'Contas a pagar e a receber, fluxo de caixa e relatórios, para quem quer o financeiro da empresa organizado.', false],
    ['RH terceirizado', 'Folha de pagamento, eSocial e avaliação de riscos psicossociais da NR-1, para quem já tem equipe.', false]
  ]
    .map(
      ([t, d, main]) =>
        `<article class="svc-card${main ? ' svc-main' : ''}"><h3>${t}</h3><p>${d}</p>${main ? '<span class="tag">Principal</span>' : ''}</article>`
    )
    .join('');

  return `${head({
    title: 'Domiric Contábil | Contabilidade para profissionais de saúde PJ',
    desc: 'Contabilidade para médicos, enfermeiros, anestesistas, psicólogos e outros profissionais de saúde PJ. Diagnóstico tributário gratuito e atendimento 100% online.'
  })}
<body data-profession="geral">
${header()}
<main>
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Contabilidade para profissionais de saúde PJ</span>
        <h1>Você cuida da saúde dos outros. <em>Nós cuidamos</em> da contabilidade da sua empresa.</h1>
        <p class="lead">Contabilidade especializada para médicos, enfermeiros, anestesistas, psicólogos e outros profissionais de saúde que atuam como pessoa jurídica. 100% online, com atendimento direto por WhatsApp.</p>
        <ul class="check-list">
          <li>${icon.check}Planejamento tributário: Simples Nacional ou Lucro Presumido</li>
          <li>${icon.check}Contabilidade mensal e apoio com notas fiscais</li>
          <li>${icon.check}Atendimento direto com especialista, sem fila</li>
        </ul>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="${WA}" target="_blank" rel="noopener" data-loc="hero">Falar no WhatsApp</a>
          <a class="btn btn-ghost" href="#para-quem">Escolher minha profissão</a>
        </div>
      </div>
      <aside class="hero-card">
        <span class="badge">Sem custo</span>
        <h2>Diagnóstico tributário gratuito</h2>
        <p>Compare Simples Nacional e Lucro Presumido com os seus números e descubra qual cenário faz mais sentido para a sua atividade.</p>
        <a class="btn btn-primary btn-block" href="${WA}" target="_blank" rel="noopener" data-loc="hero-card">Quero o meu diagnóstico</a>
      </aside>
    </div>
  </section>

  <section id="para-quem" class="section">
    <div class="wrap">
      <div class="section-head"><span class="eyebrow">Para quem</span><h2>Escolha a sua área de atuação</h2><p>Uma contabilidade que entende a rotina de quem trabalha na saúde, em cada profissão.</p></div>
      <div class="prof-grid">${cards}</div>
    </div>
  </section>

  <section class="section alt">
    <div class="wrap">
      <div class="section-head"><span class="eyebrow">Por que a Domiric</span><h2>Menos burocracia, mais tempo para os seus pacientes</h2></div>
      <div class="value-grid">${values}</div>
    </div>
  </section>

  <section id="servicos" class="section">
    <div class="wrap">
      <div class="section-head"><span class="eyebrow">Serviços</span><h2>Contabilidade no centro, com apoio quando a empresa cresce</h2></div>
      <div class="svc-grid">${services}</div>
    </div>
  </section>

  <section id="como-funciona" class="section alt">
    <div class="wrap">
      <div class="section-head"><span class="eyebrow">Como funciona</span><h2>Do diagnóstico à rotina em três passos</h2></div>
      ${steps()}
    </div>
  </section>

  <section id="duvidas" class="section">
    <div class="wrap narrow">
      <div class="section-head"><span class="eyebrow">Dúvidas frequentes</span><h2>Perguntas antes de falar com a gente</h2></div>
      ${faq(faqGeral)}
    </div>
  </section>

  ${contact(null)}
</main>
${footer()}`;
}

function professionPage(p) {
  const dores = p.dores.map((d) => `<li>${esc(d)}</li>`).join('');
  const ajuda = p.ajuda.map((a) => `<li>${icon.check}<span>${esc(a)}</span></li>`).join('');
  const faqItems = [...p.faq, faqGeral[3], faqGeral[4]];
  return `${head({
    title: `${p.titulo} | Domiric Contábil`,
    desc: `${p.titulo}: ${p.sub} Diagnóstico tributário gratuito e atendimento 100% online.`,
    slug: p.slug
  })}
<body data-profession="${p.slug}">
${header()}
<main>
  <section class="hero hero-prof">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Domiric · ${esc(p.singular)}s PJ</span>
        <h1>${esc(p.titulo)}</h1>
        <p class="lead">${esc(p.sub)}</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="${WA}" target="_blank" rel="noopener" data-loc="hero">Falar no WhatsApp</a>
          <a class="btn btn-ghost" href="#contato">Receber contato</a>
        </div>
        <p class="micro">Diagnóstico tributário gratuito · 100% online · ${HOURS}</p>
      </div>
      <aside class="hero-card">
        <span class="badge">Sem custo</span>
        <h2>Diagnóstico tributário gratuito</h2>
        <p>Compare Simples Nacional e Lucro Presumido com os números da sua atividade como ${esc(p.nome.replace(/s$/, ''))}.</p>
        <a class="btn btn-primary btn-block" href="${WA}" target="_blank" rel="noopener" data-loc="hero-card">Quero o meu diagnóstico</a>
      </aside>
    </div>
  </section>

  <section class="section">
    <div class="wrap two-col">
      <div>
        <span class="eyebrow">O dia a dia</span>
        <h2>O que costuma pesar para ${esc(p.nome)} PJ</h2>
        <ul class="pain-list">${dores}</ul>
      </div>
      <div>
        <span class="eyebrow">Como ajudamos</span>
        <h2>Contabilidade pensada para a sua rotina</h2>
        <ul class="help-list">${ajuda}</ul>
        <a class="btn btn-primary" href="${WA}" target="_blank" rel="noopener" data-loc="ajuda">Conversar com um especialista</a>
      </div>
    </div>
  </section>

  <section class="section alt">
    <div class="wrap">
      <div class="section-head"><span class="eyebrow">Como funciona</span><h2>Do diagnóstico à rotina em três passos</h2></div>
      ${steps()}
    </div>
  </section>

  <section id="duvidas" class="section">
    <div class="wrap narrow">
      <div class="section-head"><span class="eyebrow">Dúvidas frequentes</span><h2>Perguntas de quem é ${esc(p.singular.toLowerCase())} PJ</h2></div>
      ${faq(faqItems)}
      <p class="other-prof">Atuação diferente? <a href="/#para-quem">Veja as outras áreas da saúde atendidas</a>.</p>
    </div>
  </section>

  ${contact(p)}
</main>
${footer()}`;
}

function write(rel, content) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  console.log('gerado', rel);
}

write('index.html', home());
for (const p of professions) write(`${p.slug}/index.html`, professionPage(p));

const urls = ['', ...professions.map((p) => `${p.slug}/`)].map((u) => `  <url><loc>${SITE}/${u}</loc></url>`).join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
