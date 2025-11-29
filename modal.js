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
            twitter: 'https://twitter.com/camilap2p'
        },
        'p2pme': {
            name: 'P2P.me',
            description: 'P2P.me é uma plataforma P2P confiável para compra e venda de criptomoedas com segurança e rapidez.',
            website: 'https://p2p.me',
            twitter: null
        },
        'pagcrypto': {
            name: 'PagCrypto',
            description: 'PagCrypto oferece soluções completas para pagamentos com criptomoedas no Brasil.',
            website: 'https://pagcrypto.finance',
            twitter: null
        },
        'comprecripto': {
            name: 'Compre Cripto',
            description: 'Compre Cripto facilita a compra de criptomoedas de forma simples e segura.',
            website: 'https://comprecripto.io',
            twitter: null
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
            website: 'https://www.bybit.com/pt-BR/invite/brazil/?ref=YNAGP8',
            twitter: 'https://twitter.com/Bybit_Official'
        },
        'kraken': {
            name: 'Kraken',
            description: 'Kraken é uma das exchanges mais antigas e confiáveis, conhecida por sua segurança e conformidade regulatória.',
            website: 'https://invite.kraken.com/JDNW/de6w7cmj',
            twitter: 'https://twitter.com/krakenfx'
        },
        'mexc': {
            name: 'MEXC',
            description: 'MEXC é uma exchange global com ampla seleção de altcoins e trading de futuros.',
            website: 'https://mexc.com',
            twitter: 'https://twitter.com/MEXC_Official'
        },
        'coinbase': {
            name: 'Coinbase',
            description: 'Coinbase é a exchange mais amigável para iniciantes, com interface simples e alta segurança.',
            website: 'https://coinbase.com',
            twitter: 'https://twitter.com/coinbase'
        },
        'phantom': {
            name: 'Phantom',
            description: 'Phantom é uma carteira Web3 amigável e segura para Solana e Ethereum. Gerencia NFTs, acessa DeFi e troca tokens diretamente na carteira.',
            website: 'https://phantom.app',
            twitter: 'https://twitter.com/phantom'
        },
        'rabby': {
            name: 'Rabby',
            description: 'Rabby é uma carteira multi-chain moderna focada em segurança e experiência do usuário em DeFi.',
            website: 'https://rabby.io',
            twitter: 'https://twitter.com/Rabby_io'
        },
        'xverse': {
            name: 'Xverse Wallet',
            description: 'Xverse é a principal carteira para Bitcoin, permitindo acesso a NFTs, DeFi e aplicativos Web3 no Bitcoin.',
            website: 'https://www.xverse.app/?utm_campaign=dogdamassa&fbclid=PAZnRzaANI0IBleHRuA2FlbQIxMQABpxeUZWEqzLu82FgMlCTcA4tRAwBA-H4ilQnR2PCxs4r',
            twitter: 'https://twitter.com/XverseApp'
        },
        'metamask': {
            name: 'MetaMask',
            description: 'MetaMask é a carteira mais popular para Ethereum e redes EVM, com suporte completo a DApps e NFTs.',
            website: 'https://metamask.io',
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
            website: 'https://revolut.com/referral/?referral-code=waldir3l75!SEP1-25-AR-MDL-ROI&geo-redirect',
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
            website: 'https://neobankless.com',
            twitter: 'https://twitter.com/neobankless'
        },
        'ledger': {
            name: 'Ledger',
            description: 'Ledger oferece hardware wallets de máxima segurança para armazenamento de criptomoedas offline.',
            website: 'https://ledger.com',
            twitter: 'https://twitter.com/Ledger'
        },
        'uniswap': {
            name: 'Uniswap',
            description: 'Uniswap é a maior DEX do Ethereum, permitindo trocas descentralizadas sem intermediários.',
            website: 'https://uniswap.org',
            twitter: 'https://twitter.com/Uniswap'
        },
        'jupiter': {
            name: 'Jupiter',
            description: 'Jupiter é a principal DEX agregadora em Solana, oferecendo as melhores rotas de swap.',
            website: 'https://jup.ag',
            twitter: 'https://twitter.com/JupiterExchange'
        },
        'meteora': {
            name: 'Meteora',
            description: 'Meteora é uma DEX inovadora em Solana com pools dinâmicos e alta eficiência de capital.',
            website: 'https://meteora.ag',
            twitter: 'https://twitter.com/MeteoraAG'
        },
        'pancakeswap': {
            name: 'PancakeSwap',
            description: 'PancakeSwap é a maior DEX da BNB Chain com yields competitivos e diversas features DeFi.',
            website: 'https://pancakeswap.finance',
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
            website: 'https://newshare.bwb.global/en/invite_earn_coin?inviteCode=SJQDBe&deepLinkType=card&utmSource=referral2.0_copyLink',
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
            console.warn('Platform not found:', platformId);
            return;
        }

        // Update modal content
        modalLogo.src = logoSrc;
        modalLogo.alt = data.name;
        modalTitle.textContent = data.name;
        modalDescription.textContent = data.description;

        // Update links
        modalWebsite.href = data.website;
        console.log('✅ Website link set:', data.website);

        // Show/hide Twitter button based on availability
        if (data.twitter) {
            modalTwitter.href = data.twitter;
            modalTwitter.style.display = 'flex';
            console.log('✅ Twitter link set:', data.twitter);
        } else {
            modalTwitter.style.display = 'none';
            console.log('ℹ️ No Twitter link for:', data.name);
        }

        // Scroll to top smoothly before showing modal
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Show modal
        modalOverlay.classList.add('active');
        document.body.classList.add('modal-open');
    }

    // Close modal function
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Add click listeners to all platform cards
    document.addEventListener('click', function(e) {
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
