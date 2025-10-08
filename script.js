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
                    pt: 'Carteira Web3 multi-chain líder com suporte completo a DeFi, NFTs e trading. Interface amigável para iniciantes e usuários avançados.',
                    en: 'Leading multi-chain Web3 wallet with complete DeFi, NFTs and trading support. User-friendly interface for beginners and advanced users.'
                }
            },
            'comprecripto': {
                name: 'Compre Cripto',
                url: 'https://comprecripto.io/?ref=mqm',
                logo: 'https://logo.clearbit.com/comprecripto.io',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=comprecripto.io&sz=64',
                description: {
                    pt: 'Plataforma brasileira P2P para comprar Bitcoin e outras criptomoedas com PIX, TED e DOC de forma rápida e segura. Use o cupom MQM para desconto.',
                    en: 'Brazilian P2P platform to buy Bitcoin and other cryptocurrencies with PIX, TED and DOC quickly and safely. Use coupon MQM for discount.'
                }
            },
            'p2pme': {
                name: 'P2P.me',
                url: 'https://br.p2p.me/recommend?address=0xa4884FEA51387224e6039b6903EeeFE24Fab7251&nonce=559537&signature=0x9561591564c21ffb8be3a4d7a8ecf0d1d45cbae59469cb24359cbc70ffa4cde86aa2cb0151e158667a4622af32aba022d5d22427a2b250d8810a334e8a5714401b',
                logo: 'https://logo.clearbit.com/p2p.me',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=p2p.me&sz=64',
                description: {
                    pt: 'Marketplace P2P global descentralizado. Negocie criptomoedas diretamente com outros usuários com segurança e privacidade.',
                    en: 'Global decentralized P2P marketplace. Trade cryptocurrencies directly with other users with security and privacy.'
                }
            },
            'camilap2p': {
                name: 'Camila P2P',
                url: 'https://camilap2p.com.br',
                logo: 'https://www.google.com/s2/favicons?domain=camilap2p.com.br&sz=128',
                fallbackLogo: 'https://logo.clearbit.com/camilap2p.com.br',
                description: {
                    pt: 'Plataforma P2P brasileira para negociar criptomoedas de forma segura e rápida. Use o cupom MQM para desconto.',
                    en: 'Brazilian P2P platform to trade cryptocurrencies safely and quickly. Use coupon MQM for discount.'
                }
            },
            'binance': {
                name: 'Binance',
                url: 'https://www.binance.com/activity/referral-entry/CPA?ref=CPA_0001DCF8M6',
                logo: 'https://logo.clearbit.com/binance.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=binance.com&sz=64',
                description: {
                    pt: 'A Binance é a maior exchange de criptomoedas do mundo, atendendo mais de 270 milhões de usuários em mais de 180 países. Com taxas baixas e mais de 500 criptomoedas disponíveis.',
                    en: 'Binance is the world\'s largest cryptocurrency exchange, serving 270+ million users in 180+ countries. Low fees and 500+ cryptocurrencies available.'
                }
            },
            'bybit': {
                name: 'Bybit',
                url: 'https://www.bybit.com/invite?ref=YNAGP8',
                logo: 'https://logo.clearbit.com/bybit.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=bybit.com&sz=64',
                description: {
                    pt: 'Bybit é a segunda maior exchange de criptomoedas do mundo por volume de negociação, servindo mais de 60 milhões de usuários. Fundada em 2018, oferece mais de 650 criptomoedas com alta segurança e interface intuitiva.',
                    en: 'Bybit is the world\'s second-largest cryptocurrency exchange by trading volume, serving over 60 million users. Founded in 2018, it offers 650+ cryptocurrencies with high security and intuitive interface.'
                }
            },
            'kraken': {
                name: 'Kraken',
                url: 'https://invite.kraken.com/JDNW/de6w7cmj',
                logo: 'https://logo.clearbit.com/kraken.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=kraken.com&sz=64',
                description: {
                    pt: 'Kraken é uma das exchanges mais antigas e seguras do mundo, fundada em 2011. Atende mais de 10 milhões de usuários em 190+ países com mais de 200 criptomoedas e segurança de nível institucional.',
                    en: 'Kraken is one of the world\'s oldest and most secure exchanges, founded in 2011. It serves 10+ million users in 190+ countries with 200+ cryptocurrencies and institutional-grade security.'
                }
            },
            'mexc': {
                name: 'MEXC',
                url: 'https://promote.mexc.com/a/Q26ooE1o',
                logo: 'https://www.google.com/s2/favicons?domain=mexc.com&sz=128',
                fallbackLogo: 'https://logo.clearbit.com/mexc.com',
                description: {
                    pt: 'MEXC é uma exchange global estabelecida em 2018, servindo mais de 40 milhões de usuários em 170+ países. Conhecida por suas taxas extremamente baixas (0% maker fee) e mais de 3.000 criptomoedas disponíveis.',
                    en: 'MEXC is a global exchange established in 2018, serving 40+ million users in 170+ countries. Known for its extremely low fees (0% maker fee) and 3,000+ cryptocurrencies available.'
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
                    pt: 'KAST é um cartão Visa global que permite gastar criptomoedas em mais de 170 países. Oferece conversão instantânea de USDC e USDT para USD com taxas de 0%, cashback de até 15%, e compatibilidade com Apple Pay e Google Pay. Limite de gastos ilimitado e suporte 24/7.',
                    en: 'KAST is a global Visa card that lets you spend cryptocurrencies in 170+ countries. It offers instant conversion of USDC and USDT to USD with 0% fees, up to 15% cashback, and compatibility with Apple Pay and Google Pay. Unlimited spending limit and 24/7 support.'
                }
            },
            'offramp': {
                name: 'Offramp',
                url: 'https://app.offramp.xyz/login?referralCode=iokost',
                logo: 'https://logo.clearbit.com/offramp.xyz',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=offramp.xyz&sz=64',
                description: {
                    pt: 'Offramp é um cartão Visa virtual não-custodial que suporta mais de 4.000 criptomoedas em 190+ países. Oferece conversão de cripto para USD com apenas 0,5% de taxa, limite de gastos ilimitado, e compatibilidade com Apple Pay e Google Pay para pagamentos globais.',
                    en: 'Offramp is a non-custodial virtual Visa card that supports 4,000+ cryptocurrencies in 190+ countries. It offers crypto-to-USD conversion with only 0.5% fee, unlimited spending limit, and compatibility with Apple Pay and Google Pay for global payments.'
                }
            },
            'etherfi': {
                name: 'Ether.fi',
                url: 'https://www.ether.fi/refer/6ad38ada',
                logo: 'https://logo.clearbit.com/ether.fi',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=ether.fi&sz=64',
                description: {
                    pt: 'Ether.fi Cash é um cartão de crédito Visa não-custodial que permite usar cripto como garantia sem vendê-la. Oferece 3% de cashback em todas as compras, integração com DeFi, e compatibilidade com Apple Pay e Google Pay. Disponível em formatos virtual e físico para uso global.',
                    en: 'Ether.fi Cash is a non-custodial Visa credit card that lets you use crypto as collateral without selling it. It offers 3% cashback on all purchases, DeFi integration, and compatibility with Apple Pay and Google Pay. Available in virtual and physical formats for global use.'
                }
            },
            'revolut': {
                name: 'Revolut',
                url: 'https://revolut.com/referral/?referral-code=waldir3l75!SEP1-25-AR-MDL-ROI&geo-redirect',
                logo: 'https://logo.clearbit.com/revolut.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=revolut.com&sz=64',
                description: {
                    pt: 'Revolut é um banco digital all-in-one usado por mais de 60 milhões de clientes globalmente. Oferece serviços bancários, investimentos e trading de criptomoedas, permitindo comprar, vender e trocar mais de 210 criptomoedas com taxas competitivas e interface intuitiva.',
                    en: 'Revolut is an all-in-one digital bank used by 60+ million customers globally. It offers banking services, investments, and crypto trading, allowing you to buy, sell, and exchange 210+ cryptocurrencies with competitive fees and intuitive interface.'
                }
            },
            'xverse': {
                name: 'Xverse Wallet',
                url: 'https://www.xverse.app/?utm_campaign=dogdamassa&fbclid=PAZnRzaANI0IBleHRuA2FlbQIxMQABpxeUZWEqzLu82FgMlCTcA4tRAwBA-H4ilQnR2PCxs4r78yqbldkLOKz4SvmN_aem_R_LGjSLfZSg96jqS-fbWwA',
                logo: 'https://xverse.app/favicon.ico',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=xverse.app&sz=64',
                description: {
                    pt: 'Xverse é a carteira Bitcoin mais avançada e fácil de usar, confiada por mais de 1,7 milhão de usuários. Suporta Bitcoin, Ordinals, Runes, BRC-20 e Layer 2s como Stacks e Starknet. Carteira não-custodial com segurança de nível institucional e interface amigável para iniciantes.',
                    en: 'Xverse is the most advanced and user-friendly Bitcoin wallet, trusted by over 1.7 million users. It supports Bitcoin, Ordinals, Runes, BRC-20, and Layer 2s like Stacks and Starknet. Non-custodial wallet with institutional-grade security and beginner-friendly interface.'
                }
            },
            'ledger': {
                name: 'Ledger',
                url: 'https://shop.ledger.com/?r=9414e4bea285&tracker=MY_TRACKER',
                logo: 'https://logo.clearbit.com/ledger.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=ledger.com&sz=64',
                description: {
                    pt: 'Ledger é a carteira de hardware líder mundial para armazenamento seguro de criptomoedas. Com milhões de dispositivos vendidos globalmente, oferece proteção offline com chip Secure Element, suportando mais de 5.500 moedas e tokens incluindo Bitcoin, Ethereum e Solana.',
                    en: 'Ledger is the world\'s leading hardware wallet for secure cryptocurrency storage. With millions of devices sold globally, it offers offline protection with Secure Element chip, supporting 5,500+ coins and tokens including Bitcoin, Ethereum, and Solana.'
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