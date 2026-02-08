// Script para mostrar mensaje de torneo cancelado
document.addEventListener("DOMContentLoaded", () => {
    if (window.tournamentConfig && window.tournamentConfig.tournamentCancelled === 1) {
        showCancellationOverlay();
    }
});

function showCancellationOverlay() {
    // Crear overlay de cancelación
    const overlay = document.createElement('div');
    overlay.id = 'cancellation-overlay';
    overlay.className = 'cancellation-overlay';

    const message = document.createElement('div');
    message.className = 'cancellation-message';
    message.innerHTML = `
        <div class="cancellation-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#F2A600" d="m57.16 8.42l-52 104c-1.94 4.02-.26 8.85 3.75 10.79c1.08.52 2.25.8 3.45.81h104c4.46-.04 8.05-3.69 8.01-8.15a8.1 8.1 0 0 0-.81-3.45l-52-104a8.067 8.067 0 0 0-14.4 0"/><path fill="#FFCC32" d="m53.56 15.72l-48.8 97.4c-1.83 3.77-.25 8.31 3.52 10.14c.99.48 2.08.74 3.18.76h97.5a7.55 7.55 0 0 0 7.48-7.62a7.6 7.6 0 0 0-.78-3.28l-48.7-97.4a7.443 7.443 0 0 0-9.93-3.47a7.5 7.5 0 0 0-3.47 3.47"/><path fill="#424242" d="M64.36 34.02c4.6 0 8.3 3.7 8 8l-3.4 48c-.38 2.54-2.74 4.3-5.28 3.92a4.65 4.65 0 0 1-3.92-3.92l-3.4-48c-.3-4.3 3.4-8 8-8m0 64c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6s2.69-6 6-6" opacity=".2"/><linearGradient id="IconifyId19c3b800c9191da192" x1="68" x2="68" y1="-1808.36" y2="-1887.05" gradientTransform="matrix(1 0 0 -1 -3.64 -1776.09)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#424242"/><stop offset="1" stop-color="#212121"/></linearGradient><path fill="url(#IconifyId19c3b800c9191da192)" d="M64.36 34.02c4.6 0 8.3 3.7 8 8l-3.4 48c-.38 2.54-2.74 4.3-5.28 3.92a4.65 4.65 0 0 1-3.92-3.92l-3.4-48c-.3-4.3 3.4-8 8-8"/><linearGradient id="IconifyId19c3b800c9191da193" x1="64.36" x2="64.36" y1="-1808.36" y2="-1887.05" gradientTransform="matrix(1 0 0 -1 0 -1772.11)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#424242"/><stop offset="1" stop-color="#212121"/></linearGradient><circle cx="64.36" cy="104.02" r="6" fill="url(#IconifyId19c3b800c9191da193)"/><path fill="#FFF170" d="M53.56 23.02c-1.2 1.5-21.4 41-21.4 41s-1.8 3 .7 4.7c2.3 1.6 4.4-.3 5.3-1.8s19.2-36.9 19.9-38.6c.6-1.87.18-3.91-1.1-5.4c-1.3-1.2-2.6-1-3.4.1"/><circle cx="31.36" cy="75.33" r="3.3" fill="#FFF170"/></svg>
        </div>
        <h1 class="cancellation-title">TORNEO CANCELADO</h1>
        <p class="cancellation-subtitle">El torneo ha sido cancelado temporalmente o 
        hasta nuevo aviso
        PECIALES XD</p>
        <p class="cancellation-subtitle"> A ver que deciden o ya fue nose xd</p>
        <p class="cancellation-subtitle"> Johan Pecial</p>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);

    // Agregar estilos dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        .cancellation-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            animation: fadeIn 0.5s ease-in-out;
        }
        
        .cancellation-message {
            text-align: center;
            padding: 60px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            border: 3px solid #e94560;
            box-shadow: 0 20px 60px rgba(233, 69, 96, 0.5);
            animation: slideDown 0.6s ease-out;
        }
        
        .cancellation-icon {
            margin-bottom: 20px;
            animation: pulse 2s infinite;
        }
        
        .cancellation-icon svg {
            width: 120px;
            height: 120px;
            filter: drop-shadow(0 0 20px rgba(242, 166, 0, 0.6));
        }
        
        .cancellation-title {
            font-size: 72px;
            font-weight: 900;
            color: #e94560;
            margin: 0;
            text-shadow: 0 0 20px rgba(233, 69, 96, 0.8);
            letter-spacing: 8px;
            font-family: 'Outfit', sans-serif;
        }
        
        .cancellation-subtitle {
            font-size: 24px;
            color: #a8a8a8;
            margin-top: 20px;
            font-family: 'Outfit', sans-serif;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @media (max-width: 768px) {
            .cancellation-message {
                padding: 40px 20px;
                margin: 20px;
            }
            
            .cancellation-icon svg {
                width: 80px;
                height: 80px;
            }
            
            .cancellation-title {
                font-size: 36px;
                letter-spacing: 4px;
            }
            
            .cancellation-subtitle {
                font-size: 16px;
            }
        }
    `;
    document.head.appendChild(style);
}
