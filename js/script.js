
/* ========================================= */
/* BULLETPROOF NEWSLETTER FORM (IFRAME)      */
/* ========================================= */
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');
window.submitted = false; // Global flag for iframe tracking

// This function is called by the iframe's onload event in the HTML
window.handleFormSuccess = function() {
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    
    // Success feedback
    formMessage.style.color = '#00ffa3'; // Neon Green
    formMessage.innerHTML = 'Inscrito com sucesso! 🚀';
    
    // Reset form and button
    newsletterForm.reset();
    submitBtn.innerText = 'Inscrever-se';
    submitBtn.disabled = false;
    window.submitted = false; // reset flag

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.innerHTML = '';
    }, 5000);
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function() {
        window.submitted = true; // Set flag so iframe onload triggers success
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Visual feedback immediately upon click
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;
        formMessage.innerHTML = ''; // clear previous messages
    });
}

/* Language Dropdown Toggle */
const langBtn = document.getElementById('lang-globe-btn');
const langDropdown = document.getElementById('lang-dropdown');

if (langBtn && langDropdown) {
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langDropdown.classList.contains('hidden') && !e.target.closest('.lang-container')) {
            langDropdown.classList.add('hidden');
        }
    });
}

/* ========================================= */
/* COPY COUPON LOGIC & TOAST NOTIFICATION    */
/* ========================================= */
const coupons = document.querySelectorAll('.clickable-coupon');
const toast = document.getElementById('toast-notification');
let toastTimeout;

if (coupons.length > 0 && toast) {
    coupons.forEach(coupon => {
        coupon.addEventListener('click', function(e) {
            e.preventDefault();
            const codeToCopy = this.getAttribute('data-code');

            // Copy to clipboard
            navigator.clipboard.writeText(codeToCopy).then(() => {
                // Show toast
                showToast(`Cupom "${codeToCopy}" copiado! 🚀`);
            }).catch(err => {
                console.error('Falha ao copiar:', err);
            });
        });
    });
}

function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    if (toastMessage) {
        toastMessage.textContent = message;

        // Clear existing timeout if user clicks multiple times
        if (toastTimeout) clearTimeout(toastTimeout);

        // Show toast
        toast.classList.remove('hidden');
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
                heroBadge: "✨ O maior hub cripto do Brasil",
                heroTitle: "Sua porta de entrada e saída para o mundo cripto",
                heroSubtitle: "O Primeiro Agregador On-Ramp e Off-Ramp do Mercado",
                heroDesc: "Encontre a melhor forma de comprar, vender e usar criptomoedas com segurança.",
                featuredTitle: "Destaque",
                featuredSubtitle: "Plataforma em destaque da nossa comunidade",
                        partnerBadge: "PARCEIRO OFICIAL",
                        descCompreCriptoFeatured: "Facilita a compra de criptomoedas de forma simples e segura",
                        descCompreCriptoShort: "Compre Cripto facilita a compra de criptomoedas de forma simples e segura.",
                        descCompreCripto: "Compre Cripto facilita a compra de criptomoedas de forma simples e segura.",
                        descPagCrypto: "Pag Finance oferece soluções completas para pagamentos com criptomoedas no Brasil.",
                        descKryptera: "Negociação P2P de criptomoedas com segurança e praticidade. <br> <strong>Cupom <span class=\"clickable-coupon\" data-code=\"MQM\">MQM <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> para 10% de desconto.</strong>",
                        descCamilaP2P: "Especialista brasileira em P2P. Com taxas baixas e suporte para +1.000 Criptomoedas. <br> <strong>Cupom <span class=\"clickable-coupon\" data-code=\"MQM\">MQM <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> para desconto.</strong>",
                        descP2Pme: "P2P.me é uma plataforma P2P confiável para compra e venda de criptomoedas com segurança e rapidez.",
                        desc4PFinance: "P2P on-chain e pagamento de boletos. <br> <strong>Cupom <span class=\"clickable-coupon\" data-code=\"DOGDAMASSA\">DOGDAMASSA <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> para desconto.</strong>",

                        btnAccessNow: "ACESSAR AGORA →",                btnVisit: "Visitar Site",
                btnFollowX: "Seguir no X",
                p2pTitle: "P2P",
                p2pSubtitle: "Compra e venda direto entre pessoas",
                exchangesTitle: "Exchanges",
                exchangesSubtitle: "Trading e conversão de criptomoedas",
                hotWalletsTitle: "Hot Wallets",
                hotWalletsSubtitle: "Carteiras online conectadas à internet para uso diário",
                cardsTitle: "Cartões Cripto",
                cardsSubtitle: "Use cripto no dia a dia com cartões",
                banksTitle: "Bancos Digitais",
                banksSubtitle: "Bancos digitais com recursos crypto integrados",
                trackersTitle: "Trackers",
                trackersSubtitle: "Acompanhamento de mercado e dados em tempo real",
                coldWalletsTitle: "Cold Wallets",
                coldWalletsSubtitle: "Carteiras físicas offline para máxima segurança",
                dexsTitle: "DEXs",
                dexsSubtitle: "Exchanges descentralizadas para trading sem intermediários",
                bridgesTitle: "Bridges",
                bridgesSubtitle: "Transfira ativos entre diferentes blockchains",
                securityTitle: "Protegendo você dos erros mais comuns em cripto",
                securityDesc: "Crypto Aggregator funciona como um filtro de acesso ao ecossistema cripto, validando fontes, links oficiais e informações antes de direcionar o usuário.",
                securityExtremaTitle: "Segurança Extrema",
                securityExtremaDesc: "Verificação rigorosa de todos os parceiros listados.",
                securityTransTitle: "Transparência",
                securityTransDesc: "Simples de entender, fácil de confiar.",
                securityCuradoriaTitle: "Curadoria Inteligente",
                securityCuradoriaDesc: "Selecionamos apenas o que realmente faz sentido, evitando ruído, promessas vazias e projetos desnecessários.",
                securityNavegacaoTitle: "Navegação Guiada",
                securityNavegacaoDesc: "Ajudamos você a entender antes de usar. Informação vem antes da ação.",
                eduTitle: "EDUCAÇÃO PRIMEIRO",
                eduDesc: "Pensado para iniciantes e avançados. Nossa missão é garantir que você tenha clareza e segurança em cada clique.",
                catTitle: "Cripto sem complicação, ",
                catTitleSpan: "tudo em um só lugar",
                catSubtitle: "Todos os links são verificados e confiáveis.",
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
                heroBadge: "✨ The largest crypto hub in Brazil",
                heroTitle: "Your entry and exit gate to the crypto world",
                heroSubtitle: "The First On-Ramp and Off-Ramp Aggregator in the Market",
                heroDesc: "Find the best way to buy, sell and use cryptocurrencies safely.",
                featuredTitle: "Featured",
                featuredSubtitle: "Featured platform from our community",
                        partnerBadge: "OFFICIAL PARTNER",
                        descCompreCriptoFeatured: "Facilitates the purchase of cryptocurrencies in a simple and secure way",
                        descCompreCriptoShort: "Compre Cripto facilitates the purchase of cryptocurrencies in a simple and secure way.",
                        descCompreCripto: "Compre Cripto facilitates the purchase of cryptocurrencies in a simple and secure way.",
                        descPagCrypto: "Pag Finance offers complete solutions for crypto payments in Brazil.",
                        descKryptera: "P2P trading of cryptocurrencies with security and practicality. <br> <strong>Coupon <span class=\"clickable-coupon\" data-code=\"MQM\">MQM <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> for 10% discount.</strong>",
                        descCamilaP2P: "Brazilian P2P specialist. With low fees and support for +1,000 Cryptocurrencies. <br> <strong>Coupon <span class=\"clickable-coupon\" data-code=\"MQM\">MQM <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> for discount.</strong>",
                        descP2Pme: "P2P.me is a reliable P2P platform for buying and selling cryptocurrencies safely and quickly.",
                        desc4PFinance: "P2P on-chain and bill payments. <br> <strong>Coupon <span class=\"clickable-coupon\" data-code=\"DOGDAMASSA\">DOGDAMASSA <svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path></svg></span> for discount.</strong>",

                        btnAccessNow: "ACCESS NOW →",                btnVisit: "Visit Site",
                btnFollowX: "Follow on X",
                p2pTitle: "P2P",
                p2pSubtitle: "Buy and sell directly between people",
                exchangesTitle: "Exchanges",
                exchangesSubtitle: "Trading and conversion of cryptocurrencies",
                hotWalletsTitle: "Hot Wallets",
                hotWalletsSubtitle: "Online wallets connected to the internet for daily use",
                cardsTitle: "Crypto Cards",
                cardsSubtitle: "Use crypto in daily life with cards",
                banksTitle: "Digital Banks",
                banksSubtitle: "Digital banks with integrated crypto features",
                trackersTitle: "Trackers",
                trackersSubtitle: "Market monitoring and real-time data",
                coldWalletsTitle: "Cold Wallets",
                coldWalletsSubtitle: "Offline physical wallets for maximum security",
                dexsTitle: "DEXs",
                dexsSubtitle: "Decentralized exchanges for trading without intermediaries",
                bridgesTitle: "Bridges",
                bridgesSubtitle: "Transfer assets between different blockchains",
                securityTitle: "Protecting you from the most common mistakes in crypto",
                securityDesc: "Crypto Aggregator works as an access filter to the crypto ecosystem, validating sources, official links and information before directing the user.",
                securityExtremaTitle: "Extreme Security",
                securityExtremaDesc: "Rigorous verification of all listed partners.",
                securityTransTitle: "Transparency",
                securityTransDesc: "Simple to understand, easy to trust.",
                securityCuradoriaTitle: "Intelligent Curation",
                securityCuradoriaDesc: "We select only what really makes sense, avoiding noise, empty promises and unnecessary projects.",
                securityNavegacaoTitle: "Guided Navigation",
                securityNavegacaoDesc: "We help you understand before you use. Information comes before action.",
                eduTitle: "EDUCATION FIRST",
                eduDesc: "Designed for beginners and advanced users. Our mission is to ensure you have clarity and security in every click.",
                catTitle: "Crypto without complication, ",
                catTitleSpan: "all in one place",
                catSubtitle: "All links are verified and trustworthy.",
                catP2PTitle: "P2P (Peer-to-Peer)",
                catP2PDesc: "Platforms where people trade crypto directly with each other, without intermediaries.",
                catExTitle: "Exchanges (Brokers)",
                catExDesc: "Centralized platforms that allow you to buy, sell and trade crypto with ease.",
                catDexTitle: "DEXs (Decentralized Exchanges)",
                catDexDesc: "Decentralized platforms where you swap crypto directly from your wallet, without custody.",
                catBanksTitle: "Digital Banks (Banks)",
                catBanksDesc: "Digital banks and financial services that integrate crypto into the traditional system.",
                catCardsTitle: "Crypto Cards",
                catCardsDesc: "Cards that allow you to spend cryptocurrencies in the real world.",
                catBridgesTitle: "Bridges",
                catBridgesDesc: "Tools that allow you to move assets between different blockchains.",
                catWalletsTitle: "Wallets",
                catWalletsDesc: "Apps where you store, send and receive cryptocurrencies with full control.",
                footerDesc: "Your entry and exit gate to the crypto world",
                footerServices: "Services",
                footerNewsletterTitle: "Stay Updated",
                footerNewsletterDesc: "Receive the best opportunities and news from the crypto world.",
                newsletterPlaceholder: "Your best e-mail",
                newsletterBtn: "Subscribe",
                newsletterSuccess: "✓ Thank you for subscribing!",
                footerRights: "All rights reserved.",
                toastCopied: "Coupon copied successfully!"
            }
        };
        
        let currentLang = localStorage.getItem('siteLang') || 'pt';
        
        function setLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('siteLang', lang);
        
            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    // Keep icons/structure if it's a complex button or has nested HTML
                    // but the instructions said to assume pure text or simple replacements
                    // We'll use innerHTML to allow icons in things like buttons
                    el.innerHTML = translations[lang][key];
                }
            });
        
            // Update placeholders
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (translations[lang] && translations[lang][key]) {
                    el.placeholder = translations[lang][key];
                }
            });
        
            // Update active state in dropdown
            document.querySelectorAll('.lang-option').forEach(opt => {
                opt.classList.remove('active');
                if (opt.getAttribute('data-lang') === lang) {
                    opt.classList.add('active');
                }
            });
            
            // Update HTML lang attribute
            document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
        }
        
        // Initialize Language on Load
        document.addEventListener('DOMContentLoaded', () => {
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
        });
        
/* ========================================= */
/* FOOTER PADDING FIX                        */
/* ========================================= */
window.addEventListener('load', function() {
    // Add padding to the body so the footer doesn't cover site content
    document.body.style.paddingBottom = '45px';
});