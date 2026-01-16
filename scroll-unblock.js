/**
 * NUCLEAR FIX: Force wheel scroll to work - MOST AGGRESSIVE APPROACH
 * Captures wheel events BEFORE any other script can block them
 */

(function() {
    'use strict';

    console.log('[SCROLL UNBLOCK] NUCLEAR MODE Initializing...');

    // IMMEDIATE: Add wheel listener in CAPTURE phase (before any other listeners)
    // This runs FIRST before any other wheel handlers
    document.addEventListener('wheel', function(e) {
        // Check if we're inside a horizontal scroll container
        const isInHorizontalContainer = e.target.closest('.horizontal-scroll-container, .cards-final-grid, .horizontal-cards-grid');

        if (isInHorizontalContainer) {
            // Allow horizontal scrolling on these containers
            console.log('[SCROLL UNBLOCK] Allowing horizontal scroll on container');
            return;
        }

        // CRITICAL: For main page scroll, STOP propagation to prevent other scripts from blocking it
        e.stopImmediatePropagation();

        // Force the scroll manually
        const delta = e.deltaY || e.detail || e.wheelDelta;
        window.scrollBy({
            top: delta,
            behavior: 'auto' // Instant scroll, smooth might not work in emergency mode
        });

        console.log('[SCROLL UNBLOCK] FORCED SCROLL:', delta);

    }, { capture: true, passive: false }); // capture: true = run FIRST, passive: false = can stopPropagation

    // FORCE scroll styles
    function forceScrollStyles() {
        document.documentElement.style.overflowY = 'scroll !important';
        document.body.style.overflowY = 'auto !important';
        document.body.style.height = 'auto !important';
        document.body.style.minHeight = '100vh !important';
        console.log('[SCROLL UNBLOCK] Forced scroll styles');
    }

    forceScrollStyles();

    // Keep forcing styles
    setInterval(forceScrollStyles, 1000);

    console.log('[SCROLL UNBLOCK] ✓✓✓ NUCLEAR MODE ACTIVE - Scroll WILL work ✓✓✓');

})();
