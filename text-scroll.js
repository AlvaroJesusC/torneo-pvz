function initTextScroll() {
    // Target both team names
    const elements = document.querySelectorAll('.team-name');

    elements.forEach(el => {
        // Reset state for recalculation
        el.classList.remove('is-long');
        const wrapper = el.querySelector('.text-wrapper');
        if (wrapper) {
            // Unwrap temporary to measure correctly
            el.innerText = wrapper.innerText;
        }

        // Check overflow
        if (el.scrollWidth > el.clientWidth) {
            el.classList.add('is-long');

            // Wrap text if not already wrapped
            if (!el.querySelector('.text-wrapper')) {
                const text = el.innerText;
                el.innerHTML = `<span class="text-wrapper">${text}</span>`;
            }

            const activeWrapper = el.querySelector('.text-wrapper');
            const offset = activeWrapper.scrollWidth - el.clientWidth;

            // Add a small buffer to the offset so it scrolls a bit past the end
            el.style.setProperty('--scroll-offset', `-${offset + 20}px`);
        }
    });
}

document.addEventListener('DOMContentLoaded', initTextScroll);
window.addEventListener('load', initTextScroll);
window.addEventListener('resize', () => {
    // Debounce resize
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(initTextScroll, 200);
});

// Clean up icons on load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.team-icon').forEach(icon => {
        if (!icon.querySelector('img')) {
            icon.remove();
        }
    });
});
