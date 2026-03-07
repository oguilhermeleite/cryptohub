# 📊 Guia de Analytics - CRYPTO AGGREGATOR

## Google Analytics ID: G-5S6MB3MSVV

---

## 🎯 O que está sendo rastreado

### ✅ Todos os cliques nas plataformas são rastreados automaticamente:

**Evento principal**: `platform_click`

**Parâmetros registrados**:
- `platform_name`: Nome da plataforma (ex: "Binance", "Camila P2P")
- `category`: Categoria da plataforma
  - **P2P**: Plataformas peer-to-peer
  - **Exchange**: Exchanges centralizadas
  - **Hot Wallet**: Carteiras quentes (software)
  - **Cold Wallet**: Carteiras frias (hardware)
  - **Crypto Card**: Cartões de débito cripto
  - **Digital Bank**: Bancos digitais com cripto
  - **DEX**: Exchanges descentralizadas
  - **Bridge**: Pontes entre blockchains
  - **Social**: Cliques nos perfis do Twitter/X
  - **Featured**: Cliques no parceiro em destaque
- `device`: Dispositivo usado (mobile ou desktop)
- `timestamp`: Data e hora do clique

---

## 📈 Como fazer relatórios mensais (a cada 15/30 dias)

### Método 1: Relatório Rápido (Manual)

1. Acesse: https://analytics.google.com
2. Selecione a propriedade: **G-5S6MB3MSVV**
3. Vá em: **Relatórios → Engajamento → Eventos**
4. Clique em `platform_click`
5. No canto superior direito, ajuste o período:
   - Últimos 15 dias
   - Últimos 30 dias
   - Personalizado (ex: 01/01 até 15/01)
6. Para exportar: **Compartilhar** (↗️) → **Fazer download** (CSV/PDF/Sheets)

**O que você verá**:
- Total de cliques
- Ranking das plataformas mais clicadas
- Comparação: mobile vs desktop
- Tendências ao longo do tempo

---

### Método 2: Dashboard Personalizado (RECOMENDADO)

#### Criar Dashboard:
1. No GA4, vá em: **Explorar** (menu lateral esquerdo)
2. Clique em: **Criar nova exploração**
3. Escolha: **Exploração de forma livre**
4. Configure:

**DIMENSÕES** (arraste para Linhas):
- `Nome do evento` (filtre: platform_click)
- `platform_name` (parâmetro personalizado)
- `category` (parâmetro personalizado)

**MÉTRICAS** (arraste para Valores):
- `Contagem de eventos`
- `Usuários`

**FILTROS**:
- Nome do evento = platform_click

5. Salve o dashboard: **Salvar** → Nome: "Ranking de Plataformas"

#### Agendar envio automático por email:
1. No dashboard criado, clique em: **Compartilhar** (ícone ↗️)
2. Selecione: **Programar email**
3. Configure:
   - **Frequência**: A cada 15 dias ou Mensalmente
   - **Dia**: Escolha o dia (ex: dia 1 e dia 15 de cada mês)
   - **Formato**: PDF ou Google Sheets
   - **Email**: Seu email

Pronto! Você receberá o relatório automaticamente no email.

---

### Método 3: Relatórios no Google Sheets (Atualização Automática)

1. No dashboard do GA4, clique em: **Compartilhar** → **Fazer download do arquivo**
2. Escolha: **Google Sheets**
3. O Google Sheets será criado com conexão ao vivo
4. Configure atualização automática:
   - No Sheets, vá em: **Dados → Conectores de dados → Atualizar**
   - Ou use Apps Script para atualização automática

---

## 📊 Principais métricas para acompanhar

### 1. **Plataformas Mais Clicadas (Geral)**
**Como ver**: Eventos → platform_click → Ordenar por "Contagem de eventos"

**Use para**:
- Identificar as plataformas mais populares
- Decidir onde colocar em destaque
- Negociar parcerias/afiliados baseado em tráfego

---

### 2. **Categoria Mais Popular**
**Como ver**: Eventos → platform_click → Filtrar por "category"

**Use para**:
- Entender o perfil do seu público
- Se P2P é mais clicado → público brasileiro buscando LocalBitcoins
- Se Exchange é mais clicado → traders ativos
- Se Wallet é mais clicado → usuários DeFi

---

### 3. **Cliques em Sites vs Cliques em Redes Sociais**
**Como ver**: Filtrar `category = "Social"` vs outras categorias

**Use para**:
- Taxa de engajamento social
- Quantos usuários querem seguir as plataformas vs usar diretamente

---

### 4. **Mobile vs Desktop**
**Como ver**: Adicionar dimensão "device" ao relatório

**Use para**:
- Otimizar experiência mobile se necessário
- Saber onde investir em melhorias de UX

---

### 5. **Conversão: Visualizações → Cliques**
**Como ver**: Comparar "page_view" vs "platform_click"

**Use para**:
- Taxa de conversão do site
- Exemplo: 1000 visualizações, 50 cliques = 5% conversão

---

## 🔍 Como analisar os dados

### Exemplo de relatório mensal:

```
Período: 01/01/2026 a 31/01/2026
Total de cliques: 1.245

TOP 10 PLATAFORMAS:
1. Binance - 234 cliques (18.8%) - Exchange
2. Camila P2P - 187 cliques (15.0%) - P2P
3. Bybit - 156 cliques (12.5%) - Exchange
4. Phantom - 98 cliques (7.9%) - Hot Wallet
5. Neobankless - 89 cliques (7.1%) - Featured
6. Pag Finance - 76 cliques (6.1%) - P2P
7. Revolut - 65 cliques (5.2%) - Digital Bank
8. MetaMask - 54 cliques (4.3%) - Hot Wallet
9. Uniswap - 43 cliques (3.5%) - DEX
10. Ledger - 38 cliques (3.1%) - Cold Wallet

POR CATEGORIA:
- Exchange: 456 cliques (36.6%)
- P2P: 312 cliques (25.1%)
- Hot Wallet: 198 cliques (15.9%)
- Digital Bank: 134 cliques (10.8%)
- DEX: 87 cliques (7.0%)
- Cold Wallet: 58 cliques (4.6%)

POR DISPOSITIVO:
- Mobile: 823 cliques (66.1%)
- Desktop: 422 cliques (33.9%)

REDES SOCIAIS:
- Cliques em "Seguir no X": 89 cliques
- Plataforma mais seguida: Binance (23 follows)
```

**Insights**:
- Exchanges são as mais populares → priorize parcerias com exchanges
- Mobile domina → mantenha experiência mobile perfeita
- P2P tem 25% dos cliques → público brasileiro interessado em compra direta

---

## ⏱️ Retenção de dados

**Google Analytics 4 (GA4)** retém dados por:
- **Padrão**: 2 meses
- **Máximo**: 14 meses (configure em Admin → Configurações de dados → Retenção de dados)

**Recomendação**: Configure para **14 meses** para manter histórico completo.

Para configurar:
1. GA4 → **Admin** (engrenagem)
2. **Configurações de dados** → **Retenção de dados**
3. Selecione: **14 meses**
4. Salvar

---

## ✅ Checklist mensal

Toda vez que for fazer o relatório:

- [ ] Acessar GA4 (analytics.google.com)
- [ ] Selecionar período (últimos 15 ou 30 dias)
- [ ] Ir em Eventos → platform_click
- [ ] Exportar relatório (CSV/PDF/Sheets)
- [ ] Analisar:
  - [ ] Top 10 plataformas mais clicadas
  - [ ] Categoria mais popular
  - [ ] Mobile vs Desktop
  - [ ] Taxa de cliques em redes sociais
- [ ] Tomar ações:
  - [ ] Destacar plataformas populares
  - [ ] Remover plataformas com 0 cliques
  - [ ] Negociar melhores comissões com top performers

---

## 🚨 Troubleshooting

### Eventos não aparecem?
1. Verifique se AdBlock está desativado
2. Abra F12 → Console
3. Clique em uma plataforma
4. Deve aparecer: `[Analytics] Tracking click: [Plataforma]`
5. Se não aparecer → cache do navegador (Ctrl+Shift+R)

### Dados estranhos?
- **Picos repentinos**: Pode ser bot/scraper
- **Cliques noturnos**: Fuso horário (GA4 usa GMT)
- **0 cliques em plataforma visível**: Link quebrado ou botão sem tracking

### Relatórios vazios?
- Aguarde 24-48h após implementação
- Verifique se o período selecionado está correto
- Confirme que há tráfego no site (Tempo Real)

---

## 📞 Suporte

**Google Analytics**: https://support.google.com/analytics
**Documentação GA4**: https://developers.google.com/analytics/devguides/collection/ga4

---

**Última atualização**: Janeiro 2026
**Implementado por**: Claude Code (Anthropic)
