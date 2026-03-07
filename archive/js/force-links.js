// ============================================
// FORCE LINKS TO WORK - NUCLEAR OPTION
// ============================================

console.log('💥 FORCE LINKS SCRIPT LOADING...');

(function() {
    'use strict';

    function forceLinksToWork() {
        console.log('💥 Forcing ALL card-back links to work...');

        // Get ALL links in card-back
        const allLinks = document.querySelectorAll('.card-back a');
        console.log('🔗 Found', allLinks.length, 'links in card-back');

        allLinks.forEach((link, index) => {
            console.log(`\n🔗 Link ${index + 1}:`, {
                href: link.href,
                target: link.target,
                text: link.textContent.trim()
            });

            // Remove ALL existing event listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);

            // Force styles
            newLink.style.pointerEvents = 'auto';
            newLink.style.cursor = 'pointer';
            newLink.style.zIndex = '99999';
            newLink.style.position = 'relative';
            newLink.style.display = 'flex';

            // Add NEW click handler that FORCES the link to open
            newLink.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();

                const url = this.href;
                const target = this.target || '_blank';

                console.log('💥 FORCING LINK OPEN:', url);

                // Try multiple methods to open the link
                try {
                    // Method 1: window.open
                    const newWindow = window.open(url, target, 'noopener,noreferrer');
                    if (newWindow) {
                        console.log('✅ Link opened successfully via window.open');
                        newWindow.focus();
                    } else {
                        console.log('⚠️ window.open blocked, trying location.href...');
                        // Method 2: location.href (if popup blocked)
                        window.location.href = url;
                    }
                } catch (err) {
                    console.error('❌ Error opening link:', err);
                    // Method 3: Create temporary link and click it
                    const tempLink = document.createElement('a');
                    tempLink.href = url;
                    tempLink.target = target;
                    tempLink.rel = 'noopener noreferrer';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                }
            }, false);

            console.log('✅ Link', index + 1, 'forced to work');
        });

        // Also force card-back to be clickable
        const allCardBacks = document.querySelectorAll('.card-back');
        allCardBacks.forEach(cardBack => {
            cardBack.style.pointerEvents = 'auto';
            cardBack.style.zIndex = '100';
        });

        // Force flipped cards to show
        const allFlippedCards = document.querySelectorAll('.platform-card.flipped .card-back');
        allFlippedCards.forEach(cardBack => {
            cardBack.style.pointerEvents = 'auto';
            cardBack.style.zIndex = '100';
        });

        console.log('💥 ALL LINKS FORCED TO WORK!');
        console.log('🎯 Try clicking the buttons now!');
    }

    // Run immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceLinksToWork);
    } else {
        forceLinksToWork();
    }

    // Run again after 1 second to catch any dynamically added content
    setTimeout(forceLinksToWork, 1000);

    // Run every time a card is flipped
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card-front') || e.target.closest('.platform-card')) {
            setTimeout(forceLinksToWork, 200);
        }
    });

})();

console.log('💥 FORCE LINKS SCRIPT LOADED!');
