/**
 * CRITICAL FIX: Force enable mouse/trackpad interactions
 * This script forcefully removes any blocking elements or styles
 */

(function() {
    'use strict';

    console.log('[MOUSE FIX] Initializing...');

    function fixMouseInteractions() {
        // 1. Force body and html to be scrollable
        document.documentElement.style.overflowY = 'auto';
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowY = 'auto';
        document.body.style.overflowX = 'hidden';
        document.body.style.pointerEvents = 'auto';
        document.documentElement.style.pointerEvents = 'auto';

        // 2. Fix all body pseudo-elements
        const style = document.createElement('style');
        style.id = 'mouse-fix-force-style';
        style.textContent = `
            /* CRITICAL: Force all overlays behind content */
            body::before,
            body::after {
                z-index: -1 !important;
                pointer-events: none !important;
            }

            /* Force all sections to be interactive */
            section,
            main,
            .container,
            .platform-section,
            .hero-section {
                position: relative !important;
                z-index: 10 !important;
                pointer-events: auto !important;
            }

            /* Force all links and buttons clickable */
            a, button {
                pointer-events: auto !important;
                cursor: pointer !important;
            }

            /* Ensure scroll works */
            html, body {
                overflow-y: auto !important;
                overflow-x: hidden !important;
            }

            /* Remove any invisible blocking overlays */
            body > *:not(header):not(main):not(section):not(footer):not(script):not(style):not(noscript) {
                pointer-events: none !important;
            }
        `;

        // Remove old style if exists
        const oldStyle = document.getElementById('mouse-fix-force-style');
        if (oldStyle) {
            oldStyle.remove();
        }

        document.head.appendChild(style);

        // 3. Check for blocking elements
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const computedStyle = window.getComputedStyle(el);
            const zIndex = parseInt(computedStyle.zIndex);
            const position = computedStyle.position;

            // If element is fixed/absolute with high z-index and covers the screen
            if ((position === 'fixed' || position === 'absolute') &&
                zIndex > 100 && zIndex < 9999) {

                const rect = el.getBoundingClientRect();
                // If it covers most of the screen
                if (rect.width > window.innerWidth * 0.8 &&
                    rect.height > window.innerHeight * 0.8) {

                    console.warn('[MOUSE FIX] Found potential blocking element:', el);

                    // Don't block if it's a menu or modal that's not active
                    if (!el.classList.contains('active') &&
                        !el.classList.contains('show') &&
                        computedStyle.display === 'none' ||
                        computedStyle.visibility === 'hidden' ||
                        computedStyle.opacity === '0') {
                        el.style.pointerEvents = 'none';
                        el.style.zIndex = '-1';
                        console.log('[MOUSE FIX] Disabled blocking element:', el);
                    }
                }
            }
        });

        // 4. Log current state
        console.log('[MOUSE FIX] Body overflow-y:', document.body.style.overflowY);
        console.log('[MOUSE FIX] HTML overflow-y:', document.documentElement.style.overflowY);
        console.log('[MOUSE FIX] Body pointer-events:', window.getComputedStyle(document.body).pointerEvents);

        console.log('[MOUSE FIX] ✓ Applied');
    }

    // Run immediately
    fixMouseInteractions();

    // Run again after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixMouseInteractions);
    }

    // Run again after all resources loaded
    window.addEventListener('load', fixMouseInteractions);

    // Monitor for dynamic changes
    const observer = new MutationObserver(() => {
        fixMouseInteractions();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: false
    });

})();
