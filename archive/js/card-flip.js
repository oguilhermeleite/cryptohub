// ============================================
// CARD FLIP SYSTEM - SIMPLE & FUNCTIONAL
// Buttons MUST work!
// ============================================

console.log('🎴 Card Flip JS Loading...');

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCardFlip);
    } else {
        initCardFlip();
    }

    function initCardFlip() {
        console.log('🎴 Card Flip System Initialized');

        const cards = document.querySelectorAll('.platform-card, .featured-card');
        console.log('📦 Total cards found:', cards.length);

        // Prevent duplicate initialization
        if (window.cardFlipInitialized) {
            console.log('⚠️ Card flip already initialized, skipping');
            return;
        }
        window.cardFlipInitialized = true;

        cards.forEach((card, index) => {
            const platform = card.getAttribute('data-platform');
            console.log(`🎴 Setting up card ${index + 1}:`, platform);

            const cardFront = card.querySelector('.card-front');
            const cardBack = card.querySelector('.card-back');

            // Setup card front click (flip to back)
            if (cardFront) {
                cardFront.addEventListener('click', function(e) {
                    // Don't flip if clicking a link/button
                    if (e.target.closest('a') || e.target.closest('button')) {
                        return;
                    }

                    console.log('👆 Click on FRONT - flipping to back');
                    card.classList.add('flipped');
                });
            }

            // Setup "Voltar" button ONLY
            const backButton = card.querySelector('.card-btn-back, .btn-back');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    console.log('⬅️ Back button clicked - flipping to front');
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.remove('flipped');
                });
            }

            // CRITICAL: Just ensure links have proper styles
            // DO NOT add any event listeners to links!
            const allLinks = card.querySelectorAll('.card-back a:not(.card-btn-back)');
            allLinks.forEach(link => {
                // Force styles only - NO event listeners!
                link.style.pointerEvents = 'auto';
                link.style.cursor = 'pointer';
                link.style.position = 'relative';
                link.style.zIndex = '99999';
            });

            // NO event listener on card-back!
            // Links MUST work without interference
        });

        // ESC key to flip all cards back
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const flippedCards = document.querySelectorAll('.platform-card.flipped, .featured-card.flipped');
                console.log('⌨️ ESC pressed - flipping', flippedCards.length, 'cards back');
                flippedCards.forEach(card => {
                    card.classList.remove('flipped');
                });
            }
        });

        console.log('✅ Card flip system ready - links work naturally!');
    }

})();

console.log('🎴 Card Flip JS Loaded Successfully');
