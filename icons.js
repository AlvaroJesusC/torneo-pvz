// Script para reemplazar emojis con iconos SVG
document.addEventListener('DOMContentLoaded', () => {
    // Reemplazar todos los botones de editar
    document.querySelectorAll('.edit-btn').forEach(btn => {
        if (btn.textContent.includes('✏️') || btn.textContent.includes('💾')) {
            btn.innerHTML = '<img src="lapiz.svg" class="icon" alt="Editar">';
        }
    });

    // Reemplazar todos los botones de check
    document.querySelectorAll('.win-btn').forEach(btn => {
        if (btn.textContent.includes('✔')) {
            btn.innerHTML = '<img src="check.svg" class="icon" alt="Ganador">';
        }
    });
});
