document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        if (btn.textContent.includes('✏️') || btn.textContent.includes('💾')) {
            btn.innerHTML = '<img src="lapiz.svg" class="icon" alt="Editar">';
        }
    });

    document.querySelectorAll('.win-btn').forEach(btn => {
        if (btn.textContent.includes('✔')) {
            btn.innerHTML = '<img src="check.svg" class="icon" alt="Ganador">';
        }
    });
});
