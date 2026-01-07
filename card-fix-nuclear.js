// ============================================
// NUCLEAR FIX: Make All Buttons Work
// ============================================

console.log('🔥 NUCLEAR FIX: Loading...');

(function() {
    'use strict';

    function nuclearFix() {
        console.log('🔥 Applying nuclear fixes...');

        // FIX 1: Voltar button functionality
        const voltarButtons = document.querySelectorAll('.btn-back, .card-btn-back, button.card-btn-secondary');

        voltarButtons.forEach((btn, index) => {
            // Check if it's actually a back button
            const text = btn.textContent.trim();
            if (!text.includes('Voltar') && !text.includes('⬅️')) {
                return;
            }

            // Remove old listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            // Force styles
            newBtn.style.pointerEvents = 'auto';
            newBtn.style.cursor = 'pointer';
            newBtn.style.zIndex = '99999';
            newBtn.style.position = 'relative';

            // Add click handler
            newBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                console.log('🔥 Voltar clicked!');

                const card = this.closest('.platform-card') || this.closest('.featured-card');

                if (card) {
                    card.classList.remove('flipped');
                    console.log('✅ Card flipped back');
                } else {
                    console.error('❌ Could not find card');
                }
            }, true); // Capture phase

            console.log(`✅ Voltar button ${index + 1} fixed`);
        });

        // FIX 2: Link buttons functionality
        const linkButtons = document.querySelectorAll('.card-back a[href], .card-back .card-btn-primary, .card-back .btn-visit, .card-back .btn-social');

        linkButtons.forEach((link, index) => {
            // Skip if it's a Voltar button
            const text = link.textContent.trim();
            if (text.includes('Voltar') || text.includes('⬅️')) {
                return;
            }

            // Get href before cloning
            const href = link.getAttribute('href');

            if (!href || href === '#') {
                console.warn('⚠️ Link has no href:', link);
                return;
            }

            // Remove old listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);

            // Force styles
            newLink.style.pointerEvents = 'auto';
            newLink.style.cursor = 'pointer';
            newLink.style.zIndex = '99999';
            newLink.style.position = 'relative';
            newLink.style.display = 'flex';

            // Add click handler
            newLink.addEventListener('click', function(e) {
                e.stopPropagation();
                e.stopImmediatePropagation();

                const url = this.getAttribute('href');

                console.log('🔥 Link clicked:', url);

                // Open link
                if (url && url !== '#') {
                    e.preventDefault();
                    window.open(url, '_blank', 'noopener,noreferrer');
                    console.log('✅ Link opened');
                }
            }, true); // Capture phase

            console.log(`✅ Link ${index + 1} fixed:`, href);
        });

        // FIX 3: Card flip on mobile click
        const cards = document.querySelectorAll('.platform-card, .featured-card');

        cards.forEach((card, index) => {
            const cardFront = card.querySelector('.card-front');

            if (cardFront) {
                // Remove old listener
                const newFront = cardFront.cloneNode(true);
                cardFront.parentNode.replaceChild(newFront, cardFront);

                // Add click handler for mobile
                newFront.addEventListener('click', function(e) {
                    // Only on mobile
                    if (window.innerWidth <= 768) {
                        // Don't flip if clicking a button/link
                        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' ||
                            e.target.closest('a') || e.target.closest('button')) {
                            return;
                        }

                        console.log('🔥 Card front clicked (mobile)');
                        card.classList.add('flipped');
                    }
                });
            }
        });

        console.log('🔥 Nuclear fix applied to', cards.length, 'cards');
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', nuclearFix);
    } else {
        nuclearFix();
    }

    // Re-run on any card state change
    let fixTimeout;
    document.addEventListener('click', function() {
        clearTimeout(fixTimeout);
        fixTimeout = setTimeout(nuclearFix, 100);
    });

    // Re-run periodically to catch any new cards
    setInterval(nuclearFix, 2000);

})();

console.log('🔥 NUCLEAR FIX: Loaded');
