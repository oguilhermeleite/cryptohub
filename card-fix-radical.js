// ============================================
// RADICAL FIX - NUCLEAR OPTION FOR CARD BUTTONS
// ============================================

console.log('☢️ RADICAL FIX LOADING...');

(function() {
    'use strict';

    // STEP 1: Remove ALL CSS rules that block pointer-events
    function removeCSSBlockers() {
        console.log('☢️ Removing ALL CSS blockers...');

        // Get all stylesheets
        for (let sheet of document.styleSheets) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                for (let i = rules.length - 1; i >= 0; i--) {
                    const rule = rules[i];
                    if (rule.style && rule.selectorText) {
                        // Remove pointer-events: none from card-back
                        if (rule.selectorText.includes('.card-back') &&
                            rule.style.pointerEvents === 'none') {
                            console.log('🗑️ Removing blocker from:', rule.selectorText);
                            rule.style.pointerEvents = 'auto';
                        }
                    }
                }
            } catch (e) {
                // Cross-origin stylesheet, skip
            }
        }
    }

    // STEP 2: Force ALL card-back elements to be clickable
    function forceAllClickable() {
        console.log('☢️ Forcing ALL elements to be clickable...');

        // Force card-back containers
        document.querySelectorAll('.card-back').forEach(cardBack => {
            cardBack.setAttribute('style', `
                pointer-events: auto !important;
                z-index: 100 !important;
            `);
        });

        // Force ALL interactive elements
        const selectors = [
            '.card-back a',
            '.card-back button',
            '.card-back .card-btn-primary',
            '.card-back .card-btn-secondary',
            '.card-back .card-back-buttons'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(elem => {
                elem.setAttribute('style', `
                    pointer-events: auto !important;
                    cursor: pointer !important;
                    z-index: 10000 !important;
                    position: relative !important;
                    display: flex !important;
                `);
                console.log('✅ Forced clickable:', elem.tagName, elem.className);
            });
        });
    }

    // STEP 3: Add capture listeners that ALWAYS work
    function addCaptureListeners() {
        console.log('☢️ Adding capture listeners...');

        // Capture ALL clicks on document
        document.addEventListener('click', function(e) {
            const target = e.target;

            // Check if clicked on a link in card-back
            const link = target.closest('.card-back a');
            if (link && link.href) {
                console.log('☢️ INTERCEPTED LINK CLICK:', link.href);
                e.stopPropagation();
                e.stopImmediatePropagation();

                // Force open in new tab
                window.open(link.href, link.target || '_blank', 'noopener,noreferrer');
                return false;
            }

            // Check if clicked on card-back background (to flip back)
            const cardBack = target.closest('.card-back');
            if (cardBack && !target.closest('a') && !target.closest('button')) {
                const card = cardBack.closest('.platform-card');
                if (card && card.classList.contains('flipped')) {
                    console.log('☢️ Flipping card back to front');
                    card.classList.remove('flipped');
                }
            }
        }, true); // TRUE = capture phase (runs BEFORE any other listener)

        console.log('✅ Capture listeners added');
    }

    // STEP 4: Observe DOM changes and re-apply fixes
    function observeChanges() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    forceAllClickable();
                }

                // Check if a card was flipped
                mutation.target.classList?.forEach(cls => {
                    if (cls === 'flipped') {
                        setTimeout(forceAllClickable, 50);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        console.log('✅ DOM observer active');
    }

    // STEP 5: Force card-front to disappear when flipped
    function hideCardFrontWhenFlipped() {
        document.querySelectorAll('.platform-card.flipped .card-front').forEach(front => {
            front.setAttribute('style', `
                pointer-events: none !important;
                z-index: -10 !important;
                visibility: hidden !important;
                opacity: 0 !important;
            `);
        });
    }

    // MAIN INITIALIZATION
    function init() {
        console.log('☢️ RADICAL FIX INITIALIZING...');

        removeCSSBlockers();
        forceAllClickable();
        addCaptureListeners();
        observeChanges();

        // Run fixes periodically
        setInterval(function() {
            forceAllClickable();
            hideCardFrontWhenFlipped();
        }, 500);

        console.log('☢️ RADICAL FIX ACTIVE! Everything should work now.');
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also run after a delay to catch any late-loading content
    setTimeout(init, 1000);
    setTimeout(init, 2000);

})();

console.log('☢️ RADICAL FIX LOADED!');
