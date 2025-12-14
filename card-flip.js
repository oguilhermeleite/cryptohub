// ============================================
// CARD FLIP SYSTEM - CLEAN IMPLEMENTATION
// ============================================

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardFlip);
    } else {
        initCardFlip();
    }

    function initCardFlip() {
        console.log('🎴 Card Flip System Initialized');

        // Add click listeners to all platform cards
        document.addEventListener('click', function(e) {
            // Find the closest platform card
            const card = e.target.closest('.platform-card');

            if (card) {
                // Don't flip if clicking a link or button inside the card back
                if (e.target.closest('.card-btn-primary') ||
                    e.target.closest('.card-btn-secondary') ||
                    e.target.tagName === 'A') {
                    console.log('🔗 Link clicked - not flipping card');
                    return; // Let the link work naturally
                }

                // Toggle the flipped class
                card.classList.toggle('flipped');

                const isFlipped = card.classList.contains('flipped');
                const platformName = card.getAttribute('data-platform');

                console.log(`🎴 Card ${platformName} ${isFlipped ? 'flipped to back' : 'flipped to front'}`);
            }
        }, true); // Use capture phase

        // Also handle ESC key to flip all cards back
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const flippedCards = document.querySelectorAll('.platform-card.flipped');
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                    console.log('⌨️ ESC pressed - flipping cards back');
                });
            }
        });

        console.log('✅ Card flip event listeners attached');
    }

})();
