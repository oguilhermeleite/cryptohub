// CryptoHub - Professional Cryptocurrency Aggregator JavaScript

class CryptoHub {
    constructor() {
        this.currentLang = this.getStoredLanguage() || 'pt';
        this.translations = {
            pt: {
                'hero-title': 'Sua Porta de Entrada Completa para o Mundo Cripto',
                'hero-subtitle': 'Encontre a melhor forma de comprar, vender e usar criptomoedas com segurança',
                'hero-cta': 'Começar Agora',
                'nav-cards': 'Cartões',
                'nav-security': 'Segurança',
                'p2p-desc': 'Compra e venda direto entre pessoas',
                'exchanges-desc': 'Trading e conversão de criptomoedas',
                'cards-title': 'Cartões Cripto',
                'cards-desc': 'Gaste cripto no dia a dia com cartões',
                'security-title': 'Segurança',
                'security-desc': 'Proteja seus investimentos com segurança máxima',
                'view-options': 'Ver Opções',
                'access': 'Acessar',
                'view-cards': 'Ver Cartões',
                'buy': 'Comprar',
                'footer-desc': 'Sua porta de entrada completa para o mundo cripto',
                'footer-services': 'Serviços',
                'footer-rights': 'Todos os direitos reservados.'
            },
            en: {
                'hero-title': 'Your Complete Gateway to the Crypto World',
                'hero-subtitle': 'Find the best way to buy, sell and use cryptocurrencies safely',
                'hero-cta': 'Get Started',
                'nav-cards': 'Cards',
                'nav-security': 'Security',
                'p2p-desc': 'Direct buying and selling between people',
                'exchanges-desc': 'Trading and cryptocurrency conversion',
                'cards-title': 'Crypto Cards',
                'cards-desc': 'Spend crypto daily with cards',
                'security-title': 'Security',
                'security-desc': 'Protect your investments with maximum security',
                'view-options': 'View Options',
                'access': 'Access',
                'view-cards': 'View Cards',
                'buy': 'Buy',
                'footer-desc': 'Your complete gateway to the crypto world',
                'footer-services': 'Services',
                'footer-rights': 'All rights reserved.'
            }
        };

        this.init();
    }

    init() {
        this.setupLanguageToggle();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupAnimations();
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

        // Update button states
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
            document.title = 'CryptoHub - Your Complete Gateway to the Crypto World';
            document.querySelector('meta[name="description"]').content = 'Find the best way to buy, sell and use cryptocurrencies safely. P2P, Exchanges, Crypto Cards and Security.';
        } else {
            document.title = 'CryptoHub - Sua Porta de Entrada Completa para o Mundo Cripto';
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
        return localStorage.getItem('cryptohub_language');
    }

    storeLanguage(lang) {
        localStorage.setItem('cryptohub_language', lang);
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

            // Close menu when clicking nav links
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

    // Animations and Interactions
    setupAnimations() {
        // Intersection Observer for card animations
        const cards = document.querySelectorAll('.section-card');

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
        // Remove loading class after page load
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

    trackAffiliateClick(platform, url) {
        console.log('Affiliate click tracked:', {
            platform: platform,
            url: url,
            language: this.currentLang,
            timestamp: new Date().toISOString()
        });

        // Store click data locally for analytics
        const clickData = {
            platform,
            url,
            language: this.currentLang,
            timestamp: new Date().toISOString()
        };

        this.storeClickData(clickData);
    }

    storeClickData(data) {
        const existingData = JSON.parse(localStorage.getItem('cryptohub_clicks') || '[]');
        existingData.push(data);

        // Keep only last 100 clicks to avoid storage issues
        if (existingData.length > 100) {
            existingData.slice(-100);
        }

        localStorage.setItem('cryptohub_clicks', JSON.stringify(existingData));
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
        console.error(`CryptoHub Error in ${context}:`, error);

        // Store error for debugging
        const errorData = {
            error: error.message,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        const existingErrors = JSON.parse(localStorage.getItem('cryptohub_errors') || '[]');
        existingErrors.push(errorData);

        if (existingErrors.length > 50) {
            existingErrors.slice(-50);
        }

        localStorage.setItem('cryptohub_errors', JSON.stringify(existingErrors));
    }
}

// Enhanced Affiliate Link Tracking
function setupAffiliateTracking() {
    const affiliateLinks = {
        'comprecripto.io': 'Compre Cripto',
        'br.p2p.me': 'P2P.me',
        'promote.mexc.com': 'MEXC',
        'kastfinance.app.link': 'Kast Finance',
        'app.offramp.xyz': 'Offramp',
        'ether.fi': 'Ether.fi',
        'shop.ledger.com': 'Ledger'
    };

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="http"]');
        if (link) {
            const url = link.href;
            const platform = Object.keys(affiliateLinks).find(domain => url.includes(domain));

            if (platform && window.cryptoHub) {
                window.cryptoHub.trackAffiliateClick(affiliateLinks[platform], url);
            }
        }
    });
}

// Performance Monitoring
function setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];

        console.log('Performance metrics:', {
            loadTime: perfData.loadEventEnd - perfData.loadEventStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            timestamp: new Date().toISOString()
        });
    });

    // Monitor long tasks
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

// Theme Management (for future dark/light mode)
function setupThemeManagement() {
    // Respect user's system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    prefersDarkScheme.addEventListener('change', (e) => {
        console.log('System theme changed to:', e.matches ? 'dark' : 'light');
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.cryptoHub = new CryptoHub();
        setupAffiliateTracking();
        setupPerformanceMonitoring();
        setupThemeManagement();

        console.log('CryptoHub initialized successfully');
    } catch (error) {
        console.error('Failed to initialize CryptoHub:', error);
    }
});

// Service Worker Registration (for future PWA features)
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
    module.exports = { CryptoHub };
}