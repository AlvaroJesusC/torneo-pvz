// Page Transition Effect - Simple Fade
document.addEventListener('DOMContentLoaded', () => {
    // Add transition overlay to body
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // Fade in on page load
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

    // Handle all internal links
    const links = document.querySelectorAll('a[href$=".html"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only apply transition to internal page links
            if (href && !link.target) {
                e.preventDefault();

                // Trigger exit animation
                document.body.classList.add('page-exiting');

                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Faster fade transition
            }
        });
    });
});
