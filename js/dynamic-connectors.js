// Dynamic Bracket Connectors
// This script generates SVG connectors that adapt to match box positions

function generateDynamicConnectors() {
    const svg = document.querySelector('.bracket-connectors');
    if (!svg) return;

    // Clear existing connectors
    svg.innerHTML = '';

    const container = document.querySelector('.bracket-container');
    const containerRect = container.getBoundingClientRect();

    // Helper function to get center Y position of a match box
    function getMatchCenter(matchId) {
        const matchBox = document.getElementById(matchId);
        if (!matchBox) return null;

        const rect = matchBox.getBoundingClientRect();
        const containerTop = containerRect.top;

        return {
            y: rect.top - containerTop + rect.height / 2,
            right: rect.right - containerRect.left,
            left: rect.left - containerRect.left
        };
    }

    // Create straight connector with right angles
    function createConnector(fromMatch, toMatch, fromX, toX) {
        const from = getMatchCenter(fromMatch);
        const to = getMatchCenter(toMatch);

        if (!from || !to) return;

        const midX = (fromX + toX) / 2;

        // Create path with straight lines
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        // Use straight lines (L command) instead of curves
        const d = `M ${fromX} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${toX} ${to.y}`;

        path.setAttribute('d', d);
        path.setAttribute('class', 'connector');
        path.setAttribute('fill', 'none');

        svg.appendChild(path);
    }

    // Ronda 1 to Ronda 2 connectors
    createConnector('match-r1-1', 'match-r2-1', 280, 340);
    createConnector('match-r1-2', 'match-r2-3', 280, 340);

    // Ronda 2 to Semifinales connectors
    createConnector('match-r2-1', 'match-s1', 620, 680);
    createConnector('match-r2-2', 'match-s1', 620, 680);
    createConnector('match-r2-3', 'match-s2', 620, 680);
    createConnector('match-r2-4', 'match-s2', 620, 680);

    // Semifinales to Final connectors
    createConnector('match-s1', 'match-final', 960, 1020);
    createConnector('match-s2', 'match-final', 960, 1020);
}

// Run on page load
document.addEventListener('DOMContentLoaded', generateDynamicConnectors);

// Re-generate on window resize
window.addEventListener('resize', generateDynamicConnectors);

// Re-generate after a short delay to ensure layout is stable
setTimeout(generateDynamicConnectors, 100);
