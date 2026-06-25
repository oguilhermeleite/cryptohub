# Plano: de catálogo → referência mundial de agregador cripto

**Data:** 2026-06-25
**Objetivo (na voz do dono):** "Ser referência brasileira e mundial para agregadores,
filtrando só o que realmente importa para quem está entrando em crypto e para quem já é do mercado."

> Status: PROPOSTA para aprovação. Nada implementado ainda. Execução por fases, uma de cada vez,
> respeitando integralmente a lista "NÃO ALTERAR" de `CURRENT_STATE.md`
> (hero, card-flip, cores/gradiente, temas, affiliate links, ratings/KYC badges, responsivo).

---

## 0. ESTRATÉGIA CENTRAL (decidida com o dono — 2026-06-25)

**O norte do negócio:** mostrar todo dia na live o número de acessos **crescendo** para
"contagiar" patrocinadores e usuários. **A receita vem do VOLUME de cliques em referral.**

**A sacada:** o número que mais convence patrocinador não é "visitantes" — é
**"cliques que mando pros parceiros"**, porque é literalmente o dinheiro entregue a eles.
✅ Verificado no código: o site **já registra** isso (evento `partner_click` em
`index.html` linhas 155 e 2158, via GA4 `G-5S6MB3MSVV`). O dado já existe — falta **exibir**.

### Recomendação técnica (pesquisada, 2026): GA4 + Netlify Function
O site é estático, mas está na **Netlify** (há `netlify.toml`/`_redirects`), que permite
**Functions** (mini-backend serverless). É a única forma segura de pôr um número REAL e público
na home (NUNCA chamar a API do GA4 direto do navegador — vaza a chave). Custo **R$ 0/mês**.
> Exceção consciente ao "frontend-only" do CLAUDE.md: uma function de ~40 linhas só de LEITURA.

### Os 3 níveis (do mais fácil ao mais completo)
1. **🟢 Hoje, zero código:** abrir o relatório **"Tempo real" do GA4** em tela cheia na live
   (usuários agora + mapa-múndi). Oficial Google, irrefutável. Criar bookmark. → *quick win imediato.*
2. **🟡 Contador no site:** Netlify Function lê GA4 (cache 30-60s) e um widget vanilla mostra
   *"X navegando agora" / "X acessos hoje" / "X cliques em parceiros essa semana"*. Setup único:
   service account no Google Cloud + chave em env var da Netlify.
3. **🔵 Gráfico de crescimento:** Looker Studio público (exige afrouxar `frame-src` do CSP +
   contornar `X-Frame-Options=DENY` do `netlify.toml`) — fica para depois.

### A regra de ouro — números reais, nunca inflados
Selo **"Fonte: Google Analytics"** ao lado do contador; o dono abre o painel real na frente do
patrocinador para provar. Número falso é risco legal (FTC 16 CFR Part 465, até US$51.744/violação)
e de reputação. **Disclosure de afiliado por card é obrigatório** (Guia CONAR vigente desde
01/06/2026) — sem isso a própria prova social vira passivo.

### Como isso REORDENA o roadmap
| Ordem | O quê | Por quê |
|---|---|---|
| **AGORA** | Nível 1 (Tempo real na live) + começar a Netlify Function (contador + cliques) | Ativo de marketing central; reaproveita GA4; R$0 |
| **AGORA** | Fase 0 (dados) — em paralelo | Fundação do produto, não conflita |
| **DEPOIS** | Otimizar funil de `partner_click` (CTAs, posição, copy) | Receita = volume de referral; vira o KPI-mestre |
| **DEPOIS** | Faixa de prova social honesta + disclosure de afiliado | Converte +; exigência legal |
| **DEPOIS** | Fase 1 (trilha + filtros) | Retém e aumenta cliques |
| **MAIS TARDE** | Fase 2 (curadoria), Nível 3 (Looker), Fase 3 (mundial/SEO) | Qualidade e escala de longo prazo |

### Pendência técnica encontrada (não urgente)
PostHog está **inicializado** (`index.html` linhas 330-332) mas o domínio `us.i.posthog.com`
**não está no CSP** (`connect-src`) — provavelmente os eventos PostHog estão sendo bloqueados.
Revisar: ou remover o PostHog, ou liberá-lo no CSP. Não afeta o GA4.

---

## 1. Diagnóstico

**O que o site é hoje:** um diretório de afiliados bem-feito — 54 plataformas em 12 categorias
(P2P, exchanges, wallets, cards, banks, cold wallets, trackers, DEXs, bridges, tax/legal),
com card-flip, ⭐ ratings, KYC badges, PT/EN/ES, ticker TradingView e bom visual.

**Por que ainda não é "referência":** todo visitante — iniciante e veterano — cai na mesma
parede de 54 cards. Isso é um *catálogo*. Uma *referência* não ganha por ter mais opções:
ganha por **filtrar, curar e provar**.

**As 4 lacunas (que são exatamente a frase do objetivo):**

| Lacuna | O que falta | Liga em qual público |
|---|---|---|
| Sem trilha por público | Não há "tô entrando" vs "já sou do mercado" | os dois |
| Sem filtro/comparação | Lista plana, sem filtrar por KYC/região/custódia/taxa nem comparar | decisão |
| Sem curadoria transparente | Não há "como escolhemos" nem "por que está aqui / melhor para" | confiança + SEO |
| BR-first, não mundial | P2P/bancos BR; sem consciência de região; EN/ES parciais | "mundial" |

**Dívida técnica que atrapalha escalar:**
- 54 cards estão **hardcoded** em `index.html` (134 KB) e **duplicados** em `all-platforms.html`
  (98 KB) — sincronizados à mão (daí os `LINK_AUDIT_REPORT.md` / `RESUMO_AUDITORIA.md`).
- `css/main.css` tem **320 KB**; muitos `!important` e overrides forçados.
- Repositório com lixo: `test-*.html`, `*-temp.txt`, `*.ps1`, `card-back-force-visible.css`,
  `dex-section-temp.txt`, etc. Uma "referência" também tem código limpo.

---

## 2. Princípio que guia tudo

> ## 🔒 REGRA Nº 1 — NENHUMA PLATAFORMA É REMOVIDA
> As **54 plataformas permanecem todas**, com seus affiliate links intactos. "Filtrar"
> aqui significa **ordenar, destacar e mostrar/esconder temporariamente** (botão de filtro) —
> **nunca apagar**. Soltar o filtro traz tudo de volta.

> **Filtrar não é esconder — é priorizar.** Mantemos a profundidade para o veterano,
> mas a *primeira tela* de cada público mostra primeiro o que importa para ele,
> com "ver tudo" sempre à mão.

---

## 3. Roadmap por fases

### Fase 0 — Fundação de dados *(habilita todas as outras)* — esforço: M
**O quê:** dar a cada plataforma atributos estruturados, sem reescrever o visual.
- Acrescentar `data-*` em cada `.platform-card`: `data-audience` (iniciante|intermediário|pro),
  `data-kyc` (sim|não), `data-region` (br|global|latam…), `data-custody` (custodial|self-custody),
  `data-fee` (faixa), `data-best-for` (texto curto), `data-category` (já implícito na seção).
- Criar `data/platforms.json` como **fonte única da verdade** (mesmos campos + link afiliado +
  "por que está aqui"). Curto prazo: alimenta filtros/compare/curadoria. Médio prazo: passa a
  **gerar** as duas páginas (resolve a sincronização manual `index` ↔ `all-platforms`).
- Definir o **critério de curadoria** (ver Fase 2) e preencher por card.

**Por que primeiro:** filtro, comparação, curadoria e camada mundial **todos** dependem desses dados.
Sem isto, cada fase vira gambiarra.
**Risco:** baixo — só adiciona atributos; não muda render nem estilos. SEO intacto (HTML continua server-side).

---

### Fase 1 — A espinha: trilha dupla + filtros + comparar — esforço: G
**1a. Escolha de público (topo da home).** Dois caminhos grandes logo após o hero:
`🌱 Tô entrando agora` e `📊 Já sou do mercado`. Guardar escolha em `localStorage`.
- **Iniciante:** caminho guiado em 3 passos — *Compre seu 1º BTC → Guarde com segurança →
  Use no dia a dia* — mostrando só as 2-3 melhores opções de menor atrito por passo.
  Categorias avançadas (DEX/bridge/trackers) recolhidas atrás de "ver tudo".
- **Veterano:** abre direto com filtros + dados (taxas, custódia) e seções avançadas em destaque.

**1b. Barra de filtros** (sticky): KYC / Sem-KYC / Região / Custódia / Taxa. Filtra via os
`data-*` da Fase 0 — mostra/esconde cards com transição, sem recarregar.

**1c. Modo comparar:** selecionar 2-3 cards → tabela lado a lado (taxa, KYC, custódia, região,
"melhor para"). Painel/drawer, mobile-first.

**Por que é o coração:** materializa "filtrando só o que importa para cada um". Valor imediato
para os dois públicos.
**Risco:** médio — é UI nova *em volta* do existente. Cards, flip, cores e links **não mudam**.

---

### Fase 2 — Curadoria transparente *(o que de fato vira "referência")* — esforço: M
- Página/seção **"Como escolhemos"**: critério explícito (liquidez, taxa, segurança/custódia,
  facilidade, suporte BR, histórico). Metodologia visível = confiança.
- Por card (no verso do flip, que já existe): **"Por que está aqui"** + **"Melhor para: …"** +
  **"Atualizado em <data>"**.
- Selos honestos de viés: deixar claro o que é link de afiliado (transparência aumenta confiança,
  não diminui).

**Por que importa:** é o que separa *referência confiável* de *muro de afiliados* — e é
exatamente o sinal de **E-E-A-T** que o Google usa para ranquear conteúdo de finanças (YMYL)
mundialmente.
**Risco:** baixo — conteúdo + pequenos blocos de UI.

---

### Fase 3 — Camada mundial + SEO — esforço: M/G
- **Região:** seletor (ou detecção) "Brasil / Global / …" que reordena e marca
  "⚠ indisponível no seu país". Usa `data-region`.
- **EN/ES de verdade:** auditar cobertura i18n (hoje há mistura, ex.: "Use cripto no dia a dia
  with cards"); meta tags `hreflang`; títulos/descrições traduzidos.
- **SEO técnico para virar referência buscável:** `schema.org` (`ItemList`/`Review`/`FAQPage`),
  Open Graph completo, sitemap, títulos por seção, conteúdo editorial indexável (não só cards).
**Risco:** médio — mexe em i18n (`js/script.js`) e `<head>`; testar PT/EN/ES.

---

### Fase 4 — Manutenção & frescor *(referência é mantida, não publicada)* — esforço: contínuo
- "Atualizado em" por categoria; changelog público curto.
- Checagem periódica de links/preços (parte já via API CoinGecko/TradingView).
- Gerar `index.html` + `all-platforms.html` a partir de `data/platforms.json` (fim da
  sincronização manual).
- Limpeza do repositório (remover `test-*.html`, `*-temp.txt`, `*.ps1` órfãos) — opcional,
  pode rodar em paralelo a qualquer fase.

---

## 4. Sequência recomendada

```
Fase 0 (dados)  →  Fase 1 (trilha+filtro+comparar)  →  Fase 2 (curadoria)  →  Fase 3 (mundial/SEO)
                                                                                    ↘ Fase 4 (contínua)
```

A Fase 0 é pré-requisito. Fases 2 e 3 podem trocar de ordem conforme prioridade
(confiança/conversão antes de alcance mundial, ou vice-versa).

---

## 5. Como sabemos que virou referência (métricas)

- **Engajamento:** % que escolhe uma trilha; uso de filtros; nº de comparações.
- **Confiança/conversão:** CTR nos affiliate links por card; tempo na página.
- **Alcance mundial:** tráfego orgânico EN/ES; posições no Google para "crypto on-ramp/off-ramp",
  "melhor exchange P2P Brasil", etc.; rich results (schema.org) aparecendo.
- **Frescor:** idade média do "atualizado em".

---

## 6. Restrições (inalteráveis)

Tudo da lista "NÃO ALTERAR" de `CURRENT_STATE.md`: texto do hero, card-flip, gradiente
laranja→laranja, temas claro/escuro, ratings/KYC badges, **affiliate links**, responsivo,
Analytics/Clarity. Toda fase é **aditiva**: constrói em volta do que já funciona.

---

## 7. Decisão pendente do dono

1. Aprovar este roadmap (ou ajustar ordem das fases 2/3).
2. Confirmar Fase 0 como ponto de partida.
3. Onde manter a fonte de dados: `data/platforms.json` (recomendado) vs. só `data-*` no HTML.
