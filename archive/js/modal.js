// ============================================
// MODAL SYSTEM - CLEAN IMPLEMENTATION
// ============================================

(function() {
    'use strict';

    // Platform data with descriptions and links
    const platformsData = {
        'camilap2p': {
            name: 'Camila P2P',
            description: 'Camila P2P é especialista brasileira em compra e venda de criptomoedas com mais de 40 mil negociações realizadas. Oferece atendimento humanizado, taxas baixas, segurança total e suporte para mais de 1.000 criptomoedas incluindo Bitcoin e Ethereum.',
            website: 'https://camilap2p.com',
            twitter: ''
        },
        'p2pme': {
            name: 'P2P.me',
            description: 'P2P.me é uma plataforma P2P confiável para compra e venda de criptomoedas com segurança e rapidez.',
            website: 'https://p2p.me',
            twitter: 'https://twitter.com/p2pme_official'
        },
        'pagcrypto': {
            name: 'Pag Finance',
            description: 'Pag Finance oferece soluções completas para pagamentos com criptomoedas no Brasil.',
            website: 'https://www.pag.finance/?r=MQM',
            twitter: 'https://twitter.com/PagFinance'
        },
        'comprecripto': {
            name: 'Compre Cripto',
            description: 'Compre Cripto facilita a compra de criptomoedas de forma simples e segura.',
            website: 'https://comprecripto.io',
            twitter: 'https://twitter.com/comprecripto'
        },
        'crypix': {
            name: 'Crypix',
            description: 'Plataforma multi-chain para conversão de criptomoedas em PIX e pagamento de boletos. Sem burocracia, taxa de 2% e configuração em 2 minutos.',
            website: 'https://crypix.me',
            twitter: ''
        },
        'pixgo': {
            name: 'Pixgo',
            description: 'Receba PIX sem conta bancária. Plataforma de pagamentos digitais com PIX sem burocracia, taxa fixa de 2% e configuração em 2 minutos.',
            website: 'https://pixgo.org',
            twitter: ''
        },
        'binance': {
            name: 'Binance',
            description: 'A Binance é a maior exchange de criptomoedas do mundo, atendendo mais de 270 milhões de usuários em mais de 180 países. Com taxas baixas e mais de 500 criptomoedas disponíveis.',
            website: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_0001DCF8M6',
            twitter: 'https://twitter.com/binance'
        },
        'bybit': {
            name: 'Bybit',
            description: 'Bybit é uma exchange líder em trading de derivativos de criptomoedas, oferecendo plataforma avançada e alta liquidez.',
            website: 'https://www.bybit.com/invite?ref=YNAGP8',
            twitter: 'https://twitter.com/Bybit_Official'
        },
        'kraken': {
            name: 'Kraken',
            description: 'Kraken é uma das exchanges mais antigas e confiáveis, conhecida por sua segurança e conformidade regulatória.',
            website: 'https://www.kraken.com/invite/JDNW',
            twitter: 'https://twitter.com/krakenfx'
        },
        'mexc': {
            name: 'MEXC',
            description: 'MEXC é uma exchange global com ampla seleção de altcoins e trading de futuros.',
            website: 'https://www.mexc.com/register?inviteCode=mexc-1eLdR',
            twitter: 'https://twitter.com/MEXC_Official'
        },
        'coinbase': {
            name: 'Coinbase',
            description: 'Coinbase é a exchange mais amigável para iniciantes, com interface simples e alta segurança.',
            website: 'https://www.coinbase.com/join/COINBASE2024',
            twitter: 'https://twitter.com/coinbase'
        },
        'phantom': {
            name: 'Phantom',
            description: 'Phantom é uma carteira Web3 amigável e segura para Solana e Ethereum. Gerencia NFTs, acessa DeFi e troca tokens diretamente na carteira.',
            website: 'https://phantom.app/download',
            twitter: 'https://twitter.com/phantom'
        },
        'rabby': {
            name: 'Rabby',
            description: 'Rabby é uma carteira multi-chain moderna focada em segurança e experiência do usuário em DeFi.',
            website: 'https://rabby.io/download',
            twitter: 'https://twitter.com/Rabby_io'
        },
        'xverse': {
            name: 'Xverse Wallet',
            description: 'Xverse é a principal carteira para Bitcoin, permitindo acesso a NFTs, DeFi e aplicativos Web3 no Bitcoin.',
            website: 'https://www.xverse.app/download',
            twitter: 'https://twitter.com/XverseApp'
        },
        'metamask': {
            name: 'MetaMask',
            description: 'MetaMask é a carteira mais popular para Ethereum e redes EVM, com suporte completo a DApps e NFTs.',
            website: 'https://metamask.io/download/',
            twitter: 'https://twitter.com/MetaMask'
        },
        'kast': {
            name: 'Kast Finance',
            description: 'Kast oferece cartões cripto que permitem gastar suas criptomoedas no dia a dia com facilidade.',
            website: 'https://kast.xyz',
            twitter: 'https://twitter.com/kastfinance'
        },
        'offramp': {
            name: 'Offramp',
            description: 'Offramp facilita a conversão de cripto para fiat com cartões e soluções de pagamento.',
            website: 'https://offramp.xyz',
            twitter: 'https://twitter.com/OfframpMoney'
        },
        'etherfi': {
            name: 'Ether.fi',
            description: 'Ether.fi oferece staking descentralizado e cartões cripto com recompensas.',
            website: 'https://ether.fi',
            twitter: 'https://twitter.com/ether_fi'
        },
        'revolut': {
            name: 'Revolut',
            description: 'Revolut é um banco digital que integra crypto, permitindo compra, venda e troca de criptomoedas.',
            website: 'https://revolut.com/referral/?referral-code=waldir3l75',
            twitter: 'https://twitter.com/RevolutApp'
        },
        'bitybank': {
            name: 'Bitybank',
            description: 'Bitybank é um banco digital brasileiro com foco em criptomoedas e finanças descentralizadas.',
            website: 'https://bity.com.br/mgm/180879',
            twitter: 'https://twitter.com/BityPrePay'
        },
        'neobankless': {
            name: 'Neobankless',
            description: 'Neobankless é um banco digital com integração total de serviços cripto.',
            website: 'https://neobankless.com/MQM',
            twitter: 'https://twitter.com/neobankless'
        },
        'ledger': {
            name: 'Ledger',
            description: 'Ledger oferece hardware wallets de máxima segurança para armazenamento de criptomoedas offline.',
            website: 'https://shop.ledger.com/?r=cryptohub',
            twitter: 'https://twitter.com/Ledger'
        },
        'uniswap': {
            name: 'Uniswap',
            description: 'Uniswap é a maior DEX do Ethereum, permitindo trocas descentralizadas sem intermediários.',
            website: 'https://app.uniswap.org',
            twitter: 'https://twitter.com/Uniswap'
        },
        'jupiter': {
            name: 'Jupiter',
            description: 'Jupiter é a principal DEX agregadora em Solana, oferecendo as melhores rotas de swap.',
            website: 'https://jup.ag/swap',
            twitter: 'https://twitter.com/JupiterExchange'
        },
        'meteora': {
            name: 'Meteora',
            description: 'Meteora é uma DEX inovadora em Solana com pools dinâmicos e alta eficiência de capital.',
            website: 'https://app.meteora.ag',
            twitter: 'https://twitter.com/MeteoraAG'
        },
        'pancakeswap': {
            name: 'PancakeSwap',
            description: 'PancakeSwap é a maior DEX da BNB Chain com yields competitivos e diversas features DeFi.',
            website: 'https://pancakeswap.finance/swap',
            twitter: 'https://twitter.com/PancakeSwap'
        },
        'sideshift': {
            name: 'SideShift.ai',
            description: 'SideShift.ai permite trocas rápidas entre diferentes blockchains sem necessidade de registro.',
            website: 'https://sideshift.ai',
            twitter: 'https://twitter.com/SideShiftAI'
        },
        'jumper': {
            name: 'Jumper',
            description: 'Jumper é uma bridge agregadora que encontra as melhores rotas para transferir ativos entre chains.',
            website: 'https://jumper.exchange',
            twitter: 'https://twitter.com/JumperExchange'
        },
        'fixedfloat': {
            name: 'FixedFloat',
            description: 'FixedFloat oferece swaps instantâneos entre criptomoedas com taxas fixas e transparentes.',
            website: 'https://ff.io',
            twitter: 'https://twitter.com/FixedFloat'
        },
        'bitget-featured': {
            name: 'Bitget Wallet',
            description: 'Carteira Web3 multi-chain líder com suporte completo a DeFi, NFTs e trading. Mais de 60 milhões de usuários confiam na Bitget para gerenciar seus ativos digitais com segurança.',
            website: 'https://web3.bitget.com/invite?code=SJQDBe',
            twitter: 'https://twitter.com/BitgetWallet'
        },
        'trezor': {
            name: 'Trezor',
            description: 'Pioneira em hardware wallets, oferece máxima segurança para criptomoedas com código open-source.',
            website: 'https://trezor.io',
            twitter: 'https://twitter.com/Trezor'
        },
        'pumpfun': {
            name: 'Pump.fun',
            description: 'Plataforma líder para lançamento de memecoins em Solana, crie tokens em segundos.',
            website: 'https://pump.fun',
            twitter: 'https://twitter.com/pumpdotfun'
        },
        'layerswap': {
            name: 'Layerswap',
            description: 'Transferências rápidas entre exchanges e blockchains com taxas baixas.',
            website: 'https://layerswap.io',
            twitter: 'https://twitter.com/layerswap'
        },
        'bitso': {
            name: 'Bitso',
            description: 'Cartão cripto para gastar criptomoedas em qualquer lugar da América Latina.',
            website: 'https://bitso.com',
            twitter: 'https://twitter.com/Bitso'
        },
        'bitcard': {
            name: 'Bitcard',
            description: 'Cartão cripto para gastar Bitcoin diretamente com recompensas em cashback.',
            website: 'https://bitcard.io',
            twitter: 'https://twitter.com/bitcard_io'
        },
        '4pfinance': {
            name: '4P Finance',
            description: 'Compre e Venda Criptomoedas via P2P direto na Blockchain. Pagamento de boletos com cripto através de instituições financeiras registradas.',
            website: 'https://4p.finance',
            twitter: 'https://twitter.com/4payFinance'
        },
        'kryptera': {
            name: 'Kryptera',
            description: 'Plataforma P2P para negociação de criptomoedas com segurança e praticidade.',
            website: 'https://kryptera.com',
            twitter: 'https://twitter.com/krypteratweets'
        },
        'okx': {
            name: 'OKX',
            description: 'Exchange global de criptomoedas com mais de 70 milhões de traders. Taxas baixas, alta segurança e trading avançado de spot, futuros e opções.',
            website: 'https://www.okx.com/join/CRYPTOHUB',
            twitter: 'https://twitter.com/okx'
        },
        'gateio': {
            name: 'Gate.io',
            description: 'Uma das top 10 exchanges globais com mais de 4.100 ativos digitais. Trading de spot, futuros, margin, staking e copy trading.',
            website: 'https://www.gate.io/signup/PEYEQdSb',
            twitter: 'https://x.com/gate_io'
        },
        'magiceden': {
            name: 'Magic Eden Wallet',
            description: 'Carteira multi-chain focada em NFTs com swaps instantâneos, gerenciamento de portfólio, suporte a Ordinals e BRC20. A única carteira que você precisa.',
            website: 'https://wallet.magiceden.io/download',
            twitter: 'https://twitter.com/MagicEden'
        },
        'slush': {
            name: 'Slush',
            description: 'Carteira simples, segura e elegante para todo o ecossistema Sui. Seu super app Sui para investir, fazer swap, stake e usar em DeFi.',
            website: 'https://slush.app',
            twitter: 'https://x.com/SlushWallet'
        },
        'unisat': {
            name: 'UniSat',
            description: 'Carteira Bitcoin com suporte a Alkanes, Ordinals e Runes. Extensão de navegador para gerenciar e negociar ativos digitais na rede Bitcoin.',
            website: 'https://unisat.io/download',
            twitter: 'https://twitter.com/unisat_wallet'
        },
        'cypher': {
            name: 'Cypher',
            description: 'Transforme cripto em moeda do dia a dia com Cypher Card. Recarregue com mais de 500 tokens das redes EVM, Cosmos, Solana e Tron.',
            website: 'https://cypherhq.io/card',
            twitter: 'https://x.com/Cypher_HQ_'
        },
        'orbitx': {
            name: 'OrbitX',
            description: 'O cartão cripto mais PREMIUM, powered by VISA Signature. Verdadeiramente self-custodial onde VOCÊ possui as chaves e benefícios premium. Stablecoins gastáveis!',
            website: 'https://orbitxpay.com/get-card',
            twitter: 'https://x.com/OrbitX_Pay'
        },
        'raydium': {
            name: 'Raydium',
            description: 'AMM on-chain com order book impulsionando a evolução do DeFi em Solana. Trading perp sem gas, até 40x alavancagem e taxas ultra-baixas.',
            website: 'https://raydium.io/swap',
            twitter: 'https://x.com/RaydiumProtocol'
        },
        'bitflow': {
            name: 'Bitflow',
            description: 'A DEX para Bitcoiners com agregador potente garantindo as melhores taxas de swap na Stacks. Trading de Bitcoin, SIP10 tokens e Runes com yield.',
            website: 'https://www.bitflow.finance',
            twitter: 'https://twitter.com/bitflow'
        },
        'liquidium': {
            name: 'Liquidium',
            description: 'O primeiro protocolo de empréstimos cross-chain verdadeiramente descentralizado. Empreste ou pegue emprestado qualquer ativo entre Bitcoin, Ethereum e Solana.',
            website: 'https://liquidium.fi',
            twitter: 'https://x.com/liquidiumfi'
        },
        'satsterminal': {
            name: 'Sats Terminal',
            description: 'O melhor app para swaps, empréstimos e yield de Bitcoin. Agregação de liquidez para o ecossistema Bitcoin com o algoritmo SatStream.',
            website: 'https://www.satsterminal.com',
            twitter: 'https://x.com/SatsTerminal'
        }
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }

    function initModal() {
        // Modal elements
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const modalBack = document.getElementById('modalBack');
        const modalLogo = document.getElementById('modalLogo');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalTwitter = document.getElementById('modalTwitter');
        const modalWebsite = document.getElementById('modalWebsite');

        // Debug: Check if elements exist
        console.log('🔍 Modal Elements Check:', {
            overlay: !!modalOverlay,
            close: !!modalClose,
            back: !!modalBack,
            logo: !!modalLogo,
            title: !!modalTitle,
            description: !!modalDescription,
            twitter: !!modalTwitter,
            website: !!modalWebsite
        });

    // Open modal function
    function openModal(platformId, logoSrc) {
        const data = platformsData[platformId];
        if (!data) {
            console.warn('❌ Platform not found:', platformId);
            return;
        }

        console.log('🚀 Opening modal for:', data.name);

        // Update modal content
        modalLogo.src = logoSrc;
        modalLogo.alt = data.name;
        modalTitle.textContent = data.name;
        modalDescription.textContent = data.description;

        // CRITICAL: Update links FIRST, before showing modal
        if (!modalWebsite || !modalTwitter) {
            console.error('❌ Modal buttons not found!');
            return;
        }

        // Set website link
        modalWebsite.href = data.website;
        modalWebsite.setAttribute('href', data.website); // Double ensure
        console.log('✅ Website link set:', modalWebsite.href);

        // Show/hide Twitter button based on availability
        if (data.twitter) {
            modalTwitter.href = data.twitter;
            modalTwitter.setAttribute('href', data.twitter); // Double ensure
            modalTwitter.style.display = 'flex';
            console.log('✅ Twitter link set:', modalTwitter.href);
        } else {
            modalTwitter.style.display = 'none';
            modalTwitter.href = '#';
            console.log('ℹ️ No Twitter link for:', data.name);
        }

        // Verify links are set correctly
        console.log('🔗 Final check - Website:', modalWebsite.href);
        console.log('🔗 Final check - Twitter:', modalTwitter.href);

        // Scroll to top smoothly before showing modal
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Show modal with slight delay to ensure links are set
        setTimeout(() => {
            modalOverlay.classList.add('active');
            document.body.classList.add('modal-open');
            console.log('✅ Modal is now visible');
        }, 50);
    }

    // Close modal function
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Add click listeners to all platform cards
    document.addEventListener('click', function(e) {
        // CRITICAL: Don't interfere with modal link buttons
        if (e.target.closest('#modalTwitter') || e.target.closest('#modalWebsite')) {
            console.log('🔗 Link button clicked - allowing default navigation');
            return; // Let the link work naturally
        }

        const card = e.target.closest('.platform-card');
        if (card) {
            const platformId = card.getAttribute('data-platform');
            const logoImg = card.querySelector('.platform-logo img');
            const logoSrc = logoImg ? logoImg.src : '';

            // Use setTimeout to ensure this runs after analytics
            setTimeout(() => {
                openModal(platformId, logoSrc);
            }, 10);
        }
    }, true); // Use capture phase

    // Add click listener to premium banner
    document.addEventListener('click', function(e) {
        // CRITICAL: Don't interfere with modal link buttons
        if (e.target.closest('#modalTwitter') || e.target.closest('#modalWebsite')) {
            console.log('🔗 Link button clicked - allowing default navigation');
            return; // Let the link work naturally
        }

        const banner = e.target.closest('.premium-hero-banner');
        if (banner) {
            // Don't open modal if clicking the CTA button
            if (e.target.closest('.premium-cta-button')) {
                return;
            }
            const platformId = banner.getAttribute('data-platform');
            const logoImg = banner.querySelector('.premium-hero-logo img');
            const logoSrc = logoImg ? logoImg.src : '';

            // Use setTimeout to ensure this runs after analytics
            setTimeout(() => {
                openModal(platformId, logoSrc);
            }, 10);
        }
    }, true); // Use capture phase

    // Close modal events
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBack) modalBack.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    } // End of initModal()

})();
