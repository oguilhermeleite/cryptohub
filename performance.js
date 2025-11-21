// Performance Optimization Script
// Lazy load images when they enter viewport

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for lazy loading images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observe all images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });

    // Smooth scroll optimization
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        document.body.classList.add('is-scrolling');

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            document.body.classList.remove('is-scrolling');
        }, 150);
    }, { passive: true });

    // Optimize animations on scroll
    const animatedElements = document.querySelectorAll('.platform-section, .premium-hero-section');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-50px'
    });

    animatedElements.forEach(el => animationObserver.observe(el));

    // Prefetch hover links
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const href = this.getAttribute('href');
            if (href && href.startsWith('/') || href.includes(window.location.hostname)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        }, { passive: true, once: true });
    });

    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle resize
            document.body.classList.add('resize-animation-stopper');
            setTimeout(() => {
                document.body.classList.remove('resize-animation-stopper');
            }, 400);
        }, 250);
    }, { passive: true });

    // Optimize platform card loading
    const cards = document.querySelectorAll('.platform-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}
