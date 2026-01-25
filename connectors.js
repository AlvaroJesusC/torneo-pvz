// Líneas Conectoras SVG Dinámicas
function drawConnectors() {
    const svg = document.querySelector('.bracket-connectors');
    if (!svg) return;

    // Limpiar conectores existentes
    svg.innerHTML = '';

    const container = document.querySelector('.app-container');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    // Función auxiliar para obtener la posición del borde derecho central de una caja
    function getMatchRightCenter(matchId) {
        const match = document.getElementById(matchId);
        if (!match) return null;
        const rect = match.getBoundingClientRect();
        return {
            x: rect.right - containerRect.left,
            y: rect.top - containerRect.top + rect.height / 2
        };
    }

    // Función para obtener la posición del borde izquierdo central de una caja
    function getMatchLeftCenter(matchId) {
        const match = document.getElementById(matchId);
        if (!match) return null;
        const rect = match.getBoundingClientRect();
        return {
            x: rect.left - containerRect.left,
            y: rect.top - containerRect.top + rect.height / 2
        };
    }

    // Dibujar línea recta
    function drawLine(x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'connector');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        svg.appendChild(line);
    }

    // Dibujar path de bracket (conecta dos partidos a uno)
    function drawBracket(match1Right, match2Right, targetLeft) {
        if (!match1Right || !match2Right || !targetLeft) return;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'connector');
        path.setAttribute('fill', 'none');

        // Punto medio horizontal entre los partidos de origen y destino
        const midX = (match1Right.x + targetLeft.x) / 2;
        // Punto medio vertical entre los dos partidos de origen
        const midY = (match1Right.y + match2Right.y) / 2;

        // Dibujar dos líneas que convergen
        const d = `
            M ${match1Right.x} ${match1Right.y} 
            L ${midX} ${match1Right.y} 
            L ${midX} ${midY} 
            L ${targetLeft.x} ${midY}
            M ${match2Right.x} ${match2Right.y} 
            L ${midX} ${match2Right.y} 
            L ${midX} ${midY}
        `;
        path.setAttribute('d', d);
        svg.appendChild(path);
    }

    // ===== CONECTORES DE PLAY-IN A CUARTOS =====
    const p1Right = getMatchRightCenter('match-p1');
    const p2Right = getMatchRightCenter('match-p2');
    const q1Left = getMatchLeftCenter('match-q1');
    const q3Left = getMatchLeftCenter('match-q3');

    // Conectar play-in 1 al segundo slot de cuartos 1
    if (p1Right && q1Left) {
        // Ajustar para conectar al slot inferior del match-q1
        const targetY = q1Left.y + 30; // Offset para el segundo equipo
        drawLine(p1Right.x, p1Right.y, q1Left.x, targetY);
    }

    // Conectar play-in 2 al segundo slot de cuartos 3
    if (p2Right && q3Left) {
        const targetY = q3Left.y + 30;
        drawLine(p2Right.x, p2Right.y, q3Left.x, targetY);
    }

    // ===== CONECTORES DE CUARTOS A SEMIFINALES =====
    const q1Right = getMatchRightCenter('match-q1');
    const q2Right = getMatchRightCenter('match-q2');
    const q3Right = getMatchRightCenter('match-q3');
    const q4Right = getMatchRightCenter('match-q4');
    const s1Left = getMatchLeftCenter('match-s1');
    const s2Left = getMatchLeftCenter('match-s2');

    drawBracket(q1Right, q2Right, s1Left);
    drawBracket(q3Right, q4Right, s2Left);

    // ===== CONECTORES DE SEMIFINALES A FINAL =====
    const s1Right = getMatchRightCenter('match-s1');
    const s2Right = getMatchRightCenter('match-s2');
    const finalLeft = getMatchLeftCenter('match-final');

    drawBracket(s1Right, s2Right, finalLeft);
}

// Dibujar conectores cuando la página carga y cuando se redimensiona
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(drawConnectors, 200); // Delay para asegurar que el layout esté listo
});

window.addEventListener('resize', drawConnectors);
