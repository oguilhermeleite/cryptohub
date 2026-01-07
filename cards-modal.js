// ============================================
// CARD + MODAL SYSTEM - RADICAL FIX
// Forces modal to be ALWAYS centered on viewport
// ============================================

console.log('🎴 Card Modal System Loading...');

(function() {
    'use strict';

    let currentModal = null;

    function createModal(platformData) {
        console.log('🔥 Creating modal for:', platformData.name);

        // Remove existing modal if any
        const existingModal = document.querySelector('.modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        // CRITICAL: Save scroll position BEFORE anything
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        console.log('📍 Current scroll position:', scrollY);

        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';

        // CRITICAL: Force inline styles to override EVERYTHING
        modal.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 999999 !important;
            margin: 0 !important;
            padding: 20px !important;
            background: rgba(0, 0, 0, 0.85) !important;
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
            opacity: 0 !important;
            transition: opacity 0.3s ease !important;
        `;

        modal.innerHTML = `
            <div class="modal-content" style="
                position: relative !important;
                max-width: 560px !important;
                width: 100% !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
                margin: auto !important;
                background: linear-gradient(135deg, rgba(15, 20, 30, 0.98) 0%, rgba(20, 25, 35, 0.98) 100%) !important;
                border: 2px solid rgba(0, 245, 160, 0.3) !important;
                border-radius: 24px !important;
                padding: 40px !important;
                box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5) !important;
                transform: scale(0.9) translateY(20px) !important;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            ">
                <button class="modal-close" aria-label="Fechar" style="
                    position: absolute !important;
                    top: 20px !important;
                    right: 20px !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    border-radius: 50% !important;
                    width: 40px !important;
                    height: 40px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    font-size: 24px !important;
                    color: rgba(255, 255, 255, 0.6) !important;
                    z-index: 10 !important;
                    transition: all 0.3s ease !important;
                ">×</button>

                <div class="modal-header" style="text-align: center; margin-bottom: 32px;">
                    <div class="modal-logo" style="
                        width: 100px;
                        height: 100px;
                        margin: 0 auto 20px;
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 20px;
                        padding: 16px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 1px solid rgba(0, 245, 160, 0.2);
                    ">
                        <img src="${platformData.logo}" alt="${platformData.name}"
                             onerror="this.src='https://www.google.com/s2/favicons?domain=${platformData.domain}&sz=128'"
                             style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <h2 class="modal-title" style="
                        font-size: 32px;
                        font-weight: 700;
                        color: #ffffff;
                        margin: 0;
                    ">${platformData.name}</h2>
                </div>

                <p class="modal-description" style="
                    font-size: 16px;
                    line-height: 1.7;
                    color: rgba(255, 255, 255, 0.8);
                    text-align: center;
                    margin-bottom: 32px;
                ">${platformData.description}</p>

                <div class="modal-buttons" style="display: flex; flex-direction: column; gap: 12px;">
                    <a href="${platformData.siteUrl}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="modal-btn modal-btn-primary"
                       style="
                           padding: 18px 28px;
                           border-radius: 14px;
                           font-size: 17px;
                           font-weight: 700;
                           text-decoration: none;
                           text-align: center;
                           background: linear-gradient(135deg, #00f5a0 0%, #00d9ff 100%);
                           color: #0a0a0f;
                           box-shadow: 0 8px 24px rgba(0, 245, 160, 0.4);
                           display: flex;
                           align-items: center;
                           justify-content: center;
                           gap: 10px;
                           cursor: pointer;
                           border: none;
                           transition: all 0.3s ease;
                       ">
                        🌐 Visitar Site Oficial
                    </a>
                    ${platformData.twitterUrl ? `
                        <a href="${platformData.twitterUrl}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="modal-btn modal-btn-secondary"
                           style="
                               padding: 18px 28px;
                               border-radius: 14px;
                               font-size: 17px;
                               font-weight: 700;
                               text-decoration: none;
                               text-align: center;
                               background: rgba(0, 245, 160, 0.1);
                               border: 2px solid rgba(0, 245, 160, 0.4);
                               color: #00f5a0;
                               display: flex;
                               align-items: center;
                               justify-content: center;
                               gap: 10px;
                               cursor: pointer;
                               transition: all 0.3s ease;
                           ">
                            🐦 Seguir no X / Twitter
                        </a>
                    ` : ''}
                </div>
            </div>
        `;

        // CRITICAL: Add to body LAST (after all content)
        document.body.appendChild(modal);
        currentModal = modal;

        // CRITICAL: Lock body scroll IMMEDIATELY
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';

        console.log('🔒 Body locked at scroll position:', scrollY);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modal.style.opacity = '1';
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.style.transform = 'scale(1) translateY(0)';
                }
                console.log('✅ Modal animated in and visible');
            });
        });

        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

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

        console.log('🔄 Closing modal...');

        // Get saved scroll position
        const scrollY = document.body.style.top;
        const scrollPosition = parseInt(scrollY || '0') * -1;

        // Fade out
        currentModal.style.opacity = '0';
        const content = currentModal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'scale(0.9) translateY(20px)';
        }

        // Remove after animation
        setTimeout(() => {
            if (currentModal) {
                currentModal.remove();
                currentModal = null;
            }

            // CRITICAL: Restore body scroll
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.width = '';

            // Restore scroll position
            window.scrollTo(0, scrollPosition);

            console.log('✅ Modal closed, scroll restored to:', scrollPosition);
        }, 300);

        document.removeEventListener('keydown', handleEscKey);
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
                twitterUrl: card.getAttribute('data-twitter-url') || ''
            };

            // Click card to open modal
            card.addEventListener('click', function(e) {
                // Don't open if clicking a link inside the card
                if (e.target.tagName === 'A') {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                console.log('👆 Card clicked:', platformData.name);
                console.log('📍 Click position - X:', e.clientX, 'Y:', e.clientY);
                console.log('📜 Page scroll before modal:', window.pageYOffset);

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
    window.debugModal = function() {
        console.log('Current modal:', currentModal);
        console.log('Body overflow:', document.body.style.overflow);
        console.log('Body position:', document.body.style.position);
        console.log('Current scroll:', window.pageYOffset);
    };

})();

console.log('✅ Card Modal System Loaded');
