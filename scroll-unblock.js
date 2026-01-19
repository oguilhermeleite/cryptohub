/**
 * SCROLL FIX: Ultra-smooth native scroll
 * Simply ensures nothing blocks the native browser scroll
 */

(function() {
    'use strict';

    console.log('[SCROLL FIX] Enabling smooth native scroll...');

    // Ensure CSS scroll is enabled
    function enableScroll() {
        document.documentElement.style.cssText = 'overflow-y: scroll !important; scroll-behavior: smooth;';
        document.body.style.cssText = 'overflow-y: auto !important; min-height: 100vh !important; scroll-behavior: smooth;';
    }

    // Apply immediately
    enableScroll();

    // Reapply after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enableScroll);
    }

    // Final check after everything loads
    window.addEventListener('load', () => {
        setTimeout(enableScroll, 100);
    });

    console.log('[SCROLL FIX] ✓ Native smooth scroll active');

})();
