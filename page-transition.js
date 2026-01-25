// efecto de transicion de pagina fade simple
document.addEventListener('DOMContentLoaded', () => {
    // añade el overlay de transicion al body
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);

    // fade in al cargar
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);

    // maneja todos los links internos
    const links = document.querySelectorAll('a[href$=".html"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // solo aplica transicion a links internos
            if (href && !link.target) {
                e.preventDefault();

                // dispara la animacion de salida
                document.body.classList.add('page-exiting');

                // navega despues de la animacion
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
});
