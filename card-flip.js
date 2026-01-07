// ============================================
// CARD FLIP SYSTEM - ULTRA SIMPLIFIED VERSION
// ============================================

console.log('🎴 Card Flip JS Loading (Simplified)...');

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardFlip);
    } else {
        initCardFlip();
    }

    function initCardFlip() {
        console.log('🎴 Card Flip System Initialized (Simplified)');

        const cards = document.querySelectorAll('.platform-card');
        console.log('📦 Total platform cards found:', cards.length);

        // Prevent duplicate initialization
        if (window.cardFlipInitialized) {
            console.log('⚠️ Card flip already initialized, skipping');
            return;
        }
        window.cardFlipInitialized = true;

        cards.forEach((card, index) => {
            console.log(`🎴 Setting up card ${index + 1}:`, card.getAttribute('data-platform'));

            const cardFront = card.querySelector('.card-front');
            const cardBack = card.querySelector('.card-back');

            // SIMPLE: Click on FRONT flips the card
            if (cardFront) {
                cardFront.addEventListener('click', function(e) {
                    // Don't flip if clicking a link/button on the front
                    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
                        e.target.closest('a') || e.target.closest('button')) {
                        return;
                    }

                    console.log('👆 Click on FRONT - flipping to back');
                    card.classList.add('flipped');

                    // CRITICAL: Push card-front behind
                    if (cardFront) {
                        cardFront.style.pointerEvents = 'none';
                        cardFront.style.zIndex = '-1';
                        cardFront.style.visibility = 'hidden';
                    }

                    // CRITICAL: Force all back elements to be clickable
                    forceBackClickable(card);
                });
            }

            // SIMPLE: Click ONLY on card-back background (not on links/buttons) flips back
            if (cardBack) {
                cardBack.addEventListener('click', function(e) {
                    // ONLY flip back if clicking the background itself
                    if (e.target === cardBack || e.target.classList.contains('card-back-header') ||
                        e.target.classList.contains('card-back-description')) {
                        console.log('👆 Click on BACK background - flipping to front');
                        card.classList.remove('flipped');
                    }
                    // If clicking a link/button, do NOTHING - let it work normally
                });
            }
        });

        // FORCE all card-back links to be clickable immediately
        setTimeout(() => {
            document.querySelectorAll('.card-back a, .card-back button').forEach(elem => {
                elem.style.pointerEvents = 'auto';
                elem.style.cursor = 'pointer';
                elem.style.zIndex = '9999';
                elem.style.position = 'relative';
            });
            console.log('✅ Forced all card-back links to be clickable on page load');
        }, 500);

        // ESC key to flip all cards back
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const flippedCards = document.querySelectorAll('.platform-card.flipped');
                console.log('⌨️ ESC pressed - flipping', flippedCards.length, 'cards back');
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                });
            }
        });

        console.log('✅ Card flip system ready');
    }

    // Helper function to force card-back elements to be clickable
    function forceBackClickable(card) {
        setTimeout(() => {
            const cardBack = card.querySelector('.card-back');

            if (cardBack) {
                // Force card-back itself
                cardBack.style.pointerEvents = 'auto';
                cardBack.style.zIndex = '100';
            }

            // Force ALL interactive elements
            const interactiveElements = card.querySelectorAll(
                '.card-back a, ' +
                '.card-back button, ' +
                '.card-back .card-btn-primary, ' +
                '.card-back .card-btn-secondary, ' +
                '.card-back .card-back-buttons'
            );

            interactiveElements.forEach(elem => {
                elem.style.pointerEvents = 'auto';
                elem.style.cursor = 'pointer';
                elem.style.zIndex = '9999';
                elem.style.position = 'relative';

                // Remove any event listeners that might block clicks
                const newElem = elem.cloneNode(true);
                elem.parentNode.replaceChild(newElem, elem);
            });

            console.log('✅ Forced', interactiveElements.length, 'elements to be clickable in card', card.getAttribute('data-platform'));
        }, 100);
    }

})();

console.log('🎴 Card Flip JS Loaded Successfully (Simplified)');
