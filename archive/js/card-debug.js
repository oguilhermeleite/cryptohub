// ============================================
// CARD DEBUG SCRIPT - Diagnostic Tool
// ============================================

console.log('🔍 Card Debug Script Loaded');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Starting Card Diagnostic...');

    // Test 1: Check if cards exist
    const cards = document.querySelectorAll('.platform-card');
    console.log('📦 Total cards found:', cards.length);

    if (cards.length === 0) {
        console.error('❌ NO CARDS FOUND! Check HTML structure.');
        return;
    }

    // Test 2: Check card structure
    cards.forEach((card, index) => {
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');
        const backLinks = card.querySelectorAll('.card-back a');
        const backButtons = card.querySelectorAll('.card-back button');

        console.log(`\n🎴 Card ${index + 1}:`, {
            hasFront: !!cardFront,
            hasBack: !!cardBack,
            linksInBack: backLinks.length,
            buttonsInBack: backButtons.length,
            isFlipped: card.classList.contains('flipped')
        });

        // Test 3: Check computed styles
        if (cardBack) {
            const backStyle = window.getComputedStyle(cardBack);
            console.log(`  📐 Card-back styles:`, {
                pointerEvents: backStyle.pointerEvents,
                zIndex: backStyle.zIndex,
                opacity: backStyle.opacity,
                display: backStyle.display,
                visibility: backStyle.visibility
            });
        }

        // Test 4: Check link/button properties
        backLinks.forEach((link, linkIndex) => {
            const linkStyle = window.getComputedStyle(link);
            console.log(`  🔗 Link ${linkIndex + 1}:`, {
                href: link.href,
                target: link.target,
                pointerEvents: linkStyle.pointerEvents,
                zIndex: linkStyle.zIndex,
                cursor: linkStyle.cursor
            });
        });
    });

    // Test 5: Add manual flip test
    console.log('\n🧪 Adding manual test button...');

    const testButton = document.createElement('button');
    testButton.textContent = '🧪 TEST: Flip First Card';
    testButton.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 999999;
        padding: 15px 25px;
        background: #00f5a0;
        color: #000;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,245,160,0.5);
    `;

    testButton.addEventListener('click', function() {
        const firstCard = document.querySelector('.platform-card');
        if (firstCard) {
            const wasFlipped = firstCard.classList.contains('flipped');

            if (wasFlipped) {
                firstCard.classList.remove('flipped');
                console.log('🔄 Flipped card BACK to front');
            } else {
                firstCard.classList.add('flipped');
                console.log('🔄 Flipped card to BACK');

                // Force all links to be clickable
                setTimeout(() => {
                    const cardBack = firstCard.querySelector('.card-back');
                    const allInteractive = firstCard.querySelectorAll('.card-back a, .card-back button');

                    if (cardBack) {
                        cardBack.style.pointerEvents = 'auto';
                        cardBack.style.zIndex = '100';
                    }

                    allInteractive.forEach(elem => {
                        elem.style.pointerEvents = 'auto';
                        elem.style.cursor = 'pointer';
                        elem.style.zIndex = '9999';
                        elem.style.position = 'relative';

                        // Add visual feedback
                        elem.style.outline = '2px solid red';
                        elem.style.backgroundColor = 'rgba(255,0,0,0.2)';

                        // Get element position and check what's on top
                        const rect = elem.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;
                        const topElement = document.elementFromPoint(centerX, centerY);

                        console.log('✅ Forced element:', elem.tagName, elem.className, {
                            position: { x: centerX, y: centerY },
                            topElementAtPosition: topElement?.tagName + ' ' + topElement?.className,
                            isClickable: topElement === elem || elem.contains(topElement)
                        });
                    });

                    console.log('✅ Forced', allInteractive.length, 'elements to be clickable');
                    console.log('🎯 Try clicking the links now! (They have RED outline and red background)');
                }, 100);
            }
        }
    });

    document.body.appendChild(testButton);

    // Test 6: Add click interceptor to see ALL clicks
    document.addEventListener('click', function(e) {
        console.log('👆 CLICK DETECTED:', {
            target: e.target.tagName,
            classList: e.target.classList.value,
            href: e.target.href || 'no href',
            parentElement: e.target.parentElement?.tagName,
            x: e.clientX,
            y: e.clientY
        });
    }, true); // Use capture phase

    console.log('\n✅ Diagnostic Complete! Use the test button to manually flip cards.');
    console.log('📝 Click anywhere on the page to see click detection logs.');
});
