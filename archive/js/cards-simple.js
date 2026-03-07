// ============================================
// SIMPLE CARD SYSTEM - Just tracking clicks
// NO flip, NO interference, buttons work 100%
// ============================================

console.log('🎴 Simple Cards JS Loading...');

(function() {
    'use strict';

    function initSimpleCards() {
        console.log('🎴 Simple Cards Initialized');

        // Just track clicks for analytics
        const allButtons = document.querySelectorAll('.card-btn');

        allButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const platform = this.closest('.platform-card-simple')?.getAttribute('data-platform');
                const buttonType = this.classList.contains('card-btn-primary') ? 'Visit Site' : 'Follow Twitter';

                console.log('🔗 Button clicked:', {
                    platform: platform,
                    type: buttonType,
                    url: this.href
                });

                // Let the link work naturally - NO preventDefault!
            });
        });

        console.log('✅ Simple cards ready -', allButtons.length, 'buttons tracked');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSimpleCards);
    } else {
        initSimpleCards();
    }

})();

console.log('✅ Simple Cards JS Loaded');
