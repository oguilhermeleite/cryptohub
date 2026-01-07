// ============================================
// CRITICAL FIX: Ensure clicks pass through to links
// ============================================

console.log('🔧 Card Buttons Fix Loading...');

(function() {
    'use strict';

    function enableCardButtons() {
        console.log('🔧 Enabling card buttons...');

        // Ensure clicks pass through to links
        document.querySelectorAll('.card-back a, .card-back button').forEach(link => {
            // Remove any previous listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);

            // Add simple click handler
            newLink.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card from capturing click
                console.log('🔗 Button clicked:', newLink.textContent.trim(), newLink.href || 'button');
                // Let default link behavior work
            });
        });

        console.log('✅ Card buttons enabled');
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableCardButtons);
    } else {
        enableCardButtons();
    }

    // Re-run when cards are flipped
    document.addEventListener('click', function(e) {
        if (e.target.closest('.platform-card') || e.target.closest('.card-front')) {
            setTimeout(enableCardButtons, 100);
        }
    });

})();

console.log('🔧 Card Buttons Fix Loaded');
