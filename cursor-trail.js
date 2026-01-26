// efecto de cursor con circulos siguiendo al mouse
document.addEventListener('DOMContentLoaded', () => {
    const colors = ['rgba(16, 185, 129, 0.6)', 'rgba(157, 78, 221, 0.6)']; // verde y morado
    let colorIndex = 0;
    let lastTime = 0;
    const throttleDelay = 50; // milisegundos entre cada circulo

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();

        //  circulo si paso tiempo suficiente
        if (currentTime - lastTime < throttleDelay) {
            return;
        }

        lastTime = currentTime;

        // crea el circulo
        const circle = document.createElement('div');
        circle.className = 'cursor-trail';
        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';
        circle.style.background = colors[colorIndex];

        // alterna colores
        colorIndex = (colorIndex + 1) % colors.length;

        document.body.appendChild(circle);

        // quita despues de la animacion
        setTimeout(() => {
            circle.remove();
        }, 800);
    });
});
