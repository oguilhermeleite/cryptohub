
/* ========================================= */
/* NEWSLETTER FORM HANDLING (AJAX)           */
/* ========================================= */
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

if (newsletterForm) {
    // Remove the old event listener by replacing the logic, or update the existing one:
    newsletterForm.onsubmit = function(e) {
        e.preventDefault(); // STOP page reload

        const emailInput = this.querySelector('input[name="email"]').value;
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;

        // Visual feedback
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        // USE THE SPECIFIC /ajax/ ENDPOINT
        fetch('https://formsubmit.co/ajax/thecryptoaggregator@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput,
                _subject: "Novo Lead Capturado!",
                _captcha: "false"
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // SUCCESS
                formMessage.style.color = '#00ffa3'; // Neon Green
                formMessage.innerHTML = 'Inscrito com sucesso! 🚀';
                newsletterForm.reset(); // Clear input
            } else {
                throw new Error('Erro no servidor');
            }
        })
        .catch(error => {
            // ERROR
            formMessage.style.color = '#ff4d4d'; // Red
            formMessage.innerHTML = 'Erro de comunicação. Tente novamente.';
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
    };
}