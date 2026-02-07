function createFloatingText() {
    const container = document.body;

    const words = [
        'Torneo de Peciales',
        'Johan PECIAL'
    ];

    const numberOfTexts = 2

    for (let i = 0; i < numberOfTexts; i++) {
        const floatingText = document.createElement('div');
        floatingText.className = 'floating-text';
        floatingText.textContent = words[Math.floor(Math.random() * words.length)];

        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        floatingText.style.left = `${startX}%`;
        floatingText.style.top = `${startY}%`;

        const duration = 15 + Math.random() * 10;
        floatingText.style.animationDuration = `${duration}s`;
        const delay = Math.random() * 5;
        floatingText.style.animationDelay = `${delay}s`;

        container.appendChild(floatingText);
    }
}

document.addEventListener('DOMContentLoaded', createFloatingText);
