
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