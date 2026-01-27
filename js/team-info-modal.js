
function openTeamInfoModal(teamName) {
    const teamData = window.teamInfoData[teamName];

    if (!teamData) {
        console.warn('No se encontró información para el equipo:', teamName);
        return;
    }

    const modal = document.getElementById('team-info-modal');
    const modalContent = modal.querySelector('.team-info-content');

    // Construir el HTML del modal
    // Separar el nombre del equipo y la abreviatura
    let displayName = teamData.fullName;
    let abbreviation = '';

    // Buscar texto entre paréntesis al final
    const match = teamData.fullName.match(/^(.+?)\s*\(([^)]+)\)$/);
    if (match) {
        displayName = match[1].trim();
        abbreviation = `(${match[2]})`;
    }

    let html = `
        <button class="close-team-modal" onclick="closeTeamInfoModal()">✕</button>
        <div class="team-info-header">
            <div class="team-info-logo">
                <img src="${teamData.logo}" alt="Logo ${teamData.fullName}">
            </div>
            <h2 class="team-info-title">
                ${displayName}
                ${abbreviation ? `<span class="team-abbreviation">${abbreviation}</span>` : ''}
            </h2>
        </div>
        <div class="team-info-body">
    `;

    // Representantes
    if (teamData.representatives && teamData.representatives.length > 0) {
        html += `
            <div class="team-info-section">
                <h3 class="section-label">Representantes</h3>
                <ul class="members-list">
                    ${teamData.representatives.map(rep => `<li>${rep}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Integrantes
    if (teamData.members && teamData.members.length > 0) {
        html += `
            <div class="team-info-section">
                <h3 class="section-label">Integrantes</h3>
                <ul class="members-list">
                    ${teamData.members.map(member => `<li>${member}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Suplentes
    if (teamData.substitutes && teamData.substitutes.length > 0) {
        html += `
            <div class="team-info-section">
                <h3 class="section-label">Suplentes</h3>
                <ul class="members-list">
                    ${teamData.substitutes.map(sub => `<li>${sub}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    html += `</div>`;

    modalContent.innerHTML = html;
    modal.classList.add('show');

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeTeamInfoModal() {
    const modal = document.getElementById('team-info-modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Cerrar modal al hacer click fuera
document.addEventListener('click', function (e) {
    const modal = document.getElementById('team-info-modal');
    if (e.target === modal) {
        closeTeamInfoModal();
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeTeamInfoModal();
    }
});

// Función reutilizable para agregar botón de info a un equipo
function addInfoButtonToTeam(teamElement) {
    const teamNameSpan = teamElement.querySelector('.team-name');
    if (!teamNameSpan) return;

    const teamName = teamNameSpan.textContent.trim();

    // Verificar si existe información para este equipo
    if (window.teamInfoData && window.teamInfoData[teamName]) {
        const controls = teamElement.querySelector('.team-controls');
        if (!controls) return;

        // Verificar si ya tiene un botón de info
        if (controls.querySelector('.info-btn')) return;

        // Crear botón de info
        const infoBtn = document.createElement('button');
        infoBtn.className = 'info-btn';
        infoBtn.title = 'Ver información del equipo';
        infoBtn.innerHTML = '<img src="assets/info.svg" class="info-icon" alt="Info">';

        // Agregar evento click
        infoBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openTeamInfoModal(teamName);
        });

        // Insertar el botón en team-controls
        controls.insertBefore(infoBtn, controls.firstChild);
    }
}

// Agregar botones de info a todos los nombres de equipos al cargar
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los elementos .team que NO sean winner-slot
    const teams = document.querySelectorAll('.team:not(.winner-slot)');

    teams.forEach(team => {
        addInfoButtonToTeam(team);
    });
});

// Hacer la función global para que script.js pueda usarla
window.addInfoButtonToTeam = addInfoButtonToTeam;
