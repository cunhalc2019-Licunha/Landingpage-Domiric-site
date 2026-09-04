# Landing Page — Domiric Contábil

Site estático (HTML/CSS/JS puro, sem build) pronto para publicar no GitHub Pages.

## Estrutura
```
site-domiric/
├── index.html
├── assets/
│   ├── styles.css
│   ├── script.js
│   └── logo-cropped.png
└── README.md
```

## Ver localmente
Basta abrir `index.html` no navegador, ou rodar um servidor local:
```
npx serve site-domiric
```

## Publicar no GitHub Pages
1. Crie um repositório novo no GitHub (ex: `domiric-site`).
2. No terminal, dentro da pasta `site-domiric`:
   ```
   git init
   git add .
   git commit -m "Landing page Domiric"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/domiric-site.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Source → branch `main` / pasta `/ (root)`** → Save.
4. Em ~1 minuto o site fica no ar em `https://SEU-USUARIO.github.io/domiric-site/`.

Se preferir um domínio próprio (ex: `domiric.com.br`), crie um arquivo `CNAME` na raiz com o domínio e aponte o DNS conforme a documentação do GitHub Pages.

## Antes de publicar, ajuste:
- **Números da seção de estatísticas** (`data-count` no `index.html`, seções `stats-bar` e `floating-stat`) — hoje são placeholders (10+, 300+, 100%, 24h).
- **Telefone/WhatsApp**: já usa o link real da bio do Instagram (`https://w.app/domiric`). Confirme se é o número certo.
- **Fotos**: o site usa ícones e ilustração (sem fotos de banco), já que não há gerador de imagem conectado ainda. Quando tiver fotos reais (equipe, escritório), dá pra substituir o cartão da seção hero (`.hero-card`) e os ícones de serviço por fotos reais — me avisa que eu ajusto o layout.
- **CRC / selos**: o badge "CRC" no rodapé da seção "Quem somos" está com texto genérico — troque pelo número de registro real.

## Identidade visual usada
- Cores extraídas por amostragem de pixel do logo e de posts reais do Instagram: `#001E32` (navy), `#1E8C50` (verde), `#4FB3A6` (teal do logo).
- Fonte: Poppins (Google Fonts), confirmada em `fontes-artes-domiric.pdf`.
- Estrutura e motion (scroll reveal, contadores animados, header sticky, cards flutuantes) inspirados em agilize.com.br, adaptados à identidade da Domiric.
- Botão flutuante do WhatsApp fixo no canto inferior direito, com animação de pulso.
