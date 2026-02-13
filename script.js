
/* ========================================= */
/* NEWSLETTER FORM HANDLING (AJAX)           */
/* ========================================= */
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault(); // STOP page reload

        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Visual feedback
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // SUCCESS
                formMessage.style.color = '#00ffa3'; // Neon Green
                formMessage.innerHTML = 'Inscrito com sucesso! 🚀';
                newsletterForm.reset(); // Clear input
            } else {
                // ERROR
                formMessage.style.color = '#ff4d4d'; // Red
                formMessage.innerHTML = 'Erro ao inscrever. Tente novamente.';
            }
        })
        .catch(error => {
            formMessage.style.color = '#ff4d4d';
            formMessage.innerHTML = 'Erro de conexão.';
        })
        .finally(() => {
            // Restore button
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        });
    });
}