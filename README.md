# Site Domiric Contábil

Site estático (HTML/CSS/JS) para profissionais de saúde PJ: home + uma página por profissão.

## Como editar
O conteúdo das páginas fica em `tools/data.json` (profissões, dores, FAQ) e o layout em `tools/build.mjs`.
Depois de editar, gere as páginas:

```
node tools/build.mjs
```

Isso recria `index.html`, `<profissao>/index.html`, `sitemap.xml` e `robots.txt`.

## Regras de conteúdo (políticas do Google Ads)
- Não usar nomes de sistemas ou documentos do governo. Exceção decidida em 20/10/2026: o botão "Abrir o meu CNPJ" na home, aceitando o risco de reprovação ("Serviços oficiais e documentos do governo") no Google Ads. Se o anúncio for reprovado, trocar por "Abrir minha empresa" (tools/build.mjs).
- Não publicar números ou estatísticas que não tenham sido confirmados pelo cliente.
- Descrever o BPO como serviço operacional (contas a pagar e a receber, fluxo de caixa), sem linguagem de produto financeiro.

## Medição
Tag GA4 `G-FYGS9DL36L`. Eventos personalizados em `script.js`:
`whatsapp_click` (cliques em qualquer link do WhatsApp) e `generate_lead` (envio do formulário), ambos com o parâmetro `profession`.

## Deploy
Vercel, conectado a este repositório (branch `main` = produção). Outras branches geram pré-visualizações.
