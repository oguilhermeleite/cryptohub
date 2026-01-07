// ============================================
// CRITICAL FIX: Ensure buttons are clickable
// DO NOT CLONE - Just force styles
// ============================================

console.log('🔧 Card Buttons Fix Loading...');

(function() {
    'use strict';

    function enableCardButtons() {
        console.log('🔧 Forcing button styles to be clickable...');

        // Just force CSS styles - DO NOT clone or add listeners
        document.querySelectorAll('.card-back a, .card-back button').forEach(elem => {
            // Force clickable styles
            elem.style.pointerEvents = 'auto';
            elem.style.cursor = 'pointer';
            elem.style.position = 'relative';
            elem.style.zIndex = '99999';
        });

        // Force card-back containers to be clickable
        document.querySelectorAll('.card-back, .card-back-buttons').forEach(elem => {
            elem.style.pointerEvents = 'auto';
        });

        console.log('✅ Button styles applied');
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableCardButtons);
    } else {
        enableCardButtons();
    }

    // Re-run when cards are flipped
    let flipTimeout;
    document.addEventListener('click', function(e) {
        if (e.target.closest('.platform-card') || e.target.closest('.card-front')) {
            clearTimeout(flipTimeout);
            flipTimeout = setTimeout(enableCardButtons, 100);
        }
    });

})();

console.log('🔧 Card Buttons Fix Loaded');
