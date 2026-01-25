// Efecto de cursor con círculos que siguen al mouse
document.addEventListener('DOMContentLoaded', () => {
    const colors = ['rgba(16, 185, 129, 0.6)', 'rgba(157, 78, 221, 0.6)']; // Verde y morado
    let colorIndex = 0;
    let lastTime = 0;
    const throttleDelay = 50; // Milisegundos entre cada círculo

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();

        // Solo crear círculo si ha pasado suficiente tiempo
        if (currentTime - lastTime < throttleDelay) {
            return;
        }

        lastTime = currentTime;

        // Crear círculo
        const circle = document.createElement('div');
        circle.className = 'cursor-trail';
        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';
        circle.style.background = colors[colorIndex];

        // Alternar entre verde y morado
        colorIndex = (colorIndex + 1) % colors.length;

        document.body.appendChild(circle);

        // Remover después de la animación
        setTimeout(() => {
            circle.remove();
        }, 800);
    });
});
