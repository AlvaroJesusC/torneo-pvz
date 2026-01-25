document.addEventListener('DOMContentLoaded', () => {
    // Target both team names and list items if needed, but user emphasized headers
    const elements = document.querySelectorAll('.team-name');

    elements.forEach(el => {
        // Check overflow
        if (el.scrollWidth > el.clientWidth) {
            el.classList.add('is-long');

            // Wrap text if not already wrapped
            if (!el.querySelector('.text-wrapper')) {
                const text = el.innerText;
                el.innerHTML = `<span class="text-wrapper">${text}</span>`;
            }

            const wrapper = el.querySelector('.text-wrapper');
            const offset = wrapper.scrollWidth - el.clientWidth;

            // Add a small buffer to the offset so it scrolls a bit past the end
            el.style.setProperty('--scroll-offset', `-${offset + 10}px`);
        }
    });

    // Clean up old/sticking team-icon divs (those without images)
    // This handles cases where encoding issues prevented direct replacement
    document.querySelectorAll('.team-icon').forEach(icon => {
        if (!icon.querySelector('img')) {
            icon.remove();
        }
    });
});
