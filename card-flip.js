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

        // Add click listener to document to catch all clicks
        document.addEventListener('click', function(e) {
            // Desktop: Hover to flip (no click) - Mobile: Click to flip
            if (window.innerWidth > 768) {
                return; // Desktop uses hover, not click
            }

            // Find if click was on or inside a platform card
            const card = e.target.closest('.platform-card');

            if (!card) {
                return; // Click was not on a card
            }

            console.log('🖱️ Click detected on card (mobile):', card.getAttribute('data-platform'));

            // Check if click was on a button or link
            const isButton = e.target.closest('.card-btn-primary') ||
                           e.target.closest('.card-btn-secondary') ||
                           e.target.closest('a') ||
                           e.target.closest('button');

            if (isButton) {
                console.log('🔘 Click was on button/link - not flipping');
                return; // Let the button/link work normally
            }

            // Toggle the flipped state (mobile only)
            const wasFlipped = card.classList.contains('flipped');
            card.classList.toggle('flipped');
            const isFlipped = card.classList.contains('flipped');

            console.log('🔄 Card', card.getAttribute('data-platform'),
                       wasFlipped ? 'flipped BACK to front' : 'flipped TO back');

            // Log the card-inner transform
            const cardInner = card.querySelector('.card-inner');
            if (cardInner) {
                const transform = window.getComputedStyle(cardInner).transform;
                console.log('📐 Card-inner transform:', transform);
            }

        }, true); // Use capture phase to catch clicks early

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
