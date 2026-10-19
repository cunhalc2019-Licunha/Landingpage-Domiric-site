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
- Não usar a palavra "CNPJ" nem nomes de sistemas ou documentos do governo.
- Não publicar números ou estatísticas que não tenham sido confirmados pelo cliente.
- Descrever o BPO como serviço operacional (contas a pagar e a receber, fluxo de caixa), sem linguagem de produto financeiro.

## Medição
Tag GA4 `G-FYGS9DL36L`. Eventos personalizados em `script.js`:
`whatsapp_click` (cliques em qualquer link do WhatsApp) e `generate_lead` (envio do formulário), ambos com o parâmetro `profession`.

## Deploy
Vercel, conectado a este repositório (branch `main` = produção). Outras branches geram pré-visualizações.
