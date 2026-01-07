// ============================================
// CARD FLIP SYSTEM - COMPLETE REWRITE
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
        console.log('📦 Total platform cards found:', document.querySelectorAll('.platform-card').length);

        // Add click listener to EACH CARD individually
        document.querySelectorAll('.platform-card').forEach(card => {
            // Handle card flip
            card.addEventListener('click', function(e) {
                // Check if click was on a button, link, or inside card-back-buttons
                const isInsideButtons = e.target.closest('.card-back-buttons');
                const isButton = e.target.closest('.card-btn-primary') ||
                               e.target.closest('.card-btn-secondary') ||
                               e.target.closest('a') ||
                               e.target.closest('button');

                if (isButton || isInsideButtons) {
                    console.log('🔘 Click was on button/link - NOT flipping card');
                    e.stopPropagation(); // Stop the event from propagating
                    return;
                }

                console.log('🖱️ Click detected on card:', card.getAttribute('data-platform'));

                // Toggle the flipped state
                const wasFlipped = card.classList.contains('flipped');
                card.classList.toggle('flipped');

                console.log('🔄 Card', card.getAttribute('data-platform'),
                           wasFlipped ? 'flipped BACK to front' : 'flipped TO back');

                // Log the card-inner transform
                const cardInner = card.querySelector('.card-inner');
                if (cardInner) {
                    const transform = window.getComputedStyle(cardInner).transform;
                    console.log('📐 Card-inner transform:', transform);
                }
            });

            // Handle "Voltar" button
            const backButton = card.querySelector('.card-btn-back');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    card.classList.remove('flipped');
                    console.log('⬅️ Voltar button clicked - flipping card back');
                });
            }

            // Handle tracking for primary links
            const primaryLinks = card.querySelectorAll('a[data-track]');
            primaryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const trackData = this.getAttribute('data-track');
                    if (trackData && typeof trackPlatformClick === 'function') {
                        const [platform, category] = trackData.split('|');
                        trackPlatformClick(platform, category);
                    }
                });
            });
        });

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

        console.log('✅ Card flip event listeners attached successfully');

        // Test if CSS is loaded correctly
        const testCard = document.querySelector('.platform-card');
        if (testCard) {
            const testInner = testCard.querySelector('.card-inner');
            if (testInner) {
                const style = window.getComputedStyle(testInner);
                console.log('🎨 Card-inner transform-style:', style.transformStyle);
                console.log('🎨 Card-inner transition:', style.transition);
            }

            const testFront = testCard.querySelector('.card-front');
            const testBack = testCard.querySelector('.card-back');
            if (testFront && testBack) {
                console.log('🎨 Card-front backface-visibility:', window.getComputedStyle(testFront).backfaceVisibility);
                console.log('🎨 Card-back backface-visibility:', window.getComputedStyle(testBack).backfaceVisibility);
                console.log('🎨 Card-back transform:', window.getComputedStyle(testBack).transform);
            }
        }
    }

})();

console.log('🎴 Card Flip JS Loaded Successfully');
