// efecto de cursor con circulos siguiendo al mouse
document.addEventListener('DOMContentLoaded', () => {
    const colors = ['rgba(16, 185, 129, 0.6)', 'rgba(157, 78, 221, 0.6)'];
    let colorIndex = 0;
    let lastTime = 0;
    const throttleDelay = 50;

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();

        if (currentTime - lastTime < throttleDelay) {
            return;
        }

        lastTime = currentTime;

        const circle = document.createElement('div');
        circle.className = 'cursor-trail';
        circle.style.left = e.clientX + 'px';
        circle.style.top = e.clientY + 'px';
        circle.style.background = colors[colorIndex];

        colorIndex = (colorIndex + 1) % colors.length;

        document.body.appendChild(circle);
        setTimeout(() => {
            circle.remove();
        }, 800);
    });
});
