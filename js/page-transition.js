document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

    const links = document.querySelectorAll('a[href$=".html"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && !link.target) {
                e.preventDefault();

                document.body.classList.add('page-exiting');

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
});
