/**
 * CRITICAL FIX: Unblock mouse wheel scroll on main page
 * This script removes/overrides any wheel event listeners that prevent default scroll
 */

(function() {
    'use strict';

    console.log('[SCROLL UNBLOCK] Initializing...');

    // Wait for DOM to be ready
    function init() {
        // 1. FORCE natural scroll behavior on html and body
        document.documentElement.style.overflowY = 'scroll';
        document.body.style.overflowY = 'auto';

        // 2. Remove wheel event listeners from containers that block scroll
        const containers = document.querySelectorAll('.horizontal-scroll-container, .cards-final-grid, .horizontal-cards-grid');

        containers.forEach(container => {
            // Clone the element to remove all event listeners
            const clone = container.cloneNode(true);
            container.parentNode.replaceChild(clone, container);
            console.log('[SCROLL UNBLOCK] Removed wheel listeners from:', clone.className);
        });

        // 3. CRITICAL: Override preventDefault on wheel events for the whole document
        const originalPreventDefault = Event.prototype.preventDefault;
        Event.prototype.preventDefault = function() {
            // Allow preventDefault ONLY on specific containers, not on document/body
            if (this.type === 'wheel' &&
                (this.target === document.documentElement ||
                 this.target === document.body ||
                 this.target.closest('section') ||
                 this.target.closest('main'))) {
                console.log('[SCROLL UNBLOCK] Prevented preventDefault on wheel event');
                return; // Don't prevent default for main page scroll
            }
            originalPreventDefault.call(this);
        };

        // 4. Add a catch-all wheel listener that ensures scroll works
        document.addEventListener('wheel', function(e) {
            // If wheel event is on main page (not inside horizontal scroll containers)
            const isInHorizontalContainer = e.target.closest('.horizontal-scroll-container, .cards-final-grid');

            if (!isInHorizontalContainer) {
                // Let it scroll naturally - don't interfere
                console.log('[SCROLL UNBLOCK] Natural scroll allowed');
            }
        }, { passive: true }); // passive: true means can't preventDefault

        console.log('[SCROLL UNBLOCK] ✓ Applied - Mouse wheel should work now');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also run after everything loads
    window.addEventListener('load', init);

})();
