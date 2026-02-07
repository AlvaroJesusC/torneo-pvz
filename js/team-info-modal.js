
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

// Función para mostrar notificación de botón deshabilitado
function showDisabledInfoNotification() {
    // Verificar si ya existe la notificación
    let notification = document.getElementById('disabled-info-notification');

    if (!notification) {
        // Crear la notificación
        notification = document.createElement('div');
        notification.id = 'disabled-info-notification';
        notification.className = 'disabled-info-notification';
        notification.innerHTML = `
            <div class="notification-icon">
                <img src="assets/lock.svg" alt="Bloqueado" class="lock-icon">
            </div>
            <div class="notification-title">Información No Disponible</div>
            <p class="notification-message">
                Informacion deshabilitada, se debe confirmar el resultado del enfrentamiento anterior.
            </p>
        `;
        document.body.appendChild(notification);
    }

    // Mostrar la notificación
    notification.classList.add('show');

    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Función para verificar si un equipo tiene resultado en tournament-data
function hasMatchResult(teamElement) {
    // Si es un winner-slot, verificar si ya tiene un ganador asignado
    if (teamElement.classList.contains('winner-slot')) {
        const teamNameSpan = teamElement.querySelector('.team-name');
        const teamName = teamNameSpan ? teamNameSpan.textContent.trim() : '';

        // Si el nombre es genérico (Ganador X, Finalista X), no tiene resultado
        if (teamName.startsWith('Ganador') || teamName.startsWith('Finalista') || teamName === '—' || teamName === '') {
            return false;
        }

        // Si tiene un nombre real de equipo, tiene resultado
        return true;
    }

    // Para equipos normales (no winner-slot), siempre tienen resultado
    return true;
}

// Función reutilizable para agregar botón de info a un equipo
function addInfoButtonToTeam(teamElement, forceEnabled = false) {
    const teamNameSpan = teamElement.querySelector('.team-name');
    if (!teamNameSpan) return;

    const teamName = teamNameSpan.textContent.trim();
    const controls = teamElement.querySelector('.team-controls');
    if (!controls) return;

    // Verificar si ya tiene un botón de info
    let infoBtn = controls.querySelector('.info-btn');

    // Si no existe, crearlo
    if (!infoBtn) {
        infoBtn = document.createElement('button');
        infoBtn.className = 'info-btn';
        infoBtn.title = 'Ver información del equipo';
        infoBtn.innerHTML = '<img src="assets/info.svg" class="info-icon" alt="Info">';

        // Insertar el botón en team-controls
        controls.insertBefore(infoBtn, controls.firstChild);
    }

    // Determinar si debe estar habilitado
    const hasResult = forceEnabled || hasMatchResult(teamElement);
    const hasTeamInfo = window.teamInfoData && window.teamInfoData[teamName];

    if (hasResult && hasTeamInfo) {
        // Habilitar el botón
        infoBtn.classList.remove('disabled');
        infoBtn.style.pointerEvents = 'auto';
        infoBtn.title = 'Ver información del equipo';

        // Remover eventos anteriores y agregar el nuevo
        const newBtn = infoBtn.cloneNode(true);
        infoBtn.parentNode.replaceChild(newBtn, infoBtn);

        newBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            openTeamInfoModal(teamName);
        });
    } else {
        // Deshabilitar el botón
        infoBtn.classList.add('disabled');
        infoBtn.style.pointerEvents = 'auto'; // Permitir clicks para mostrar notificación
        infoBtn.title = 'Información disponible cuando se registre el resultado';

        // Remover eventos anteriores y agregar evento para mostrar notificación
        const newBtn = infoBtn.cloneNode(true);
        infoBtn.parentNode.replaceChild(newBtn, infoBtn);

        newBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            showDisabledInfoNotification();
        });
    }
}

// Agregar botones de info a todos los nombres de equipos al cargar
document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar TODOS los elementos .team (incluyendo winner-slots)
    const teams = document.querySelectorAll('.team');

    teams.forEach(team => {
        addInfoButtonToTeam(team);
    });
});

// Hacer la función global para que script.js pueda usarla
window.addInfoButtonToTeam = addInfoButtonToTeam;
