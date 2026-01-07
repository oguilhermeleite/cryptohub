// ============================================
// CARD BACK FUNCTIONALITY - Ensure All Buttons Work
// ============================================

console.log('🎴 Card Back Functional JS Loading...');

(function() {
    'use strict';

    // Function to add logos to card backs
    function addLogosToCardBacks() {
        console.log('🎨 Adding logos to card backs...');

        const cards = document.querySelectorAll('.platform-card, .featured-card');

        cards.forEach((card, index) => {
            const cardBack = card.querySelector('.card-back');
            const cardBackHeader = card.querySelector('.card-back-header');

            // Skip if logo already exists
            if (cardBack && cardBack.querySelector('.card-back-logo')) {
                return;
            }

            // Get logo from card-front
            const frontLogo = card.querySelector('.card-front .platform-logo img');

            if (frontLogo && cardBack && cardBackHeader) {
                // Clone the logo
                const logoClone = frontLogo.cloneNode(true);
                logoClone.classList.add('card-back-logo');
                logoClone.classList.remove('platform-logo');

                // Remove any inline styles that might interfere
                logoClone.removeAttribute('style');

                // Insert before the header
                cardBack.insertBefore(logoClone, cardBackHeader);

                console.log(`✅ Logo added to card ${index + 1}:`, frontLogo.alt);
            }
        });
    }

    // Initialize when DOM is ready
    function initCardBackButtons() {
        console.log('🎴 Initializing card back buttons...');

        // STEP 0: Add logos to card-back if not present
        addLogosToCardBacks();

        // STEP 1: Make all links functional
        const allLinks = document.querySelectorAll('.card-back a, .card-back .card-btn-primary, .card-back .btn-visit, .card-back .btn-social');

        allLinks.forEach((link, index) => {
            // Force styles for maximum clickability
            link.style.pointerEvents = 'auto';
            link.style.cursor = 'pointer';
            link.style.position = 'relative';
            link.style.zIndex = '9999';

            // Add click handler
            link.addEventListener('click', function(e) {
                // Stop event from bubbling to card
                e.stopPropagation();
                e.stopImmediatePropagation();

                console.log('🔗 Link clicked:', this.href || this.textContent.trim());

                // Let default link behavior work
                // (opens in new tab due to target="_blank")
            }, true); // Capture phase

            console.log(`✅ Link ${index + 1} initialized:`, link.textContent.trim());
        });

        // STEP 2: Make back buttons functional
        const backButtons = document.querySelectorAll('.card-back .card-btn-back, .card-back .btn-back');

        backButtons.forEach((button, index) => {
            // Force styles
            button.style.pointerEvents = 'auto';
            button.style.cursor = 'pointer';
            button.style.position = 'relative';
            button.style.zIndex = '9999';

            // Add click handler
            button.addEventListener('click', function(e) {
                // Stop event from bubbling
                e.stopPropagation();
                e.stopImmediatePropagation();

                console.log('⬅️ Back button clicked');

                // Find parent card and flip it back
                const card = this.closest('.platform-card') || this.closest('.featured-card');

                if (card) {
                    card.classList.remove('flipped');
                    console.log('✅ Card flipped back to front');
                } else {
                    console.warn('⚠️ Could not find parent card');
                }
            }, true); // Capture phase

            console.log(`✅ Back button ${index + 1} initialized`);
        });

        // STEP 3: Ensure card-back itself doesn't interfere
        const cardBacks = document.querySelectorAll('.card-back');

        cardBacks.forEach(cardBack => {
            cardBack.style.pointerEvents = 'auto';
            cardBack.style.zIndex = '10';

            // Add click handler to card-back background
            cardBack.addEventListener('click', function(e) {
                // Only flip if clicking the background itself, not a button/link
                if (e.target === this ||
                    e.target.classList.contains('card-back-header') ||
                    e.target.classList.contains('card-back-description') ||
                    e.target.classList.contains('card-back-title')) {

                    console.log('🎴 Card back background clicked - flipping to front');

                    const card = this.closest('.platform-card') || this.closest('.featured-card');
                    if (card) {
                        card.classList.remove('flipped');
                    }
                }
            });
        });

        // STEP 4: Force card-front to hide when flipped
        const flippedCards = document.querySelectorAll('.platform-card.flipped, .featured-card.flipped');

        flippedCards.forEach(card => {
            const cardFront = card.querySelector('.card-front');
            if (cardFront) {
                cardFront.style.pointerEvents = 'none';
                cardFront.style.zIndex = '-1';
                cardFront.style.opacity = '0';
            }
        });

        console.log('✅ Card back buttons initialized:', {
            links: allLinks.length,
            backButtons: backButtons.length,
            cardBacks: cardBacks.length
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardBackButtons);
    } else {
        initCardBackButtons();
    }

    // Re-run when a card is flipped
    document.addEventListener('click', function(e) {
        // Check if a card was clicked
        if (e.target.closest('.card-front') || e.target.closest('.platform-card')) {
            // Wait for flip animation
            setTimeout(initCardBackButtons, 150);
        }
    });

    // Observer to catch any dynamically added cards
    const observer = new MutationObserver(function(mutations) {
        let needsReinit = false;

        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && // Element node
                        (node.classList?.contains('platform-card') ||
                         node.classList?.contains('featured-card') ||
                         node.querySelector?.('.card-back'))) {
                        needsReinit = true;
                    }
                });
            }

            // Check for class changes (flipped)
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList?.contains('flipped')) {
                    needsReinit = true;
                }
            }
        });

        if (needsReinit) {
            setTimeout(initCardBackButtons, 100);
        }
    });

    // Start observing
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

})();

console.log('✅ Card Back Functional JS Loaded');
