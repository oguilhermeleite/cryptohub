// ============================================
// CARD FLIP SYSTEM - BUTTONS WORKING VERSION
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
            const backButtons = card.querySelectorAll('.card-back a, .card-back button');

            // Setup card front click (flip to back)
            if (cardFront) {
                cardFront.addEventListener('click', function(e) {
                    // Don't flip if clicking a link/button
                    if (e.target.closest('a') || e.target.closest('button')) {
                        console.log('🔗 Click on link/button - not flipping');
                        return;
                    }

                    console.log('👆 Click on FRONT - flipping to back');
                    e.stopPropagation();
                    card.classList.add('flipped');
                });
            }

            // Setup "Voltar" button click
            const backButton = card.querySelector('.card-btn-back, .btn-back');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    console.log('⬅️ Back button clicked - flipping to front');
                    e.preventDefault();
                    e.stopPropagation();
                    card.classList.remove('flipped');
                });
            }

            // CRITICAL: Make sure all buttons are clickable
            backButtons.forEach(btn => {
                // Don't block link/button clicks
                btn.addEventListener('click', function(e) {
                    // If it's a "Voltar" button, flip back
                    if (btn.classList.contains('card-btn-back') || btn.classList.contains('btn-back')) {
                        e.preventDefault();
                        e.stopPropagation();
                        card.classList.remove('flipped');
                        console.log('⬅️ Voltar button clicked');
                    } else {
                        // It's a normal link - let it work!
                        // Stop propagation so card doesn't flip
                        e.stopPropagation();
                        console.log('🔗 Link clicked:', btn.href || btn.textContent);
                    }
                });

                // Force button to be clickable
                btn.style.pointerEvents = 'auto';
                btn.style.cursor = 'pointer';
                btn.style.position = 'relative';
                btn.style.zIndex = '99999';
            });

            // Click on card-back background (not buttons) to flip back
            if (cardBack) {
                cardBack.addEventListener('click', function(e) {
                    // Only flip if clicking the background itself, not buttons/links
                    if (e.target === cardBack ||
                        e.target.classList.contains('card-back-header') ||
                        e.target.classList.contains('card-back-title') ||
                        e.target.classList.contains('card-back-description')) {
                        console.log('👆 Click on background - flipping to front');
                        card.classList.remove('flipped');
                    }
                });
            }
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

        console.log('✅ Card flip system ready - buttons are clickable!');
    }

})();

console.log('🎴 Card Flip JS Loaded Successfully');
