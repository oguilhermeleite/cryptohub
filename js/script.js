
/* ========================================= */
/* BULLETPROOF NEWSLETTER FORM (IFRAME)      */
/* ========================================= */
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function() {
        window.submitted = true;
    });
}

function handleFormSuccess() {
    if (formMessage) {
        formMessage.textContent = 'Obrigado por se inscrever!';
        formMessage.style.color = '#00ff88';
        newsletterForm.reset();
    }
}

/* ========================================= */
/* CLICKABLE COUPON SYSTEM                   */
/* ========================================= */
function initCouponSystem() {
    document.addEventListener('click', function(e) {
        const couponEl = e.target.closest('.clickable-coupon');
        if (couponEl) {
            const code = couponEl.getAttribute('data-code');
            if (code) {
                navigator.clipboard.writeText(code).then(() => {
                    showToast('CUPOM COPIADO: ' + code);
                    
                    // Visual feedback on the element
                    const originalBg = couponEl.style.backgroundColor;
                    couponEl.style.backgroundColor = 'rgba(0, 255, 136, 0.3)';
                    setTimeout(() => {
                        couponEl.style.backgroundColor = originalBg;
                    }, 200);
                });
            }
        }
    });
}

/* ========================================= */
/* TOAST NOTIFICATION SYSTEM                 */
/* ========================================= */
let toastTimeout;
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification hidden';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.remove('hidden');
    
    // Trigger reflow for transition
    toast.offsetHeight;
    
    // Clear previous timeout if exists
    if (toastTimeout) clearTimeout(toastTimeout);

    // Show with animation
    // Small delay to ensure transition works if it was display:none
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Hide after 3 seconds
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        // Add hidden class back after transition ends
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 400);
    }, 3000);
}

/* ========================================= */
/* LANGUAGE TRANSLATION SYSTEM (I18N)        */
/* ========================================= */

const translations = {
    pt: {
        langTitle: "Idioma",
        langPt: "Português",
        langEn: "Inglês",
        navHome: "Home",
        navBridges: "Bridges",
        navCards: "Cards",
        navBanks: "Banks",
        navWallets: "Wallets",
        navAllPlatforms: "TODAS AS PLATAFORMAS",
        comingSoon: "Em breve",
        themeToggle: "Tema",
        allPlatformsHeroTitle: "Todas as Plataformas",
        allPlatformsHeroSubtitle: "Explore todas as opções disponíveis no mercado cripto",
        heroBadge: "Diretório verificado de plataformas cripto",
        heroTitle: "Sua porta de entrada e saída para o mundo cripto",
        heroSubtitle: "Agregador on-ramp e off-ramp para comprar, vender e usar cripto.",
        heroDesc: "Plataformas selecionadas e seus links oficiais — para você acessar com segurança.",
        lastUpdated: "Atualizado em 25/06/2026",
        featuredTitle: "Destaque",
        featuredSubtitle: "Plataforma em destaque da nossa comunidade",
        partnerBadge: "PARCEIRO OFICIAL",
        btnAccessNow: "ACESSAR AGORA →",
        btnVisit: "Visitar Site",
        btnFollowX: "Seguir no X",
        btn_visit: "Visitar Site",
        btn_follow: "Seguir no X",
        p2pTitle: "P2P",
        p2pSubtitle: "Compra e venda direta entre pessoas",
        p2p_title: "P2P",
        p2p_sub: "Compra e venda direto entre pessoas",
        exchangesTitle: "Exchanges",
        exchangesSubtitle: "Trading e conversão de criptomoedas",
        exch_title: "Exchanges",
        exch_sub: "Trading e conversão de criptomoedas",
        hotWalletsTitle: "Hot Wallets",
        hotWalletsSubtitle: "Carteiras online conectadas à internet para uso diário",
        wallet_title: "Hot Wallets",
        wallet_sub: "Carteiras online conectadas à internet para uso diário",
        cardsTitle: "Cartões",
        cardsSubtitle: "Use cripto no dia a dia com cartões",
        cardsec_title: "Cartões",
        cardsec_sub: "Use cripto no dia a dia com cartões",
        banksTitle: "Bancos",
        banksSubtitle: "Bancos digitais com recursos crypto integrados",
        bank_title: "Bancos",
        bank_sub: "Bancos digitais com recursos crypto integrados",
        trackersTitle: "Trackers",
        trackersSubtitle: "Acompanhamento de mercado e dados em tempo real",
        track_title: "Trackers",
        track_sub: "Acompanhamento de mercado e dados em tempo real",
        coldWalletsTitle: "Cold Wallets",
        coldWalletsSubtitle: "Carteiras físicas offline para máxima segurança",
        dexsTitle: "DEXs",
        dexsSubtitle: "Exchanges descentralizadas para trading sem intermediários",
        dex_title: "DEXs",
        dex_sub: "Exchanges descentralizadas para trading sem intermediários",
        bridgesTitle: "Bridges",
        bridgesSubtitle: "Transfira ativos entre diferentes blockchains",
        bridge_title: "Bridges",
        bridge_sub: "Transfira ativos entre diferentes blockchains",
        tax_title: "Legal & Contábil",
        tax_sub: "Contadores e advogados especializados em cripto",
        desc_4pfinance: "P2P on-chain e pagamento de boletos. Cupom MQM para desconto.",
        desc_4pfinance_rich: "P2P on-chain e pagamento de boletos.<br><strong>Cupom <span class=\"clickable-coupon\" data-code=\"MQM\">MQM <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> para desconto.</strong>",
        descPagCrypto: "Pag Finance oferece soluções completas para pagamentos com criptomoedas no Brasil.",
        descCamilaP2P: "Especialista brasileira em P2P. Com taxas baixas e suporte para +1.000 Criptomoedas. Cupom MQM para desconto.",
        descP2Pme: "P2P.me é uma plataforma P2P confiável para compra e venda de criptomoedas com segurança e rapidez.",
        desc_binance: "Maior exchange do mundo com +270 milhões de usuários. Taxas baixas e +500 criptomoedas disponíveis.",
        desc_bybit: "Exchange global com alta liquidez, derivativos avançados e taxas competitivas.",
        desc_kraken: "Kraken é uma das exchanges mais antigas e confiáveis, conhecida por sua segurança e conformidade regulatória.",
        desc_mexc: "MEXC é uma exchange global com ampla seleção de altcoins e trading de futuros.",
        desc_coinbase: "Coinbase é a exchange mais amigável para iniciantes, com interface simples e alta segurança.",
        desc_okx: "Exchange global +70M traders. Taxas baixas, alta segurança, spot/futuros/opções.",
        desc_gateio: "Top 10 exchange global com +4.100 ativos. Spot, futuros, margin, staking e copy trading.",
        desc_bingx: "Exchange global com copy trading, spot e futuros. +20 milhões de usuários e taxas competitivas.",
        desc_phantom: "Carteira Web3 para Solana e Ethereum. Gerencie NFTs, acesse DeFi e troque tokens facilmente.",
        desc_rabby: "Rabby é uma carteira multi-chain moderna focada em segurança e experiência do usuário em DeFi.",
        desc_xversewallet: "Xverse é a principal carteira para Bitcoin, permitindo acesso a NFTs, DeFi e aplicativos Web3 no Bitcoin.",
        desc_metamask: "MetaMask é a carteira mais popular para Ethereum e redes EVM, com suporte completo a DApps e NFTs.",
        desc_slush: "Carteira elegante para Sui. Super app para investir, swap, stake e DeFi no ecossistema Sui.",
        desc_unisat: "Carteira Bitcoin para Alkanes, Ordinals e Runes. Gerencie ativos digitais no Bitcoin.",
        desc_kastfinance: "Kast oferece cartões cripto que permitem gastar suas criptomoedas no dia a dia com facilidade.",
        desc_offramp: "A Offramp facilita a conversão de cripto para moeda fiduciária com cartões e soluções de pagamento.",
        desc_etherfi: "Ether.fi oferece staking descentralizado e cartões cripto com recompensas.",
        desc_solcard: "O primeiro cartão virtual da rede Solana sem necessidade de KYC.",
        desc_bitrefill: "Compre vale-presentes e recargas de celular usando criptomoedas.",
        desc_neobankless: "Neobankless é um banco digital com integração total de serviços cripto.",
        desc_revolut: "Revolut é um banco digital que integra crypto, permitindo compra, venda e troca de criptomoedas.",
        desc_bitybank: "Bitybank é um banco digital brasileiro com foco em criptomoedas e finanças descentralizadas.",
        desc_defibank: "O banco digital focado em liberdade financeira e cripto.",
        desc_ledger: "Ledger oferece hardware wallets de máxima segurança para armazenamento de criptomoedas offline.",
        desc_trezor: "Pioneira em hardware wallets, oferece máxima segurança para criptomoedas com código open-source.",
        desc_onekey: "Hardware wallets open-source com suporte multi-chain para 5.000+ criptomoedas e segurança EAL 6+.",
        desc_uniswap: "Uniswap é a maior DEX do Ethereum, permitindo trocas descentralizadas sem intermediários.",
        desc_jupiter: "Jupiter é a principal DEX agregadora em Solana, oferecendo as melhores rotas de swap.",
        desc_meteora: "Meteora é uma DEX inovadora em Solana com pools dinâmicos e alta eficiência de capital.",
        desc_prjx: "Plataforma e portfólio de negociação descentralizada.",
        desc_bitflow: "DEX no ecossistema Bitcoin/Stacks. Realize swaps e proveja liquidez com total segurança.",
        desc_pancakeswap: "PancakeSwap é a maior DEX da BNB Chain com yields competitivos e diversas features DeFi.",
        desc_raydium: "AMM on-chain com order book em Solana. Trading perp sem gas, até 40x alavancagem.",
        desc_liquidium: "Protocolo de empréstimos cross-chain descentralizado. Empreste ativos entre Bitcoin, Ethereum e Solana.",
        desc_pumpfun: "Plataforma líder para lançamento de memecoins em Solana, crie tokens em segundos.",
        desc_xstocks: "Negocie ações e ativos tradicionais tokenizados diretamente na rede.",
        desc_ondo: "Líder em RWA, trazendo títulos do tesouro americano para o mundo on-chain.",
        desc_kamino: "Protocolo avançado de empréstimos e otimização de liquidez na rede Solana.",
        desc_aave: "O maior protocolo de empréstimos descentralizados do mundo.",
        desc_sideshiftai: "SideShift.ai permite trocas rápidas entre diferentes blockchains sem necessidade de registro.",
        desc_jumper: "Jumper é uma bridge agregadora que encontra as melhores rotas para transferir ativos entre chains.",
        desc_fixedfloat: "FixedFloat oferece swaps instantâneos entre criptomoedas com taxas fixas e transparentes.",
        desc_layerswap: "Transferências rápidas entre exchanges e blockchains com taxas baixas.",
        desc_coinmarketcap: "Preços de criptomoedas, gráficos e capitalização de mercado.",
        desc_coingecko: "Visão geral e dados do mercado de 360 graus.",
        desc_coinglass: "Dados de derivativos e liquidações de criptomoedas.",
        desc_tradingview: "Gráficos avançados e rede social de trading.",
        desc_moshe: "Ajudo você a tirar o Brasil do seu dinheiro. Assessoria internacional.",
        desc_dexscreener: "Gráficos em tempo real e análise de tokens em DEXs.",
        desc_hodle: "Negocie criptomoedas P2P de forma rápida e segura.",
        desc_satsterminal: "Swaps, empréstimos e yield de Bitcoin. Agregação de liquidez no ecossistema Bitcoin.",
        desc_b2pix: "Bolão de palpites cripto da comunidade. Participe da turma dogdamassa e dê seus palpites.",
        securityTitle: "Protegendo você dos erros mais comuns em cripto",
        securityDesc: "Crypto Aggregator funciona como um filtro de acesso ao ecossistema cripto, validando fontes, links oficiais e informações antes de direcionar o usuário.",
        securityExtremaTitle: "Segurança Extrema",
        securityExtremaDesc: "Conferimos os links oficiais de cada parceiro listado.",
        securityTransTitle: "Transparência",
        securityTransDesc: "Simples de entender, fácil de confiar.",
        securityCuradoriaTitle: "Curadoria Inteligente",
        securityCuradoriaDesc: "Selecionamos apenas o que realmente faz sentido, evitando ruído, promessas vazias e projetos desnecessários.",
        securityNavegacaoTitle: "Navegação Guiada",
        securityNavegacaoDesc: "Ajudamos você a entender antes de usar. Informação vem antes da ação.",
        eduTitle: "EDUCAÇÃO PRIMEIRO",
        eduDesc: "Pensado para iniciantes e avançados. Nossa missão é garantir que você tenha clareza e segurança em cada clique.",
        catTitle: "Cripto sem complicação,",
        catTitleSpan: "tudo em um só lugar",
        catSubtitle: "Links oficiais conferidos pela nossa curadoria.",
        catP2PTitle: "P2P (Peer-to-Peer)",
        catP2PDesc: "Plataformas onde pessoas negociam cripto diretamente entre si, sem intermediários.",
        catExTitle: "Exchanges (Corretoras)",
        catExDesc: "Plataformas centralizadas que permitem comprar, vender e negociar cripto com facilidade.",
        catDexTitle: "DEXs (Corretoras Descentralizadas)",
        catDexDesc: "Plataformas descentralizadas onde você troca cripto direto da sua carteira, sem custódia.",
        catBanksTitle: "Digital Banks (Bancos)",
        catBanksDesc: "Bancos digitais e serviços financeiros que integram cripto ao sistema tradicional.",
        catCardsTitle: "Crypto Cards (Cartões Cripto)",
        catCardsDesc: "Cartões que permitem gastar criptomoedas no mundo real.",
        catBridgesTitle: "Bridges (Pontes)",
        catBridgesDesc: "Ferramentas que permitem mover ativos entre diferentes blockchains.",
        catWalletsTitle: "Wallets (Carteiras)",
        catWalletsDesc: "Aplicativos onde você guarda, envia e recebe criptomoedas com controle total.",
        footerDesc: "Sua porta de entrada e saída para o mundo cripto",
        footerServices: "Serviços",
        footerNewsletterTitle: "Fique Atualizado",
        footerNewsletterDesc: "Receba as melhores oportunidades e notícias do mundo cripto.",
        newsletterPlaceholder: "Seu melhor e-mail",
        newsletterBtn: "Inscrever-se",
        newsletterSuccess: "✓ Obrigado por se inscrever!",
        footerRights: "Todos os direitos reservados.",
        toastCopied: "Cupom copiado com sucesso!"
    },
    en: {
        langTitle: "Language",
        langPt: "Portuguese",
        langEn: "English",
        navHome: "Home",
        navBridges: "Bridges",
        navCards: "Cards",
        navBanks: "Banks",
        navWallets: "Wallets",
        navAllPlatforms: "ALL PLATFORMS",
        comingSoon: "Coming Soon",
        themeToggle: "Theme",
        allPlatformsHeroTitle: "All Platforms",
        allPlatformsHeroSubtitle: "Explore all available options in the crypto market",
        heroBadge: "Verified directory of crypto platforms",
        heroTitle: "Your gateway in and out of the crypto world",
        heroSubtitle: "An on-ramp and off-ramp aggregator to buy, sell and use crypto.",
        heroDesc: "Hand-picked platforms and their official links — so you can access them safely.",
        lastUpdated: "Updated on June 25, 2026",
        featuredTitle: "Highlight",
        featuredSubtitle: "Featured platform of our community",
        partnerBadge: "OFFICIAL PARTNER",
        btnAccessNow: "ACCESS NOW →",
        btnVisit: "Visit Site",
        btnFollowX: "Follow on X",
        btn_visit: "Visit Site",
        btn_follow: "Follow on X",
        p2pTitle: "P2P",
        p2pSubtitle: "Direct purchase and sale between people",
        p2p_title: "P2P",
        p2p_sub: "Direct purchase and sale between people",
        exchangesTitle: "Exchanges",
        exchangesSubtitle: "Trading and conversion of cryptocurrencies",
        exch_title: "Exchanges",
        exch_sub: "Trading and conversion of cryptocurrencies",
        hotWalletsTitle: "Hot Wallets",
        hotWalletsSubtitle: "Online wallets connected to the internet for daily use",
        wallet_title: "Hot Wallets",
        wallet_sub: "Online wallets connected to the internet for daily use",
        cardsTitle: "Crypto Cards",
        cardsSubtitle: "Use crypto daily with cards",
        cardsec_title: "Crypto Cards",
        cardsec_sub: "Use crypto daily with cards",
        banksTitle: "Digital Banks",
        banksSubtitle: "Digital banks with integrated crypto features",
        bank_title: "Digital Banks",
        bank_sub: "Digital banks with integrated crypto features",
        trackersTitle: "Trackers",
        trackersSubtitle: "Market tracking and real-time data",
        track_title: "Trackers",
        track_sub: "Market tracking and real-time data",
        coldWalletsTitle: "Cold Wallets",
        coldWalletsSubtitle: "Offline physical wallets for maximum security",
        dexsTitle: "DEXs",
        dexsSubtitle: "Decentralized exchanges for trading without intermediaries",
        dex_title: "DEXs",
        dex_sub: "Decentralized exchanges for trading without intermediaries",
        bridgesTitle: "Bridges",
        bridgesSubtitle: "Transfer assets between different blockchains",
        bridge_title: "Bridges",
        bridge_sub: "Transfer assets between different blockchains",
        tax_title: "Lawyers and accounting",
        tax_sub: "Accountants and lawyers specialized in crypto",
        desc_4pfinance: "P2P on-chain and bill payments. Coupon MQM for discount.",
        desc_4pfinance_rich: "P2P on-chain and bill payments.<br><strong>Coupon <span class=\"clickable-coupon\" data-code=\"MQM\">MQM <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> for discount.</strong>",
        descPagCrypto: "Pag Finance offers complete solutions for payments with cryptocurrencies in Brazil.",
        descCamilaP2P: "Brazilian specialist in P2P. With low fees and support for +1,000 Cryptocurrencies. MQM coupon for discount.",
        descP2Pme: "P2P.me is a reliable P2P platform for buying and selling cryptocurrencies safely and quickly.",
        desc_binance: "World's largest exchange with +270 million users. Low fees and +500 cryptocurrencies available.",
        desc_bybit: "Global cryptocurrency exchange with high liquidity, advanced derivatives and competitive fees.",
        desc_kraken: "Kraken is one of the oldest and most reliable exchanges, known for its security and regulatory compliance.",
        desc_mexc: "MEXC is a global exchange with a wide selection of altcoins and futures trading.",
        desc_coinbase: "Coinbase is the most beginner-friendly exchange, with a simple interface and high security.",
        desc_okx: "Global exchange +70M traders. Low fees, high security, spot/futures/options.",
        desc_gateio: "Top 10 global exchange with +4,100 assets. Spot, futures, margin, staking and copy trading.",
        desc_bingx: "Global exchange with copy trading, spot and futures. +20 million users and competitive fees.",
        desc_phantom: "Web3 wallet for Solana and Ethereum. Manage NFTs, access DeFi and exchange tokens easily.",
        desc_rabby: "Rabby is a modern multi-chain wallet focused on security and DeFi user experience.",
        desc_xversewallet: "Xverse is the main wallet for Bitcoin, allowing access to NFTs, DeFi and Web3 applications on Bitcoin.",
        desc_metamask: "MetaMask is the most popular wallet for Ethereum and EVM networks, with full support for DApps and NFTs.",
        desc_slush: "Elegant wallet for Sui. Super app to invest, swap, stake and DeFi in the Sui ecosystem.",
        desc_unisat: "Bitcoin wallet for Alkanes, Ordinals and Runes. Manage digital assets on Bitcoin.",
        desc_kastfinance: "Kast offers crypto cards that allow you to spend your cryptocurrencies daily with ease.",
        desc_offramp: "Offramp facilitates the conversion of crypto to fiat with cards and payment solutions.",
        desc_etherfi: "Ether.fi offers decentralized staking and crypto cards with rewards.",
        desc_solcard: "The first virtual card on the Solana network without the need for KYC.",
        desc_bitrefill: "Buy gift cards and mobile recharges using cryptocurrencies.",
        desc_neobankless: "Neobankless is a digital bank with total integration of crypto services.",
        desc_revolut: "Revolut is a digital bank that integrates crypto, allowing purchase, sale and exchange of cryptocurrencies.",
        desc_bitybank: "Bitybank is a Brazilian digital bank focused on cryptocurrencies and decentralized finance.",
        desc_defibank: "The digital bank focused on financial freedom and crypto.",
        desc_ledger: "Ledger offers hardware wallets of maximum security for offline cryptocurrency storage.",
        desc_trezor: "Pioneer in hardware wallets, offers maximum security for cryptocurrencies with open-source code.",
        desc_onekey: "Open-source hardware wallets with multi-chain support for 5,000+ cryptocurrencies and EAL 6+ security.",
        desc_uniswap: "Uniswap is the largest DEX on Ethereum, allowing decentralized swaps without intermediaries.",
        desc_jupiter: "Jupiter is the main aggregator DEX in Solana, offering the best swap routes.",
        desc_meteora: "Meteora is an innovative DEX in Solana with dynamic pools and high capital efficiency.",
        desc_prjx: "Decentralized trading platform and portfolio.",
        desc_bitflow: "DEX in the Bitcoin/Stacks ecosystem. Perform swaps and provide liquidity with total security.",
        desc_pancakeswap: "PancakeSwap is the largest DEX on the BNB Chain with competitive yields and various DeFi features.",
        desc_raydium: "On-chain AMM with order book in Solana. Perp trading without gas, up to 40x leverage.",
        desc_liquidium: "Decentralized cross-chain lending protocol. Lend assets between Bitcoin, Ethereum and Solana.",
        desc_pumpfun: "Leading platform for memecoin launch on Solana, create tokens in seconds.",
        desc_xstocks: "Trade tokenized stocks and traditional assets directly on-chain.",
        desc_ondo: "Leader in RWA, bringing US treasury bonds to the on-chain world.",
        desc_kamino: "Advanced lending and liquidity optimization protocol on the Solana network.",
        desc_aave: "The world's largest decentralized lending protocol.",
        desc_sideshiftai: "SideShift.ai allows fast swaps between different blockchains without the need for registration.",
        desc_jumper: "Jumper is an aggregator bridge that finds the best routes to transfer assets between chains.",
        desc_fixedfloat: "FixedFloat offers instant swaps between cryptocurrencies with fixed and transparent fees.",
        desc_layerswap: "Fast transfers between exchanges and blockchains with low fees.",
        desc_coinmarketcap: "Cryptocurrency prices, charts and market capitalization.",
        desc_coingecko: "General view and 360-degree market data.",
        desc_coinglass: "Derivatives data and cryptocurrency liquidations.",
        desc_tradingview: "Advanced charts and social trading network.",
        desc_moshe: "I help you get Brazil out of your money. International advice.",
        desc_dexscreener: "Real-time charts and analysis of tokens in DEXs.",
        desc_hodle: "Negocie criptomoedas P2P de forma rápida e segura.",
        desc_satsterminal: "Swaps, empréstimos e yield de Bitcoin. Agregação de liquidez no ecossistema Bitcoin.",
        desc_b2pix: "Community crypto prediction pool. Join the dogdamassa group and make your picks.",
        securityTitle: "Protecting you from the most common mistakes in crypto",
        securityDesc: "Crypto Aggregator works as an access filter to the crypto ecosystem, validating sources, official links and information before directing the user.",
        securityExtremaTitle: "Extreme Security",
        securityExtremaDesc: "We check the official links of every partner listed.",
        securityTransTitle: "Transparency",
        securityTransDesc: "Simple to understand, easy to trust.",
        securityCuradoriaTitle: "Intelligent Curation",
        securityCuradoriaDesc: "We select only what really makes sense, avoiding noise, empty promises and unnecessary projects.",
        securityNavegacaoTitle: "Guided Navigation",
        securityNavegacaoDesc: "We help you understand before using. Information comes before action.",
        eduTitle: "EDUCATION FIRST",
        eduDesc: "Designed for beginners and advanced users. Our mission is to ensure you have clarity and security with each click.",
        catTitle: "Crypto without complication,",
        catTitleSpan: "everything in one place",
        catSubtitle: "Official links, checked by our team.",
        catP2PTitle: "P2P (Peer-to-Peer)",
        catP2PDesc: "Platforms where people trade crypto directly with each other, without intermediaries.",
        catExTitle: "Exchanges (Brokerages)",
        catExDesc: "Centralized platforms that allow you to buy, sell and negotiate crypto with ease.",
        catDexTitle: "DEXs (Decentralized Brokerages)",
        catDexDesc: "Decentralized platforms where you exchange crypto directly from your wallet, without custody.",
        catBanksTitle: "Digital Banks",
        catBanksDesc: "Digital banks and financial services that integrate crypto into the traditional system.",
        catCardsTitle: "Crypto Cards",
        catCardsDesc: "Cards that allow spending cryptocurrencies in the real world.",
        catBridgesTitle: "Bridges",
        catBridgesDesc: "Tools that allow moving assets between different blockchains.",
        catWalletsTitle: "Wallets",
        catWalletsDesc: "Applications where you keep, send and receive cryptocurrencies with total control.",
        footerDesc: "Your gateway in and out of the crypto world",
        footerServices: "Services",
        footerNewsletterTitle: "Stay Updated",
        footerNewsletterDesc: "Receive the best opportunities and news from the crypto world.",
        newsletterPlaceholder: "Your best email",
        newsletterBtn: "Subscribe",
        newsletterSuccess: "✓ Thank you for subscribing!",
        footerRights: "All rights reserved.",
        toastCopied: "Coupon copied successfully!"
    },
    es: {
        langTitle: "Idioma",
        langPt: "Português",
        langEn: "Inglés",
        navHome: "Inicio",
        navBridges: "Bridges",
        navCards: "Tarjetas",
        navBanks: "Bancos",
        navWallets: "Billeteras",
        navAllPlatforms: "TODAS LAS PLATAFORMAS",
        comingSoon: "Próximamente",
        themeToggle: "Tema",
        allPlatformsHeroTitle: "Todas las Plataformas",
        allPlatformsHeroSubtitle: "Explore todas las opciones disponibles en el mercado cripto",
        heroBadge: "Directorio verificado de plataformas cripto",
        heroTitle: "Tu puerta de entrada y salida al mundo cripto",
        heroSubtitle: "Agregador on-ramp y off-ramp para comprar, vender y usar cripto.",
        heroDesc: "Plataformas seleccionadas y sus enlaces oficiales — para que accedas con seguridad.",
        lastUpdated: "Actualizado el 25/06/2026",
        featuredTitle: "Destacado",
        featuredSubtitle: "Plataforma destacada de nuestra comunidad",
        partnerBadge: "SOCIO OFICIAL",
        btnAccessNow: "ACCEDER AHORA →",
        btnVisit: "Visitar Sitio",
        btnFollowX: "Seguir en X",
        btn_visit: "Visitar Sitio",
        btn_follow: "Seguir en X",
        p2pTitle: "P2P",
        p2pSubtitle: "Compra y venta directa entre personas",
        p2p_title: "P2P",
        p2p_sub: "Compra y venta directa entre personas",
        exchangesTitle: "Exchanges",
        exchangesSubtitle: "Trading y conversión de criptomonedas",
        exch_title: "Exchanges",
        exch_sub: "Trading y conversión de criptomonedas",
        hotWalletsTitle: "Hot Wallets",
        hotWalletsSubtitle: "Billeteras en línea conectadas a internet para uso diario",
        wallet_title: "Hot Wallets",
        wallet_sub: "Billeteras en línea conectadas a internet para uso diario",
        cardsTitle: "Tarjetas Cripto",
        cardsSubtitle: "Use cripto en el día a día con tarjetas",
        cardsec_title: "Tarjetas Cripto",
        cardsec_sub: "Use cripto en el día a dia con tarjetas",
        banksTitle: "Bancos Digitales",
        banksSubtitle: "Bancos digitales con funciones cripto integradas",
        bank_title: "Bancos Digitales",
        bank_sub: "Bancos digitales con funciones cripto integradas",
        trackersTitle: "Trackers",
        trackersSubtitle: "Seguimiento del mercado y datos en tiempo real",
        track_title: "Trackers",
        track_sub: "Seguimiento del mercado y datos en tiempo real",
        coldWalletsTitle: "Cold Wallets",
        coldWalletsSubtitle: "Billeteras físicas fuera de línea para máxima seguridad",
        dexsTitle: "DEXs",
        dexsSubtitle: "Exchanges descentralizadas para trading sem intermediários",
        dex_title: "DEXs",
        dex_sub: "Exchanges descentralizadas para trading sem intermediários",
        bridgesTitle: "Bridges",
        bridgesSubtitle: "Transfiera activos entre diferentes cadenas de bloques",
        bridge_title: "Bridges",
        bridge_sub: "Transfiera activos entre diferentes cadenas de bloques",
        tax_title: "Abogados y Contabilidad",
        tax_sub: "Contadores y abogados especializados en cripto",
        desc_4pfinance: "P2P on-chain y pago de facturas. Cupón MQM para descuento.",
        desc_4pfinance_rich: "P2P on-chain y pago de facturas.<br><strong>Cupón <span class=\"clickable-coupon\" data-code=\"MQM\">MQM <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> para descuento.</strong>",
        descPagCrypto: "Pag Finance ofrece soluciones completas para pagos con criptomonedas en Brasil.",
        descCamilaP2P: "Especialista brasileña en P2P. Con tarifas bajas y soporte para +1.000 Criptomoedas. Cupón MQM para descuento.",
        descP2Pme: "P2P.me es una plataforma P2P confiable para la compra y venta de criptomonedas de forma segura y rápida.",
        desc_binance: "El intercambio más grande del mundo con +270 millones de usuarios. Tarifas bajas y +500 criptomonedas disponibles.",
        desc_bybit: "Intercambio global de criptomonedas con alta liquidez, derivados avanzados y tarifas competitivas.",
        desc_kraken: "Kraken es uno de los intercambios más antiguos y confiables, conocido por su seguridad y cumplimiento normativo.",
        desc_mexc: "MEXC es un intercambio global con una amplia selección de altcoins y trading de futuros.",
        desc_coinbase: "Coinbase es el intercambio más amigable para principiantes, con una interfaz simple y alta seguridad.",
        desc_okx: "Intercambio global +70M de traders. Tarifas bajas, alta seguridad, spot/futuros/opciones.",
        desc_gateio: "Top 10 intercambio global con +4.100 activos. Spot, futuros, margen, staking y copy trading.",
        desc_bingx: "Intercambio global con copy trading, spot y futuros. +20 millones de usuarios y tarifas competitivas.",
        desc_phantom: "Billetera Web3 para Solana e Ethereum. Gestione NFTs, aceda a DeFi e troque tokens facilmente.",
        desc_rabby: "Rabby es una billetera multicadena moderna centrada en la seguridad y la experiencia del usuario en DeFi.",
        desc_xversewallet: "Xverse es la billetera líder para Bitcoin, que permite el acceso a NFTs, DeFi y aplicaciones Web3 en Bitcoin.",
        desc_metamask: "MetaMask es la billetera más popular para Ethereum y redes EVM, con soporte completo para DApps y NFTs.",
        desc_slush: "Billetera elegante para Sui. Súper aplicación para invertir, intercambiar, hacer stake y DeFi en el ecosistema Sui.",
        desc_unisat: "Billetera Bitcoin para Alkanes, Ordinals e Runes. Gestione ativos digitais em Bitcoin.",
        desc_kastfinance: "Kast ofrece tarjetas cripto que le permiten gastar sus criptomonedas diariamente con facilidad.",
        desc_offramp: "Offramp facilita la conversión de cripto a fiat con tarjetas y soluciones de pago.",
        desc_etherfi: "Ether.fi ofrece staking descentralizado y tarjetas cripto con recompensas.",
        desc_solcard: "La primera tarjeta virtual en la red Solana sin necesidad de KYC.",
        desc_bitrefill: "Compre tarjetas de regalo y recargas móviles usando criptomonedas.",
        desc_neobankless: "Neobankless es un banco digital con integración total de servicios cripto.",
        desc_revolut: "Revolut es un banco digital que integra cripto, permitiendo la compra, venta e intercambio de criptomonedas.",
        desc_bitybank: "Banco digital brasileño centrado en criptomonedas y finanzas descentralizadas.",
        desc_defibank: "El banco digital centrado en la libertad financiera y el cripto.",
        desc_ledger: "Ledger ofrece billeteras de hardware de máxima seguridad para el almacenamiento de criptomonedas fuera de línea.",
        desc_trezor: "Pionera en billeteras de hardware, ofrece la máxima seguridad para criptomonedas con código de fuente abierta.",
        desc_onekey: "Billeteras de hardware de fuente abierta con soporte multicadena para más de 5,000 criptomonedas y seguridad EAL 6+.",
        desc_uniswap: "Uniswap es la DEX más grande de Ethereum, permitiendo intercambios descentralizados sin intermediarios.",
        desc_jupiter: "Jupiter es la DEX agregadora líder en Solana, que ofrece las mejores rutas de intercambio.",
        desc_meteora: "DEX innovadora en Solana con pools dinâmicos e alta eficiência de capital.",
        desc_prjx: "Plataforma y portafolio de negociación descentralizada.",
        desc_bitflow: "DEX en el ecosistema Bitcoin/Stacks. Realice intercambios y proporcione liquidez de forma segura.",
        desc_pancakeswap: "La DEX más grande de BNB Chain con rendimientos competitivos y varias funciones DeFi.",
        desc_raydium: "AMM on-chain con livro de ordens em Solana. Operações perpétuas sem gás, até 40x alavancagem.",
        desc_liquidium: "Protocolo de préstamos cross-chain descentralizado. Preste activos entre Bitcoin, Ethereum y Solana.",
        desc_pumpfun: "Plataforma líder para el lanzamiento de memecoins en Solana, cree tokens en segundos.",
        desc_xstocks: "Opere acciones y activos tradicionales tokenizados directamente en la red.",
        desc_ondo: "Líder en RWA, trayendo bonos del tesoro estadounidense al mundo on-chain.",
        desc_kamino: "Protocolo avanzado de préstamos y optimización de liquidez en la red Solana.",
        desc_aave: "El protocolo de préstamos descentralizados más grande del mundo.",
        desc_sideshiftai: "SideShift.ai permite intercambios rápidos entre diferentes blockchains sin necesidad de registro.",
        desc_jumper: "Puente agregador que encuentra las mejores rutas para transferir activos entre cadenas.",
        desc_fixedfloat: "FixedFloat ofrece intercambios instantáneos entre criptomonedas con tarifas fijas y transparentes.",
        desc_layerswap: "Transferencias rápidas entre intercambios y blockchains con tarifas bajas.",
        desc_coinmarketcap: "Precios de criptomonedas, gráficos y capitalización de mercado.",
        desc_coingecko: "Visión general y datos del mercado de 360 grados.",
        desc_coinglass: "Datos de derivados y liquidaciones de criptomonedas.",
        desc_tradingview: "Gráficos avanzados y red social de trading.",
        desc_moshe: "Te ayudo a sacar a Brasil de tu dinero. Asesoría internacional.",
        desc_dexscreener: "Gráficos en tiempo real e análise de tokens em DEXs.",
        desc_hodle: "Negocie criptomoedas P2P de forma rápida e segura.",
        desc_satsterminal: "Swaps, empréstimos e yield de Bitcoin. Agregação de liquidez no ecossistema Bitcoin.",
        desc_b2pix: "Bolão de pronósticos cripto de la comunidad. Únete al grupo dogdamassa y haz tus pronósticos.",
        securityTitle: "Protegiéndote de los errores más comunes en cripto",
        securityDesc: "Crypto Aggregator funciona como un filtro de acceso al ecosistema cripto, validando fuentes, enlaces oficiales e información antes de dirigir al usuario.",
        securityExtremaTitle: "Seguridad Extrema",
        securityExtremaDesc: "Verificamos los enlaces oficiales de cada socio listado.",
        securityTransTitle: "Transparencia",
        securityTransDesc: "Simple de entender, fácil de confiar.",
        securityCuradoriaTitle: "Curaduría Inteligente",
        securityCuradoriaDesc: "Seleccionamos solo lo que realmente tiene sentido, evitando ruidos, promesas vacías y proyectos innecesarios.",
        securityNavegacaoTitle: "Navegação Guiada",
        securityNavegacaoDesc: "Te ayudamos a entender antes de usar. La información viene antes de la acción.",
        eduTitle: "EDUCACIÓN PRIMERO",
        eduDesc: "Pensado para principiantes y avanzados. Nuestra misión es garantizar que tengas claridad y seguridad en cada clic.",
        catTitle: "Cripto sin complicaciones,",
        catTitleSpan: "todo en un solo lugar",
        catSubtitle: "Enlaces oficiales verificados por nuestra curaduría.",
        catP2PTitle: "P2P (Peer-to-Peer)",
        catP2PDesc: "Plataformas donde las personas negocian cripto directamente entre sí, sin intermediarios.",
        catExTitle: "Exchanges (Casas de cambio)",
        catExDesc: "Plataformas centralizadas que permiten comprar, vender y negociar cripto con facilidad.",
        catDexTitle: "DEXs (Casas de cambio descentralizadas)",
        catDexDesc: "Plataformas descentralizadas donde intercambias cripto directamente desde tu billetera, sin custodia.",
        catBanksTitle: "Bancos digitales",
        catBanksDesc: "Bancos digitales y servicios financieros que integran cripto al sistema tradicional.",
        catCardsTitle: "Tarjetas Cripto",
        catCardsDesc: "Tarjetas que permiten gastar criptomoneda en el mundo real.",
        catBridgesTitle: "Bridges (Puentes)",
        catBridgesDesc: "Herramientas que permiten mover activos entre diferentes cadenas de bloques.",
        catWalletsTitle: "Wallets (Billeteras)",
        catWalletsDesc: "Aplicaciones donde guardas, envías y recibes criptomonedas con control total.",
        footerDesc: "Tu puerta de entrada y salida al mundo cripto",
        footerServices: "Servicios",
        footerNewsletterTitle: "Mantente actualizado",
        footerNewsletterDesc: "Recibe las mejores oportunidades y noticias del mundo cripto.",
        newsletterPlaceholder: "Tu mejor correo electrónico",
        newsletterBtn: "Suscribirse",
        newsletterSuccess: "✓ ¡Gracias por suscribirte!",
        footerRights: "Todos los derechos reservados.",
        toastCopied: "¡Cupón copiado con éxito!"
    }
};

let currentLang = localStorage.getItem('prefLang') || 'pt';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('prefLang', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Also handle placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;

    // Sync with inline switchers if they exist (btn-pt, btn-en, btn-es)
    ['pt','en','es'].forEach(l => {
        const b = document.getElementById('btn-' + l);
        if(b) b.style.opacity = lang === l ? '1' : '0.5';
    });
    
    // Update active state in dropdown
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('active');
        }
    });

    // Update active state for specific buttons (PT, EN, ES)
    document.querySelectorAll('[data-lang-switch]').forEach(b => {
        b.classList.remove('active');
        if (b.getAttribute('data-lang-switch') === lang) {
            b.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initCouponSystem();
    
    // Initial language setup
    setLanguage(currentLang);

    // Connect Dropdown Buttons
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);
            const dropdown = document.getElementById('lang-dropdown');
            if (dropdown) dropdown.classList.add('hidden'); // Close dropdown
        });
    });

    // Connect All Platforms Language Buttons (data-lang-switch)
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang-switch');
            setLanguage(selectedLang);
        });
    });

    // Connect legacy inline switchers (btn-pt, btn-en, btn-es)
    ['pt','en','es'].forEach(lang => {
        const btn = document.getElementById('btn-' + lang);
        if (btn) {
            btn.addEventListener('click', () => {
                setLanguage(lang);
                if (typeof gtag === 'function') {
                    gtag('event', 'change_language', { 'language': lang });
                }
            });
        }
    });
});

/* ========================================= */
/* FOOTER PADDING FIX                        */
/* ========================================= */
window.addEventListener('load', function() {
    // Add padding to the body so the footer doesn't cover site content
    document.body.style.paddingBottom = '45px';
});

/* ========================================= */
/* MOBILE MENU TOGGLE LOGIC                  */
/* ========================================= */
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (menuBtn && navMenu) {
    // Force reset to avoid any overlapping bindings
    menuBtn.replaceWith(menuBtn.cloneNode(true));
    const newMenuBtn = document.getElementById('mobile-menu-btn');

    newMenuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        navMenu.classList.remove('active');
        navMenu.style.setProperty('display', 'none', 'important');
      } else {
        navMenu.classList.add('active');
        navMenu.style.setProperty('display', 'flex', 'important');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !newMenuBtn.contains(e.target)) {
          navMenu.classList.remove('active');
          navMenu.style.setProperty('display', 'none', 'important');
        }
      }
    });
  }
});