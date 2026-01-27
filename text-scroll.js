function initTextScroll() {
    // apunta a los nombres en los equipos
    const elements = document.querySelectorAll('.team-name');

    elements.forEach(el => {
        // resetea el estado para recalcular
        el.classList.remove('is-long');
        const wrapper = el.querySelector('.text-wrapper');
        if (wrapper) {
            el.innerText = wrapper.innerText;
        }

        if (el.scrollWidth > el.clientWidth) {
            el.classList.add('is-long');

            if (!el.querySelector('.text-wrapper')) {
                const text = el.innerText;
                el.innerHTML = `<span class="text-wrapper">${text}</span>`;
            }

            const activeWrapper = el.querySelector('.text-wrapper');
            const offset = activeWrapper.scrollWidth - el.clientWidth;

            el.style.setProperty('--scroll-offset', `-${offset + 20}px`);
        }
    });
}

document.addEventListener('DOMContentLoaded', initTextScroll);
window.addEventListener('load', initTextScroll);
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(initTextScroll, 200);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.team-icon').forEach(icon => {
        if (!icon.querySelector('img')) {
            icon.remove();
        }
    });
});
