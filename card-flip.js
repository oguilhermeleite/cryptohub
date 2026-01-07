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

            // Add click listener to card-front and card-back separately
            const cardFront = card.querySelector('.card-front');
            const cardBack = card.querySelector('.card-back');

            // Click on FRONT flips the card
            if (cardFront) {
                cardFront.addEventListener('click', function(e) {
                    console.log('👆 Click on FRONT - flipping to back');
                    card.classList.add('flipped');
                });
            }

            // Click on BACK (but not on buttons) flips back
            if (cardBack) {
                cardBack.addEventListener('click', function(e) {
                    // Check if click was on a button or link
                    const clickedElement = e.target;
                    const isLink = clickedElement.tagName === 'A' || clickedElement.closest('a');
                    const isButton = clickedElement.tagName === 'BUTTON' || clickedElement.closest('button');

                    if (isLink || isButton) {
                        console.log('🔗 Click on link/button - NOT flipping, allowing default action');
                        return; // Let the link/button work normally
                    }

                    console.log('👆 Click on BACK area - flipping to front');
                    card.classList.remove('flipped');
                });
            }

            // Handle "Voltar" button specifically
            const backButton = card.querySelector('.card-btn-back');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    console.log('⬅️ Voltar button clicked');
                    card.classList.remove('flipped');
                });
            }

            // Handle tracking for primary links
            const primaryLinks = card.querySelectorAll('a[data-track]');
            primaryLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent card flip
                    const trackData = this.getAttribute('data-track');
                    if (trackData && typeof trackPlatformClick === 'function') {
                        const [platform, category] = trackData.split('|');
                        trackPlatformClick(platform, category);
                    }
                    console.log('📊 Tracked click on:', trackData);
                });
            });

            // Handle all other links (Twitter, etc)
            const allLinks = card.querySelectorAll('.card-back a');
            allLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent card flip
                    console.log('🔗 Link clicked:', this.href);
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
