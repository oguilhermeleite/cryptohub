// Crypto Agregator - Enhanced JavaScript with Modal System and Horizontal Scrolling

class CryptoAgregator {
    constructor() {
        this.currentLang = this.getStoredLanguage() || 'pt';
        this.translations = {
            pt: {
                'hero-title': 'Sua Porta de Entrada Completa para o Mundo Cripto',
                'hero-subtitle': 'Encontre a melhor forma de comprar, vender e usar criptomoedas com segurança',
                'hero-cta': 'Começar Agora',
                'nav-featured': 'Mais Acessados',
                'nav-cards': 'Cartões',
                'nav-security': 'Segurança',
                'featured-title': 'Mais Acessados',
                'featured-subtitle': 'Plataformas mais populares da nossa comunidade',
                'p2p-subtitle': 'Compra e venda direto entre pessoas',
                'exchanges-subtitle': 'Trading e conversão de criptomoedas',
                'cards-title': 'Cartões Cripto',
                'cards-subtitle': 'Gaste cripto no dia a dia com cartões',
                'security-title': 'Segurança',
                'security-subtitle': 'Proteja seus investimentos com segurança máxima',
                'visit-site': 'Visitar Site',
                'back': 'Voltar',
                'footer-desc': 'Sua porta de entrada completa para o mundo cripto',
                'footer-services': 'Serviços',
                'footer-rights': 'Todos os direitos reservados.'
            },
            en: {
                'hero-title': 'Your Complete Gateway to the Crypto World',
                'hero-subtitle': 'Find the best way to buy, sell and use cryptocurrencies safely',
                'hero-cta': 'Get Started',
                'nav-featured': 'Most Accessed',
                'nav-cards': 'Cards',
                'nav-security': 'Security',
                'featured-title': 'Most Accessed',
                'featured-subtitle': 'Most popular platforms in our community',
                'p2p-subtitle': 'Direct buying and selling between people',
                'exchanges-subtitle': 'Trading and cryptocurrency conversion',
                'cards-title': 'Crypto Cards',
                'cards-subtitle': 'Spend crypto daily with cards',
                'security-title': 'Security',
                'security-subtitle': 'Protect your investments with maximum security',
                'visit-site': 'Visit Site',
                'back': 'Back',
                'footer-desc': 'Your complete gateway to the crypto world',
                'footer-services': 'Services',
                'footer-rights': 'All rights reserved.'
            }
        };

        // Platform data with affiliate links and descriptions
        this.platformData = {
            'mexc-featured': {
                name: 'MEXC',
                url: 'https://promote.mexc.com/a/Q26ooE1o',
                logo: 'https://logo.clearbit.com/mexc.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=mexc.com&sz=64',
                description: {
                    pt: 'Exchange global confiável com mais de 1500 criptomoedas. Trading avançado com taxas competitivas e alta liquidez.',
                    en: 'Trusted global exchange with over 1500 cryptocurrencies. Advanced trading with competitive fees and high liquidity.'
                }
            },
            'etherfi-featured': {
                name: 'Ether.fi',
                url: 'https://www.ether.fi/refer/6ad38ada',
                logo: 'https://logo.clearbit.com/ether.fi',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=ether.fi&sz=64',
                description: {
                    pt: 'Protocolo DeFi líder para staking líquido de Ethereum. Maximize seus rendimentos ETH com segurança e transparência.',
                    en: 'Leading DeFi protocol for Ethereum liquid staking. Maximize your ETH yields with security and transparency.'
                }
            },
            'comprecripto': {
                name: 'Compre Cripto',
                url: 'https://comprecripto.io/?ref=mqm',
                logo: 'https://logo.clearbit.com/comprecripto.io',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=comprecripto.io&sz=64',
                description: {
                    pt: 'Plataforma brasileira P2P para comprar Bitcoin e outras criptomoedas com PIX, TED e DOC de forma rápida e segura.',
                    en: 'Brazilian P2P platform to buy Bitcoin and other cryptocurrencies with PIX, TED and DOC quickly and safely.'
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
            'mexc': {
                name: 'MEXC',
                url: 'https://promote.mexc.com/a/Q26ooE1o',
                logo: 'https://logo.clearbit.com/mexc.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=mexc.com&sz=64',
                description: {
                    pt: 'Exchange global confiável com mais de 1500 criptomoedas. Trading avançado com taxas competitivas e alta liquidez.',
                    en: 'Trusted global exchange with over 1500 cryptocurrencies. Advanced trading with competitive fees and high liquidity.'
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
                logo: 'https://logo.clearbit.com/kastfinance.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=kastfinance.com&sz=64',
                description: {
                    pt: 'Cartão de débito cripto brasileiro. Gaste suas criptomoedas no dia a dia com conversão automática para reais.',
                    en: 'Brazilian crypto debit card. Spend your cryptocurrencies daily with automatic conversion to Brazilian reals.'
                }
            },
            'offramp': {
                name: 'Offramp',
                url: 'https://app.offramp.xyz/login?referralCode=iokost',
                logo: 'https://logo.clearbit.com/offramp.xyz',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=offramp.xyz&sz=64',
                description: {
                    pt: 'Solução completa para gastos cripto. Converta facilmente suas criptomoedas para moeda local e gaste mundialmente.',
                    en: 'Complete crypto spending solution. Easily convert your cryptocurrencies to local currency and spend worldwide.'
                }
            },
            'etherfi': {
                name: 'Ether.fi',
                url: 'https://www.ether.fi/refer/6ad38ada',
                logo: 'https://logo.clearbit.com/ether.fi',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=ether.fi&sz=64',
                description: {
                    pt: 'Protocolo DeFi líder para staking líquido de Ethereum. Maximize seus rendimentos ETH com segurança e transparência.',
                    en: 'Leading DeFi protocol for Ethereum liquid staking. Maximize your ETH yields with security and transparency.'
                }
            },
            'ledger': {
                name: 'Ledger',
                url: 'https://shop.ledger.com/?r=9414e4bea285&tracker=MY_TRACKER',
                logo: 'https://logo.clearbit.com/ledger.com',
                fallbackLogo: 'https://www.google.com/s2/favicons?domain=ledger.com&sz=64',
                description: {
                    pt: 'Hardware wallet líder mundial. Proteja suas criptomoedas com a mais alta segurança offline contra hackers.',
                    en: 'World-leading hardware wallet. Protect your cryptocurrencies with the highest offline security against hackers.'
                }
            }
        };

        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupModalSystem();
        this.setupHorizontalScrolling();
        this.setupPlatformCards();
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

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navigation = document.querySelector('.navigation');

        if (mobileMenuBtn && navigation) {
            mobileMenuBtn.addEventListener('click', () => {
                navigation.classList.toggle('mobile-open');
                mobileMenuBtn.classList.toggle('active');
            });

            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navigation.classList.remove('mobile-open');
                    mobileMenuBtn.classList.remove('active');
                });
            });
        }
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

    // Horizontal Scrolling
    setupHorizontalScrolling() {
        const scrollContainers = document.querySelectorAll('.horizontal-cards-grid');

        scrollContainers.forEach((container, containerIndex) => {
            const dots = container.parentElement.querySelectorAll('.scroll-dot');

            // Update active dot based on scroll position
            container.addEventListener('scroll', this.debounce(() => {
                const scrollLeft = container.scrollLeft;
                const cardWidth = container.querySelector('.platform-card')?.offsetWidth || 280;
                const gap = 32; // 2rem in pixels
                const activeIndex = Math.round(scrollLeft / (cardWidth + gap));

                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === activeIndex);
                });
            }, 100));

            // Dot click navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    const cardWidth = container.querySelector('.platform-card')?.offsetWidth || 280;
                    const gap = 32;
                    const targetScroll = index * (cardWidth + gap);

                    container.scrollTo({
                        left: targetScroll,
                        behavior: 'smooth'
                    });
                });
            });

            // Touch swipe for mobile
            let startX = 0;
            let startY = 0;
            let isScrolling = false;

            container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isScrolling = false;
            }, { passive: true });

            container.addEventListener('touchmove', (e) => {
                if (isScrolling) return;

                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                const diffX = Math.abs(currentX - startX);
                const diffY = Math.abs(currentY - startY);

                if (diffX > diffY) {
                    isScrolling = true;
                    e.preventDefault();
                }
            }, { passive: false });
        });
    }

    // Animations and Interactions
    setupAnimations() {
        // Intersection Observer for card animations
        const cards = document.querySelectorAll('.platform-card');

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });

        // Header scroll effect
        this.setupHeaderEffect();

        // Add loading animation
        this.addLoadingAnimation();
    }

    setupHeaderEffect() {
        let lastScrollY = window.scrollY;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
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
        });
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