// ============================================
// CARD + MODAL SYSTEM
// Click card → Open modal → Buttons work 100%
// ============================================

console.log('🎴 Card Modal System Loading...');

(function() {
    'use strict';

    let currentModal = null;

    function createModal(platformData) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Fechar">×</button>

                <div class="modal-header">
                    <div class="modal-logo">
                        <img src="${platformData.logo}" alt="${platformData.name}" onerror="this.src='https://www.google.com/s2/favicons?domain=${platformData.domain}&sz=128'">
                    </div>
                    <h2 class="modal-title">${platformData.name}</h2>
                    <div class="modal-badges">
                        ${platformData.rating ? `<span class="card-badge card-badge-rating">${platformData.rating}</span>` : ''}
                        ${platformData.kyc ? `<span class="card-badge card-badge-kyc">${platformData.kyc}</span>` : ''}
                    </div>
                </div>

                <p class="modal-description">${platformData.description}</p>

                <div class="modal-buttons">
                    <a href="${platformData.siteUrl}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="modal-btn modal-btn-primary">
                        🌐 Visitar Site Oficial
                    </a>
                    ${platformData.twitterUrl ? `
                        <a href="${platformData.twitterUrl}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="modal-btn modal-btn-secondary">
                            🐦 Seguir no X / Twitter
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        // Add to body
        document.body.appendChild(modal);
        currentModal = modal;

        // Add body class to prevent scrolling
        document.body.classList.add('modal-open');

        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);

        // Click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', handleEscKey);

        console.log('✅ Modal opened for:', platformData.name);
    }

    function closeModal() {
        if (!currentModal) return;

        currentModal.classList.remove('active');
        document.body.classList.remove('modal-open');

        setTimeout(() => {
            if (currentModal) {
                currentModal.remove();
                currentModal = null;
            }
        }, 300);

        document.removeEventListener('keydown', handleEscKey);

        console.log('✅ Modal closed');
    }

    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    function initCardModals() {
        console.log('🎴 Initializing card modal system...');

        const cards = document.querySelectorAll('.platform-card-modal');
        console.log('📦 Found', cards.length, 'cards');

        cards.forEach((card, index) => {
            // Get data from card attributes
            const platformData = {
                name: card.getAttribute('data-name') || 'Platform',
                description: card.getAttribute('data-description') || 'No description available.',
                logo: card.getAttribute('data-logo') || '',
                domain: card.getAttribute('data-domain') || '',
                siteUrl: card.getAttribute('data-site-url') || '#',
                twitterUrl: card.getAttribute('data-twitter-url') || '',
                rating: card.getAttribute('data-rating') || '',
                kyc: card.getAttribute('data-kyc') || ''
            };

            // Click card to open modal
            card.addEventListener('click', function(e) {
                // Don't open if clicking a link inside the card
                if (e.target.tagName === 'A') {
                    return;
                }

                console.log('👆 Card clicked:', platformData.name);
                createModal(platformData);
            });

            console.log(`✅ Card ${index + 1} initialized:`, platformData.name);
        });

        console.log('✅ Card modal system ready');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardModals);
    } else {
        initCardModals();
    }

    // Expose closeModal globally for debugging
    window.closeModal = closeModal;

})();

console.log('✅ Card Modal System Loaded');
