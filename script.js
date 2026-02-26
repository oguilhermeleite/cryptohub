
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