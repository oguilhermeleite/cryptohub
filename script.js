
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
/* BULLETPROOF TRADINGVIEW TICKER (BOTTOM)   */
/* ========================================= */
window.addEventListener('load', function() {
    // 1. Create the main container
    const tvContainer = document.createElement('div');
    tvContainer.className = 'tradingview-widget-container';
    
    // Force it to be fixed at the bottom, above everything else
    tvContainer.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; z-index: 999999; background: #1a1a1a; border-top: 1px solid rgba(0, 255, 163, 0.2);';

    // 2. Create the inner widget div
    const tvWidget = document.createElement('div');
    tvWidget.className = 'tradingview-widget-container__widget';
    tvContainer.appendChild(tvWidget);

    // 3. Create the script tag
    const tvScript = document.createElement('script');
    tvScript.type = 'text/javascript';
    tvScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    tvScript.async = true;

    // 4. Configuration JSON
    const tvConfig = {
        "symbols": [
            { "proName": "CRYPTO:BTCUSD", "title": "Bitcoin" },
            { "proName": "CRYPTO:ETHUSD", "title": "Ethereum" },
            { "proName": "CRYPTO:USDTUSD", "title": "Tether" },
            { "proName": "CRYPTO:BNBUSD", "title": "BNB" },
            { "proName": "CRYPTO:SOLUSD", "title": "Solana" },
            { "proName": "CRYPTO:USDCUSD", "title": "USDC" },
            { "proName": "CRYPTO:XRPUSD", "title": "XRP" },
            { "proName": "CRYPTO:DOGEUSD", "title": "Dogecoin" },
            { "proName": "CRYPTO:ADAUSD", "title": "Cardano" },
            { "proName": "CRYPTO:AVAXUSD", "title": "Avalanche" }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        // Detect mobile screen: use 'regular' (thin 1-line) for mobile, 'adaptive' for desktop
        "displayMode": window.innerWidth <= 768 ? "regular" : "adaptive",
        "colorTheme": "dark",
        "locale": "br"
    };

    tvScript.innerHTML = JSON.stringify(tvConfig);
    tvContainer.appendChild(tvScript);

    // 5. Append to body
    document.body.appendChild(tvContainer);
    
    // 6. Add padding to the body so the footer doesn't cover site content
    document.body.style.paddingBottom = '45px';
});