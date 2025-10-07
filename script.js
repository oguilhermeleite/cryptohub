// Crypto Agregator - Enhanced JavaScript with Modal System and Horizontal Scrolling

class CryptoAgregator {
    constructor() {
        this.currentLang = this.getStoredLanguage() || 'pt';
        this.translations = {
            pt: {
                'hero-title': 'Sua porta de entrada completa para o Mundo Cripto',
                'hero-subtitle': 'Encontre a melhor forma de comprar, vender e usar criptomoedas com segurança.',
                'hero-cta': 'Começar Agora',
                'nav-featured': 'Destaques',
                'nav-cards': 'Cartões',
                'nav-banks': 'Bancos Digitais',
                'nav-hot-wallets': 'Hot Wallets',
                'nav-cold-wallets': 'Cold Wallets',
                'featured-title': 'Destaques',
                'featured-subtitle': 'Plataforma em destaque da nossa comunidade',
                'theme-toggle': 'Tema',
                'p2p-subtitle': 'Compra e venda direto entre pessoas',
                'exchanges-subtitle': 'Trading e conversão de criptomoedas',
                'cards-title': 'Cartões Cripto',
                'cards-subtitle': 'Use cripto no dia a dia com cartões',
                'banks-title': 'Bancos Digitais',
                'banks-subtitle': 'Bancos digitais com recursos crypto integrados',
                'hot-wallets-title': 'Hot Wallets',
                'hot-wallets-subtitle': 'Carteiras online conectadas à internet para uso diário',
                'cold-wallets-title': 'Cold Wallets',
                'cold-wallets-subtitle': 'Carteiras físicas offline para máxima segurança',
                'partner-badge': 'Parceiro Oficial',
                'bitget-hero-description': 'Carteira Web3 multi-chain líder com suporte completo a DeFi, NFTs e trading. Milhões de usuários confiam na Bitget para gerenciar seus ativos digitais com segurança.',
                'bitget-cta': 'Acessar Agora',
                'feature-secure': '100% Seguro',
                'feature-fast': 'Ultra Rápido',
                'feature-multichain': 'Multi-Chain',
                'visit-site': 'Visitar Site',
                'back': 'Voltar',
                'footer-desc': 'Sua porta de entrada completa para o mundo cripto',
                'footer-services': 'Serviços',
                'footer-rights': 'Todos os direitos reservados.'
            },
            en: {
                'hero-title': 'Your complete gateway to the Crypto World',
                'hero-subtitle': 'Find the best way to buy, sell and use cryptocurrencies safely.',
                'hero-cta': 'Get Started',
                'nav-featured': 'Featured',
                'nav-cards': 'Cards',
                'nav-banks': 'Digital Banks',
                'nav-hot-wallets': 'Hot Wallets',
                'nav-cold-wallets': 'Cold Wallets',
                'featured-title': 'Featured',
                'featured-subtitle': 'Featured platform in our community',
                'theme-toggle': 'Theme',
                'p2p-subtitle': 'Direct buying and selling between people',
                'exchanges-subtitle': 'Trading and cryptocurrency conversion',
                'cards-title': 'Crypto Cards',
                'cards-subtitle': 'Use crypto daily with cards',
                'banks-title': 'Digital Banks',
                'banks-subtitle': 'Digital banks with integrated crypto features',
                'hot-wallets-title': 'Hot Wallets',
                'hot-wallets-subtitle': 'Online wallets connected to the internet for daily use',
                'cold-wallets-title': 'Cold Wallets',
                'cold-wallets-subtitle': 'Offline physical wallets for maximum security',
                'partner-badge': 'Official Partner',
                'bitget-hero-description': 'Leading multi-chain Web3 wallet with complete support for DeFi, NFTs and trading. Millions of users trust Bitget to manage their digital assets securely.',
                'bitget-cta': 'Access Now',
                'feature-secure': '100% Secure',
                'feature-fast': 'Ultra Fast',
                'feature-multichain': 'Multi-Chain',
                'visit-site': 'Visit Site',
                'back': 'Back',
                'footer-desc': 'Your complete gateway to the crypto world',
                'footer-services': 'Services',
                'footer-rights': 'All rights reserved.'
            }
        };

        // Platform data with affiliate links and descriptions
        this.platformData = {
            'bitget-featured': {
                name: 'Bitget Wallet',
                url: 'https://newshare.bwb.global/pt_br/invite_earn_coin?inviteCode=VdkFyq&deepLinkType=card&utmSource=referral2.0_copyLink',
                logo: 'https://logo.clearbit.com/bitget.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=bitget.com&sz=64',
                description: {
                    pt: `💼 O que é:
Carteira Web3 multi-chain líder mundial com suporte completo a DeFi, NFTs e trading. Milhões de usuários confiam na Bitget para gerenciar seus ativos digitais com segurança máxima.

👥 Para quem é:
Usuários que querem uma carteira completa para interagir com DeFi, colecionar NFTs e fazer trading diretamente do app.

💎 O que oferece:
- Suporte a 100+ blockchains diferentes
- Trading integrado com DEX e CEX
- Gerenciamento de NFTs e colecionáveis
- Staking e yield farming simplificado
- Backup em nuvem criptografado

🎯 Diferencial:
Interface intuitiva que une simplicidade para iniciantes com recursos avançados para usuários experientes. Tudo em um só lugar.

⚠️ Bom saber:
- Você controla suas chaves privadas (self-custody)
- Sempre faça backup da seed phrase
- Disponível para iOS, Android e extensão de navegador

💰 Ideal para: Quem busca uma carteira moderna e completa para explorar todo o ecossistema Web3 com segurança.`,
                    en: `💼 What it is:
World-leading multi-chain Web3 wallet with complete support for DeFi, NFTs and trading. Millions of users trust Bitget to manage their digital assets with maximum security.

👥 Who it's for:
Users who want a complete wallet to interact with DeFi, collect NFTs and trade directly from the app.

💎 What it offers:
- Support for 100+ different blockchains
- Integrated trading with DEX and CEX
- NFT and collectibles management
- Simplified staking and yield farming
- Encrypted cloud backup

🎯 Differentiator:
Intuitive interface that combines simplicity for beginners with advanced features for experienced users. Everything in one place.

⚠️ Good to know:
- You control your private keys (self-custody)
- Always backup your seed phrase
- Available for iOS, Android and browser extension

💰 Ideal for: Those seeking a modern and complete wallet to explore the entire Web3 ecosystem with security.`
                }
            },
            'comprecripto': {
                name: 'Compre Cripto',
                url: 'https://comprecripto.io/?ref=mqm',
                logo: 'https://logo.clearbit.com/comprecripto.io',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=comprecripto.io&sz=64',
                description: {
                    pt: `🤝 O que é:
Plataforma brasileira P2P especializada em compra e venda de Bitcoin e criptomoedas. Conecta você diretamente com vendedores verificados para transações rápidas e seguras.

👥 Para quem é:
Brasileiros que querem comprar Bitcoin e outras criptos de forma simples, usando PIX, TED ou DOC.

💎 O que oferece:
- Compra instantânea via PIX
- Vendedores verificados e avaliados
- Suporte ao cliente em português
- Proteção em todas as transações
- Processo 100% online e desburocratizado

🎯 Diferencial:
Foco total em simplicidade para iniciantes. Interface limpa e processo de compra em poucos cliques, ideal para quem está começando.

⚠️ Bom saber:
- Use o cupom MQM para desconto nas taxas
- Não precisa ter carteira própria para começar
- Transações protegidas por sistema de garantia

💰 Ideal para: Iniciantes que querem comprar sua primeira cripto de forma simples e segura, com suporte brasileiro.`,
                    en: `🤝 What it is:
Brazilian P2P platform specialized in buying and selling Bitcoin and cryptocurrencies. Connects you directly with verified sellers for fast and secure transactions.

👥 Who it's for:
Brazilians who want to buy Bitcoin and other cryptos simply, using PIX, TED or DOC.

💎 What it offers:
- Instant purchase via PIX
- Verified and rated sellers
- Customer support in Portuguese
- Protection on all transactions
- 100% online and unbureaucratic process

🎯 Differentiator:
Total focus on simplicity for beginners. Clean interface and purchase process in just a few clicks, ideal for those starting out.

⚠️ Good to know:
- Use coupon MQM for discount on fees
- No need to have your own wallet to start
- Transactions protected by guarantee system

💰 Ideal for: Beginners who want to buy their first crypto simply and safely, with Brazilian support.`
                }
            },
            'p2pme': {
                name: 'P2P.me',
                url: 'https://br.p2p.me/recommend?address=0xa4884FEA51387224e6039b6903EeeFE24Fab7251&nonce=559537&signature=0x9561591564c21ffb8be3a4d7a8ecf0d1d45cbae59469cb24359cbc70ffa4cde86aa2cb0151e158667a4622af32aba022d5d22427a2b250d8810a334e8a5714401b',
                logo: 'https://logo.clearbit.com/p2p.me',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=p2p.me&sz=64',
                description: {
                    pt: `🤝 O que é:
Marketplace P2P global descentralizado que conecta compradores e vendedores de criptomoedas ao redor do mundo. Negocie direto com outras pessoas sem intermediários.

👥 Para quem é:
Usuários que valorizam privacidade, descentralização e querem negociar cripto diretamente com outros usuários globalmente.

💎 O que oferece:
- Trading P2P totalmente descentralizado
- Múltiplas criptomoedas suportadas
- Sem custódia de fundos pela plataforma
- Sistema de reputação transparente
- Várias opções de pagamento aceitas

🎯 Diferencial:
Plataforma verdadeiramente descentralizada onde você mantém controle total dos seus fundos. Sem KYC obrigatório para negociações básicas.

⚠️ Bom saber:
- Você é responsável pela segurança das suas chaves
- Verifique sempre a reputação da contraparte
- Disponível globalmente com suporte multilíngue

💰 Ideal para: Quem busca máxima privacidade e descentralização nas negociações P2P de criptomoedas.`,
                    en: `🤝 What it is:
Global decentralized P2P marketplace that connects cryptocurrency buyers and sellers worldwide. Trade directly with other people without intermediaries.

👥 Who it's for:
Users who value privacy, decentralization and want to trade crypto directly with other users globally.

💎 What it offers:
- Fully decentralized P2P trading
- Multiple cryptocurrencies supported
- No custody of funds by the platform
- Transparent reputation system
- Various payment options accepted

🎯 Differentiator:
Truly decentralized platform where you maintain full control of your funds. No mandatory KYC for basic trading.

⚠️ Good to know:
- You are responsible for securing your keys
- Always check the counterparty's reputation
- Available globally with multilingual support

💰 Ideal for: Those seeking maximum privacy and decentralization in P2P cryptocurrency trading.`
                }
            },
            'camilap2p': {
                name: 'Camila P2P',
                url: 'https://camilap2p.com.br',
                logo: 'https://www.google.com/s2/favicons?domain=camilap2p.com.br&sz=128',
                fallbackLogo: 'https://logo.clearbit.com/camilap2p.com.br',
                description: {
                    pt: `🤝 O que é:
Plataforma brasileira especializada em negociação P2P de Bitcoin e outras criptomoedas. Conecta compradores e vendedores diretamente com segurança e agilidade.

👥 Para quem é:
Brasileiros que querem comprar ou vender cripto com PIX, TED ou transferência, direto com outras pessoas.

💎 O que oferece:
- Negociação direta via PIX instantâneo
- Suporte personalizado em português
- Sistema de reputação de vendedores
- Proteção contra golpes e disputas
- Taxas competitivas do mercado brasileiro

🎯 Diferencial:
Atendimento humanizado e foco total no mercado brasileiro. Você negocia com pessoas reais e tem suporte quando precisar.

⚠️ Bom saber:
- Use o cupom MQM para ganhar desconto nas taxas
- Verifique sempre a reputação do vendedor
- Transações são protegidas por sistema de custódia

💰 Ideal para: Quem prefere negociar direto com pessoas, com atendimento brasileiro e pagamento via PIX.`,
                    en: `🤝 What it is:
Brazilian platform specialized in P2P trading of Bitcoin and other cryptocurrencies. Connects buyers and sellers directly with security and agility.

👥 Who it's for:
Brazilians who want to buy or sell crypto with PIX, TED or transfer, directly with other people.

💎 What it offers:
- Direct trading via instant PIX
- Personalized support in Portuguese
- Seller reputation system
- Protection against scams and disputes
- Competitive fees in the Brazilian market

🎯 Differentiator:
Humanized service and total focus on the Brazilian market. You trade with real people and have support when you need it.

⚠️ Good to know:
- Use coupon MQM to get discount on fees
- Always check seller reputation
- Transactions protected by custody system

💰 Ideal for: Those who prefer to trade directly with people, with Brazilian support and payment via PIX.`
                }
            },
            'binance': {
                name: 'Binance',
                url: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_0001DCF8M6',
                logo: 'https://logo.clearbit.com/binance.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=binance.com&sz=64',
                description: {
                    pt: `🏆 O que é:
Maior exchange de criptomoedas do mundo com mais de 150 milhões de usuários. Plataforma completa para comprar, vender, investir e ganhar com criptomoedas.

👥 Para quem é:
Desde iniciantes querendo comprar sua primeira cripto até traders profissionais que operam futuros e margin.

💎 O que oferece:
- Mais de 350 criptomoedas disponíveis
- Trading spot, futuros e margin
- Staking com rendimentos atrativos
- P2P integrado para compra com PIX
- Cartão Visa para gastar cripto no dia a dia

🎯 Diferencial:
Maior liquidez do mercado e variedade incomparável de produtos. Da compra simples com PIX até trading profissional avançado.

⚠️ Bom saber:
- Requer verificação de identidade (KYC)
- Taxas competitivas a partir de 0.1%
- Suporte em português 24/7

💰 Ideal para: Quem quer a plataforma mais completa do mercado com todas as opções de investimento e trading em cripto.`,
                    en: `🏆 What it is:
World's largest cryptocurrency exchange with over 150 million users. Complete platform to buy, sell, invest and earn with cryptocurrencies.

👥 Who it's for:
From beginners wanting to buy their first crypto to professional traders operating futures and margin.

💎 What it offers:
- Over 350 cryptocurrencies available
- Spot, futures and margin trading
- Staking with attractive yields
- Integrated P2P for PIX purchases
- Visa card to spend crypto daily

🎯 Differentiator:
Highest market liquidity and unmatched variety of products. From simple PIX purchase to advanced professional trading.

⚠️ Good to know:
- Requires identity verification (KYC)
- Competitive fees starting at 0.1%
- 24/7 Portuguese support

💰 Ideal for: Those who want the most complete platform on the market with all crypto investment and trading options.`
                }
            },
            'bybit': {
                name: 'Bybit',
                url: 'https://www.bybit.com/invite?ref=YNAGP8',
                logo: 'https://logo.clearbit.com/bybit.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=bybit.com&sz=64',
                description: {
                    pt: `🏆 O que é:
Exchange global especializada em trading de derivativos e futuros de criptomoedas. Uma das maiores plataformas do mundo com milhões de traders ativos.

👥 Para quem é:
Traders intermediários a avançados que querem operar futuros, perpétuos e usar alavancagem em suas operações.

💎 O que oferece:
- Contratos futuros com alavancagem até 100x
- Trading spot de criptomoedas principais
- Copy trading para seguir traders experientes
- Ferramentas avançadas de análise técnica
- Programa de recompensas e cashback

🎯 Diferencial:
Líder em derivativos cripto com engine de trading ultra-rápida e sem delays. Interface profissional com ferramentas de análise de primeira linha.

⚠️ Bom saber:
- Trading com alavancagem envolve alto risco
- Necessário completar verificação KYC
- Taxas competitivas a partir de 0.1%

💰 Ideal para: Traders que querem operar futuros e derivativos em uma plataforma profissional e confiável.`,
                    en: `🏆 What it is:
Global exchange specialized in cryptocurrency derivatives and futures trading. One of the world's largest platforms with millions of active traders.

👥 Who it's for:
Intermediate to advanced traders who want to trade futures, perpetuals and use leverage in their operations.

💎 What it offers:
- Futures contracts with leverage up to 100x
- Spot trading of major cryptocurrencies
- Copy trading to follow experienced traders
- Advanced technical analysis tools
- Rewards and cashback program

🎯 Differentiator:
Leader in crypto derivatives with ultra-fast trading engine and no delays. Professional interface with top-tier analysis tools.

⚠️ Good to know:
- Leveraged trading involves high risk
- KYC verification required
- Competitive fees starting at 0.1%

💰 Ideal for: Traders who want to operate futures and derivatives on a professional and reliable platform.`
                }
            },
            'kraken': {
                name: 'Kraken',
                url: 'https://invite.kraken.com/JDNW/de6w7cmj',
                logo: 'https://logo.clearbit.com/kraken.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=kraken.com&sz=64',
                description: {
                    pt: `🏦 O que é:
Exchange americana fundada em 2011, uma das mais antigas e confiáveis do mercado. Altamente regulamentada e reconhecida por sua segurança e transparência.

👥 Para quem é:
Investidores que valorizam segurança máxima, regulamentação e querem uma plataforma confiável para holdings de longo prazo.

💎 O que oferece:
- Mais de 200 criptomoedas listadas
- Trading spot, margin e futuros
- Staking com rendimentos competitivos
- Depósitos em moedas fiduciárias (USD, EUR)
- Segurança bancária com cold storage

🎯 Diferencial:
Exchange americana totalmente regulamentada com histórico impecável de segurança. Nunca sofreu hack em mais de 10 anos de operação.

⚠️ Bom saber:
- Requer verificação de identidade completa
- Interface pode parecer complexa para iniciantes
- Suporte multi-idioma disponível

💰 Ideal para: Investidores sérios que querem máxima segurança e regulamentação para proteger seus investimentos cripto.`,
                    en: `🏦 What it is:
American exchange founded in 2011, one of the oldest and most trusted in the market. Highly regulated and recognized for its security and transparency.

👥 Who it's for:
Investors who value maximum security, regulation and want a reliable platform for long-term holdings.

💎 What it offers:
- Over 200 cryptocurrencies listed
- Spot, margin and futures trading
- Staking with competitive returns
- Fiat currency deposits (USD, EUR)
- Bank-grade security with cold storage

🎯 Differentiator:
Fully regulated American exchange with impeccable security track record. Never been hacked in over 10 years of operation.

⚠️ Good to know:
- Requires complete identity verification
- Interface may seem complex for beginners
- Multi-language support available

💰 Ideal for: Serious investors who want maximum security and regulation to protect their crypto investments.`
                }
            },
            'mexc': {
                name: 'MEXC',
                url: 'https://promote.mexc.com/a/Q26ooE1o',
                logo: 'https://www.google.com/s2/favicons?domain=mexc.com&sz=128',
                fallbackLogo: 'https://logo.clearbit.com/mexc.com',
                description: {
                    pt: `🏆 O que é:
Exchange global com foco em listagem rápida de novos projetos. Plataforma com mais de 1.500 criptomoedas e tokens, incluindo as mais recentes do mercado.

👥 Para quem é:
Traders que buscam acesso antecipado a novos tokens e projetos emergentes antes de chegarem nas grandes exchanges.

💎 O que oferece:
- Mais de 1.500 criptomoedas listadas
- Lançamentos e IEOs de novos projetos
- Trading spot, margin e futuros
- Programa de Kickstarter para novas moedas
- Alta liquidez e taxas competitivas

🎯 Diferencial:
Lista novos tokens muito mais rápido que outras exchanges. Perfeito para quem quer entrar cedo em projetos promissores.

⚠️ Bom saber:
- Novos tokens têm maior volatilidade e risco
- Verificação KYC necessária para saques
- App disponível para iOS e Android

💰 Ideal para: Traders que querem acesso antecipado a novos projetos e maior variedade de criptomoedas disponíveis.`,
                    en: `🏆 What it is:
Global exchange focused on fast listing of new projects. Platform with over 1,500 cryptocurrencies and tokens, including the latest market launches.

👥 Who it's for:
Traders seeking early access to new tokens and emerging projects before they reach major exchanges.

💎 What it offers:
- Over 1,500 cryptocurrencies listed
- New project launches and IEOs
- Spot, margin and futures trading
- Kickstarter program for new coins
- High liquidity and competitive fees

🎯 Differentiator:
Lists new tokens much faster than other exchanges. Perfect for those who want to get in early on promising projects.

⚠️ Good to know:
- New tokens have higher volatility and risk
- KYC verification required for withdrawals
- App available for iOS and Android

💰 Ideal for: Traders who want early access to new projects and greater variety of available cryptocurrencies.`
                }
            },
            'bitget': {
                name: 'Bitget Wallet',
                url: 'https://newshare.bwb.global/pt_br/invite_earn_coin?inviteCode=VdkFyq&deepLinkType=card&utmSource=referral2.0_copyLink',
                logo: 'https://logo.clearbit.com/bitget.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=bitget.com&sz=64',
                description: {
                    pt: 'Carteira Web3 multi-chain com suporte a DeFi, NFTs e trading. Interface amigável para iniciantes e avançados.',
                    en: 'Multi-chain Web3 wallet with DeFi, NFTs and trading support. User-friendly interface for beginners and advanced users.'
                }
            },
            'kast': {
                name: 'Kast Finance',
                url: 'https://kastfinance.app.link/CLE47K9D',
                logo: 'https://www.google.com/s2/favicons?domain=kast.xyz&sz=128',
                fallbackLogo: 'https://logo.clearbit.com/usekast.com',
                description: {
                    pt: `💳 O que é:
Cartão de débito cripto brasileiro que permite gastar suas criptomoedas no dia a dia. Converta automaticamente crypto para reais e use em qualquer lugar.

👥 Para quem é:
Brasileiros que querem usar suas criptomoedas para compras do dia a dia sem precisar vender manualmente.

💎 O que oferece:
- Cartão de débito Mastercard internacional
- Conversão automática crypto para BRL
- Aceito em milhões de estabelecimentos
- Cashback em criptomoedas
- App completo para gestão dos gastos

🎯 Diferencial:
Solução 100% brasileira e regulamentada. Gaste crypto tão fácil quanto usar um cartão de débito normal, com suporte local.

⚠️ Bom saber:
- Necessário completar verificação KYC
- Taxas de conversão se aplicam
- Suporte em português disponível

💰 Ideal para: Quem quer usar crypto no dia a dia para compras e pagamentos com a praticidade de um cartão.`,
                    en: `💳 What it is:
Brazilian crypto debit card that allows you to spend your cryptocurrencies daily. Automatically convert crypto to reais and use anywhere.

👥 Who it's for:
Brazilians who want to use their cryptocurrencies for daily purchases without having to manually sell.

💎 What it offers:
- International Mastercard debit card
- Automatic crypto to BRL conversion
- Accepted at millions of establishments
- Cryptocurrency cashback
- Complete app for expense management

🎯 Differentiator:
100% Brazilian and regulated solution. Spend crypto as easily as using a regular debit card, with local support.

⚠️ Good to know:
- KYC verification required
- Conversion fees apply
- Portuguese support available

💰 Ideal for: Those who want to use crypto daily for purchases and payments with the convenience of a card.`
                }
            },
            'offramp': {
                name: 'Offramp',
                url: 'https://app.offramp.xyz/login?referralCode=iokost',
                logo: 'https://logo.clearbit.com/offramp.xyz',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=offramp.xyz&sz=64',
                description: {
                    pt: `💳 O que é:
Plataforma global para converter e gastar criptomoedas no mundo real. Solução completa que transforma crypto em dinheiro disponível para uso imediato.

👥 Para quem é:
Usuários de crypto que querem facilidade para gastar seus ativos digitais em compras do dia a dia, viagens e pagamentos.

💎 O que oferece:
- Conversão rápida crypto para moeda local
- Cartão virtual e físico disponível
- Aceito globalmente em milhões de locais
- Sem taxas de manutenção mensal
- Integração com principais blockchains

🎯 Diferencial:
Foco em experiência de usuário simplificada. Converta e gaste crypto em poucos cliques, sem complicação.

⚠️ Bom saber:
- Disponível em diversos países
- Taxas de conversão transparentes
- App intuitivo para iOS e Android

💰 Ideal para: Nômades digitais e usuários crypto que querem liberdade para gastar seus ativos em qualquer lugar do mundo.`,
                    en: `💳 What it is:
Global platform to convert and spend cryptocurrencies in the real world. Complete solution that transforms crypto into money available for immediate use.

👥 Who it's for:
Crypto users who want ease in spending their digital assets on daily purchases, travel and payments.

💎 What it offers:
- Fast crypto to local currency conversion
- Virtual and physical card available
- Globally accepted at millions of locations
- No monthly maintenance fees
- Integration with major blockchains

🎯 Differentiator:
Focus on simplified user experience. Convert and spend crypto in a few clicks, without complication.

⚠️ Good to know:
- Available in several countries
- Transparent conversion fees
- Intuitive app for iOS and Android

💰 Ideal for: Digital nomads and crypto users who want freedom to spend their assets anywhere in the world.`
                }
            },
            'etherfi': {
                name: 'Ether.fi',
                url: 'https://www.ether.fi/refer/6ad38ada',
                logo: 'https://logo.clearbit.com/ether.fi',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=ether.fi&sz=64',
                description: {
                    pt: `💳 O que é:
Protocolo DeFi focado em staking líquido de Ethereum e cartão cripto integrado. Ganhe rendimentos com ETH enquanto mantém liquidez e acesso aos seus fundos.

👥 Para quem é:
Holders de Ethereum que querem ganhar recompensas de staking sem perder acesso aos seus ETH, com bônus de cartão cripto.

💎 O que oferece:
- Staking líquido de Ethereum (eETH)
- Cartão de débito cripto integrado
- Rendimentos competitivos em ETH
- Tokens líquidos negociáveis em DeFi
- Protocolo descentralizado e seguro

🎯 Diferencial:
Combine staking de ETH com gastos no mundo real. Ganhe rendimentos enquanto tem um cartão para usar suas cryptos.

⚠️ Bom saber:
- Requer conhecimento básico de DeFi
- Smart contracts auditados por empresas líderes
- Disponível via aplicativo e extensão de navegador

💰 Ideal para: Holders de Ethereum que querem maximizar rendimentos e ter flexibilidade de gastar crypto quando precisar.`,
                    en: `💳 What it is:
DeFi protocol focused on Ethereum liquid staking and integrated crypto card. Earn yields with ETH while maintaining liquidity and access to your funds.

👥 Who it's for:
Ethereum holders who want to earn staking rewards without losing access to their ETH, with crypto card bonus.

💎 What it offers:
- Ethereum liquid staking (eETH)
- Integrated crypto debit card
- Competitive ETH yields
- Tradeable liquid tokens in DeFi
- Decentralized and secure protocol

🎯 Differentiator:
Combine ETH staking with real-world spending. Earn yields while having a card to use your cryptos.

⚠️ Good to know:
- Requires basic DeFi knowledge
- Smart contracts audited by leading firms
- Available via app and browser extension

💰 Ideal for: Ethereum holders who want to maximize yields and have flexibility to spend crypto when needed.`
                }
            },
            'revolut': {
                name: 'Revolut',
                url: 'https://revolut.com/referral/?referral-code=waldir3l75!SEP1-25-AR-MDL-ROI&geo-redirect',
                logo: 'https://logo.clearbit.com/revolut.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=revolut.com&sz=64',
                description: {
                    pt: `🏦 O que é:
Banco digital global com mais de 30 milhões de clientes que integra serviços bancários tradicionais com criptomoedas. Tudo em um único app moderno.

👥 Para quem é:
Pessoas que querem um banco completo e moderno que oferece tanto serviços tradicionais quanto acesso fácil a criptomoedas.

💎 O que oferece:
- Compra e venda de 50+ criptomoedas
- Conta bancária internacional multimoeda
- Cartão de débito e virtual
- Investimentos em ações e commodities
- Transferências internacionais baratas

🎯 Diferencial:
Banco digital completo que une mundo tradicional e cripto em um só lugar. Interface moderna e intuitiva para gerenciar tudo.

⚠️ Bom saber:
- Disponível em diversos países (verificar disponibilidade)
- Planos gratuito e premium disponíveis
- Crypto não pode ser enviada para carteiras externas

💰 Ideal para: Quem quer uma solução all-in-one que combine banco digital moderno com acesso simples a criptomoedas.`,
                    en: `🏦 What it is:
Global digital bank with over 30 million customers that integrates traditional banking services with cryptocurrencies. Everything in a single modern app.

👥 Who it's for:
People who want a complete and modern bank that offers both traditional services and easy access to cryptocurrencies.

💎 What it offers:
- Buy and sell 50+ cryptocurrencies
- International multi-currency bank account
- Debit and virtual card
- Stock and commodity investments
- Cheap international transfers

🎯 Differentiator:
Complete digital bank that unites traditional and crypto worlds in one place. Modern and intuitive interface to manage everything.

⚠️ Good to know:
- Available in several countries (check availability)
- Free and premium plans available
- Crypto cannot be sent to external wallets

💰 Ideal for: Those who want an all-in-one solution that combines modern digital banking with simple access to cryptocurrencies.`
                }
            },
            'xverse': {
                name: 'Xverse Wallet',
                url: 'https://www.xverse.app/?utm_campaign=dogdamassa&fbclid=PAZnRzaANI0IBleHRuA2FlbQIxMQABpxeUZWEqzLu82FgMlCTcA4tRAwBA-H4ilQnR2PCxs4r78yqbldkLOKz4SvmN_aem_R_LGjSLfZSg96jqS-fbWwA',
                logo: 'https://xverse.app/favicon.ico',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=xverse.app&sz=64',
                description: {
                    pt: `🔥 O que é:
Carteira Bitcoin focada em Ordinals e NFTs na rede Bitcoin. Solução moderna para explorar o novo universo de arte digital e colecionáveis no Bitcoin.

👥 Para quem é:
Entusiastas de Bitcoin que querem explorar Ordinals (NFTs do Bitcoin), Stacks e ter controle total de suas chaves privadas.

💎 O que oferece:
- Suporte completo a Bitcoin Ordinals e BRC-20
- Integração com rede Stacks (STX)
- Gerenciamento de NFTs do Bitcoin
- Interface moderna e intuitiva
- Autocustódia total das chaves privadas

🎯 Diferencial:
Líder em carteiras Bitcoin para Ordinals. Primeira a trazer suporte completo para NFTs e tokens na rede Bitcoin de forma simples.

⚠️ Bom saber:
- Você controla 100% das suas chaves (self-custody)
- Sempre faça backup da seed phrase
- Disponível para mobile e extensão de navegador

💰 Ideal para: Bitcoiners que querem explorar Ordinals e o ecossistema de NFTs/tokens do Bitcoin com segurança.`,
                    en: `🔥 What it is:
Bitcoin wallet focused on Ordinals and NFTs on the Bitcoin network. Modern solution to explore the new universe of digital art and collectibles on Bitcoin.

👥 Who it's for:
Bitcoin enthusiasts who want to explore Ordinals (Bitcoin NFTs), Stacks and have full control of their private keys.

💎 What it offers:
- Full support for Bitcoin Ordinals and BRC-20
- Integration with Stacks network (STX)
- Bitcoin NFT management
- Modern and intuitive interface
- Full self-custody of private keys

🎯 Differentiator:
Leader in Bitcoin wallets for Ordinals. First to bring complete support for NFTs and tokens on Bitcoin network in a simple way.

⚠️ Good to know:
- You control 100% of your keys (self-custody)
- Always backup your seed phrase
- Available for mobile and browser extension

💰 Ideal for: Bitcoiners who want to explore Ordinals and the Bitcoin NFT/token ecosystem with security.`
                }
            },
            'ledger': {
                name: 'Ledger',
                url: 'https://shop.ledger.com/?r=9414e4bea285&tracker=MY_TRACKER',
                logo: 'https://logo.clearbit.com/ledger.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=ledger.com&sz=64',
                description: {
                    pt: `🔒 O que é:
Hardware wallet líder mundial com mais de 6 milhões de unidades vendidas. Dispositivo físico que armazena suas criptomoedas offline com máxima segurança.

👥 Para quem é:
Investidores sérios que querem proteger seus investimentos cripto contra hackers com o mais alto nível de segurança possível.

💎 O que oferece:
- Armazenamento offline (cold storage)
- Suporte a 5.500+ criptomoedas
- Chip de segurança bancário certificado
- Backup e recuperação de emergência
- App Ledger Live para gerenciamento

🎯 Diferencial:
Padrão-ouro em segurança cripto. Suas chaves privadas nunca saem do dispositivo, protegendo você mesmo se o computador estiver infectado.

⚠️ Bom saber:
- Compre apenas na loja oficial (evite revendedores)
- Guarde sua seed phrase em local seguro físico
- Modelos: Nano S Plus (básico) e Nano X (bluetooth)

💰 Ideal para: Quem tem investimentos significativos em crypto e quer a melhor proteção contra hackers e roubos.`,
                    en: `🔒 What it is:
World-leading hardware wallet with over 6 million units sold. Physical device that stores your cryptocurrencies offline with maximum security.

👥 Who it's for:
Serious investors who want to protect their crypto investments against hackers with the highest possible level of security.

💎 What it offers:
- Offline storage (cold storage)
- Support for 5,500+ cryptocurrencies
- Certified bank-grade security chip
- Emergency backup and recovery
- Ledger Live app for management

🎯 Differentiator:
Gold standard in crypto security. Your private keys never leave the device, protecting you even if your computer is infected.

⚠️ Good to know:
- Buy only from official store (avoid resellers)
- Keep your seed phrase in a safe physical location
- Models: Nano S Plus (basic) and Nano X (bluetooth)

💰 Ideal for: Those with significant crypto investments who want the best protection against hackers and theft.`
                }
            }
        };

        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupLanguageToggle();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupLazyLoading();
        this.setupAnimations();
        this.setupModalSystem();
        this.setupHorizontalScrolling();
        this.setupPlatformCards();
        this.setupPremiumBanner();
        this.updateLanguage(this.currentLang);
        this.trackPageView();
    }

    // Language Management
    setupLanguageToggle() {
        const langButtons = document.querySelectorAll('.lang-btn');

        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang-switch');
                this.switchLanguage(lang);
            });
        });

        this.updateLanguageButtons();
    }

    switchLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        this.updateLanguage(lang);
        this.updateLanguageButtons();
        this.storeLanguage(lang);
        this.trackLanguageSwitch(lang);

        // Update page title and meta description
        if (lang === 'en') {
            document.title = 'Crypto Agregator - Your Complete Gateway to the Crypto World';
            document.querySelector('meta[name="description"]').content = 'Find the best way to buy, sell and use cryptocurrencies safely. P2P, Exchanges, Crypto Cards and Security.';
        } else {
            document.title = 'Crypto Agregator - Sua Porta de Entrada Completa para o Mundo Cripto';
            document.querySelector('meta[name="description"]').content = 'Encontre a melhor forma de comprar, vender e usar criptomoedas com segurança. P2P, Exchanges, Cartões Cripto e Segurança.';
        }

        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    }

    updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-lang]');

        elements.forEach(element => {
            const key = element.getAttribute('data-lang');
            const translation = this.translations[lang][key];

            if (translation) {
                element.textContent = translation;
            }
        });
    }

    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');

        langButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang-switch');
            btn.classList.toggle('active', btnLang === this.currentLang);
        });
    }

    getStoredLanguage() {
        return localStorage.getItem('cryptoagregator_language');
    }

    storeLanguage(lang) {
        localStorage.setItem('cryptoagregator_language', lang);
    }

    // Theme Management
    setupThemeToggle() {
        const desktopThemeToggle = document.getElementById('desktopThemeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const currentTheme = this.getStoredTheme() || 'dark';

        console.log('Theme toggle setup:', {
            desktop: !!desktopThemeToggle,
            mobile: !!mobileThemeToggle,
            currentTheme
        });

        // Set initial theme
        this.setTheme(currentTheme);

        // Theme switching function
        const toggleTheme = () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            console.log('Switching theme from', document.documentElement.getAttribute('data-theme'), 'to', newTheme);
            this.setTheme(newTheme);
            this.storeTheme(newTheme);
            this.trackThemeSwitch(newTheme);
        };

        // Desktop theme toggle in header
        if (desktopThemeToggle) {
            console.log('Setting up desktop theme toggle');
            desktopThemeToggle.addEventListener('click', toggleTheme);
        }

        // Mobile theme toggle in hamburger menu
        if (mobileThemeToggle) {
            console.log('Setting up mobile theme toggle');
            mobileThemeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile theme toggle clicked');
                toggleTheme();
            });
        }
    }

    setTheme(theme) {
        console.log('Setting theme to:', theme);
        document.documentElement.setAttribute('data-theme', theme);

        // Update both desktop and mobile theme button appearance
        const desktopThemeToggle = document.getElementById('desktopThemeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');

        const ariaLabel = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

        if (desktopThemeToggle) {
            desktopThemeToggle.setAttribute('aria-label', ariaLabel);
        }

        if (mobileThemeToggle) {
            mobileThemeToggle.setAttribute('aria-label', ariaLabel);
        }

        console.log('Theme applied successfully:', theme);
    }

    getStoredTheme() {
        return localStorage.getItem('cryptoagregator_theme');
    }

    storeTheme(theme) {
        localStorage.setItem('cryptoagregator_theme', theme);
    }

    trackThemeSwitch(theme) {
        console.log('Theme switch tracked:', {
            theme: theme,
            timestamp: new Date().toISOString()
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initMobileMenuAfterDOM();
        });

        // Also call immediately in case DOM is already loaded
        if (document.readyState === 'loading') {
            // DOM is still loading
        } else {
            // DOM is already loaded
            this.initMobileMenuAfterDOM();
        }
    }

    initMobileMenuAfterDOM() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');

        console.log('Mobile menu setup - Elements found:', {
            hamburger: !!mobileMenuBtn,
            overlay: !!mobileMenuOverlay,
            closeBtn: !!mobileMenuClose
        });

        // Open mobile menu
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Opening mobile menu');
                if (mobileMenuOverlay) {
                    mobileMenuOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }

        // Close mobile menu function
        const closeMobileMenu = () => {
            console.log('Closing mobile menu');
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        // Close button - Multiple event types for maximum compatibility
        if (mobileMenuClose) {
            console.log('Setting up close button listeners');

            mobileMenuClose.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button clicked');
                closeMobileMenu();
            });

            mobileMenuClose.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close button touched');
                closeMobileMenu();
            });
        } else {
            console.error('Close button not found!');
        }

        // Close when clicking outside menu
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    console.log('Overlay clicked - closing menu');
                    closeMobileMenu();
                }
            });
        }

        // Close on navigation link click
        setTimeout(() => {
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
            console.log('Found nav links:', mobileNavLinks.length);
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    console.log('Nav link clicked - closing menu');
                    closeMobileMenu();
                });
            });
        }, 100);

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const isMenuOpen = mobileMenuOverlay && mobileMenuOverlay.classList.contains('active');
                if (isMenuOpen) {
                    console.log('ESC pressed - closing menu');
                    closeMobileMenu();
                }
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    this.trackNavigation(targetId);
                }
            });
        });
    }

    // Modal System
    setupModalSystem() {
        const modal = document.getElementById('platformModal');
        const closeModal = document.getElementById('closeModal');
        const backModal = document.getElementById('backModal');
        const visitSite = document.getElementById('visitSite');

        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }

        if (backModal) {
            backModal.addEventListener('click', () => this.closeModal());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        if (visitSite) {
            visitSite.addEventListener('click', () => {
                const url = visitSite.dataset.url;
                if (url) {
                    this.trackAffiliateClick(visitSite.dataset.platform, url);
                    window.open(url, '_blank', 'noopener,noreferrer');
                    this.closeModal();
                }
            });
        }
    }

    showModal(platformId) {
        const platform = this.platformData[platformId];
        if (!platform) return;

        const modal = document.getElementById('platformModal');
        const modalLogo = document.getElementById('modalLogo');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const visitSite = document.getElementById('visitSite');

        if (modal && modalLogo && modalTitle && modalDescription && visitSite) {
            // Set modal content
            modalLogo.src = platform.logo;
            modalLogo.onerror = () => { modalLogo.src = platform.fallbackLogo; };
            modalLogo.alt = platform.name;

            modalTitle.textContent = platform.name;
            modalDescription.textContent = platform.description[this.currentLang];

            visitSite.dataset.url = platform.url;
            visitSite.dataset.platform = platform.name;

            // Show modal with animation
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Track modal view
            this.trackModalView(platform.name);
        }
    }

    closeModal() {
        const modal = document.getElementById('platformModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Platform Cards Setup
    setupPlatformCards() {
        const platformCards = document.querySelectorAll('.platform-card');

        platformCards.forEach(card => {
            const platformId = card.dataset.platform;

            if (platformId && this.platformData[platformId]) {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showModal(platformId);
                });

                // Add keyboard accessibility
                card.setAttribute('tabindex', '0');
                card.setAttribute('role', 'button');
                card.setAttribute('aria-label', `Open ${this.platformData[platformId].name} details`);

                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.showModal(platformId);
                    }
                });

                // Set up logo fallback
                const img = card.querySelector('.platform-logo img');
                if (img) {
                    img.onerror = () => {
                        img.src = this.platformData[platformId].fallbackLogo;
                    };
                }
            }
        });
    }

    // Premium Banner Setup
    setupPremiumBanner() {
        const premiumBanner = document.querySelector('.premium-hero-banner');
        const premiumCTA = document.querySelector('.premium-cta-button');

        if (premiumBanner) {
            const platformId = premiumBanner.dataset.platform;

            // Banner click - open modal
            premiumBanner.addEventListener('click', (e) => {
                // Don't trigger modal if CTA button was clicked
                if (!e.target.closest('.premium-cta-button')) {
                    e.preventDefault();
                    this.showModal(platformId);
                }
            });

            // Add keyboard accessibility
            premiumBanner.setAttribute('tabindex', '0');
            premiumBanner.setAttribute('role', 'button');
            premiumBanner.setAttribute('aria-label', 'Open Bitget Wallet details');

            premiumBanner.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showModal(platformId);
                }
            });
        }

        if (premiumCTA) {
            premiumCTA.addEventListener('click', (e) => {
                e.stopPropagation();
                const url = premiumCTA.dataset.url;
                if (url) {
                    this.trackAffiliateClick('Bitget Wallet', url);
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });
        }
    }

    // Horizontal Scrolling
    setupHorizontalScrolling() {
        const scrollContainers = document.querySelectorAll('.horizontal-cards-grid');

        scrollContainers.forEach((container, containerIndex) => {
            const dots = container.parentElement.querySelectorAll('.scroll-dot');

            // Enhanced scroll position tracking
            const updateScrollIndicators = () => {
                const scrollLeft = container.scrollLeft;
                const containerWidth = container.offsetWidth;
                const scrollWidth = container.scrollWidth;
                const cardWidth = container.querySelector('.platform-card')?.offsetWidth || 280;

                // More accurate calculation for mobile
                const gap = window.innerWidth <= 768 ? 20 : 32; // Adjust gap based on screen size
                const effectiveCardWidth = cardWidth + gap;
                const activeIndex = Math.round(scrollLeft / effectiveCardWidth);

                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            };

            // Update active dot based on scroll position with improved calculation
            container.addEventListener('scroll', this.debounce(updateScrollIndicators, 50));

            // Dot click navigation with mobile-optimized positioning
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    const cardWidth = container.querySelector('.platform-card')?.offsetWidth || 280;
                    const gap = window.innerWidth <= 768 ? 20 : 32;
                    const targetScroll = index * (cardWidth + gap);

                    container.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                    });
                });
            });

            // Enhanced touch handling for mobile
            let isPointerDown = false;
            let startX = 0;
            let startY = 0;
            let startTime = 0;
            let initialScrollLeft = 0;

            // Handle both touch and pointer events for better compatibility
            const getClientX = (e) => e.touches ? e.touches[0].clientX : e.clientX;
            const getClientY = (e) => e.touches ? e.touches[0].clientY : e.clientY;

            // Start interaction
            const handleStart = (e) => {
                isPointerDown = true;
                startX = getClientX(e);
                startY = getClientY(e);
                startTime = Date.now();
                initialScrollLeft = container.scrollLeft;

                // Prevent default on touch but allow on desktop
                if (e.type === 'touchstart') {
                    // Allow the browser to handle touch scrolling naturally
                }
            };

            // Handle movement
            const handleMove = (e) => {
                if (!isPointerDown) return;

                const currentX = getClientX(e);
                const currentY = getClientY(e);
                const diffX = Math.abs(currentX - startX);
                const diffY = Math.abs(currentY - startY);

                // If horizontal movement is greater, we're scrolling horizontally
                if (diffX > diffY && diffX > 5) {
                    // Prevent vertical scrolling during horizontal swipe
                    if (e.cancelable) {
                        e.preventDefault();
                    }
                }
            };

            // End interaction
            const handleEnd = (e) => {
                isPointerDown = false;

                // Optional: Add momentum/snap behavior for better UX
                const endTime = Date.now();
                const timeDiff = endTime - startTime;
                const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
                const distance = endX - startX;
                const velocity = Math.abs(distance / timeDiff);

                // If it's a quick swipe, add some momentum
                if (velocity > 0.5 && Math.abs(distance) > 50) {
                    const cardWidth = container.querySelector('.platform-card')?.offsetWidth || 280;
                    const gap = window.innerWidth <= 768 ? 20 : 32;
                    const cardStep = cardWidth + gap;

                    let targetScroll = container.scrollLeft;
                    if (distance > 0) {
                        // Swiped right (scroll left)
                        targetScroll -= cardStep;
                    } else {
                        // Swiped left (scroll right)
                        targetScroll += cardStep;
                    }

                    // Ensure we don't scroll beyond bounds
                    targetScroll = Math.max(0, Math.min(targetScroll, container.scrollWidth - container.offsetWidth));

                    container.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                    });
                }
            };

            // Touch events
            container.addEventListener('touchstart', handleStart, { passive: false });
            container.addEventListener('touchmove', handleMove, { passive: false });
            container.addEventListener('touchend', handleEnd, { passive: true });

            // Mouse events for desktop testing
            container.addEventListener('mousedown', handleStart);
            container.addEventListener('mousemove', handleMove);
            container.addEventListener('mouseup', handleEnd);
            container.addEventListener('mouseleave', handleEnd);

            // Initialize scroll indicators
            updateScrollIndicators();

            // Update on window resize
            window.addEventListener('resize', this.debounce(updateScrollIndicators, 250));
        });
    }

    // Scroll Animations - Fade in sections as they appear
    setupScrollAnimations() {
        const sections = document.querySelectorAll('.platform-section, .premium-hero-section');

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation to improve performance
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Lazy Loading for Images
    setupLazyLoading() {
        const images = document.querySelectorAll('.platform-logo img, .premium-hero-logo img');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Set loading attribute for native lazy loading
                    img.loading = 'lazy';

                    // Add loaded class when image loads
                    if (img.complete) {
                        img.classList.add('loaded');
                    } else {
                        img.addEventListener('load', () => {
                            img.classList.add('loaded');
                        });
                    }

                    imageObserver.unobserve(img);
                }
            });
        }, {
            threshold: 0.01,
            rootMargin: '50px'
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Animations and Interactions
    setupAnimations() {
        // Header scroll effect
        this.setupHeaderEffect();

        // Add loading animation
        this.addLoadingAnimation();
    }

    setupHeaderEffect() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.header');
        let ticking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.borderBottomColor = 'rgba(247, 147, 26, 0.2)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.borderBottomColor = 'rgba(247, 147, 26, 0.1)';
            }

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    addLoadingAnimation() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }

    // Analytics and Tracking
    trackPageView() {
        console.log('Page view tracked:', {
            page: 'home',
            language: this.currentLang,
            timestamp: new Date().toISOString()
        });
    }

    trackLanguageSwitch(lang) {
        console.log('Language switch tracked:', {
            from: this.currentLang === 'pt' ? 'en' : 'pt',
            to: lang,
            timestamp: new Date().toISOString()
        });
    }

    trackNavigation(section) {
        console.log('Navigation tracked:', {
            section: section.replace('#', ''),
            language: this.currentLang,
            timestamp: new Date().toISOString()
        });
    }

    trackModalView(platform) {
        console.log('Modal view tracked:', {
            platform: platform,
            language: this.currentLang,
            timestamp: new Date().toISOString()
        });
    }

    trackAffiliateClick(platform, url) {
        console.log('Affiliate click tracked:', {
            platform: platform,
            url: url,
            language: this.currentLang,
            timestamp: new Date().toISOString()
        });

        const clickData = {
            platform,
            url,
            language: this.currentLang,
            timestamp: new Date().toISOString()
        };

        this.storeClickData(clickData);
    }

    storeClickData(data) {
        const existingData = JSON.parse(localStorage.getItem('cryptoagregator_clicks') || '[]');
        existingData.push(data);

        if (existingData.length > 100) {
            existingData.slice(-100);
        }

        localStorage.setItem('cryptoagregator_clicks', JSON.stringify(existingData));
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Error Handling
    handleError(error, context) {
        console.error(`Crypto Agregator Error in ${context}:`, error);

        const errorData = {
            error: error.message,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        const existingErrors = JSON.parse(localStorage.getItem('cryptoagregator_errors') || '[]');
        existingErrors.push(errorData);

        if (existingErrors.length > 50) {
            existingErrors.slice(-50);
        }

        localStorage.setItem('cryptoagregator_errors', JSON.stringify(existingErrors));
    }
}

// Performance Monitoring
function setupPerformanceMonitoring() {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];

        console.log('Performance metrics:', {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            timestamp: new Date().toISOString()
        });
    });

    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.duration + 'ms');
                }
            });
        });

        observer.observe({ entryTypes: ['longtask'] });
    }
}

// Theme Management
function setupThemeManagement() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    prefersDarkScheme.addEventListener('change', (e) => {
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.cryptoAgregator = new CryptoAgregator();
        setupPerformanceMonitoring();
        setupThemeManagement();

        console.log('Crypto Agregator initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Crypto Agregator:', error);
    }
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CryptoAgregator };
}