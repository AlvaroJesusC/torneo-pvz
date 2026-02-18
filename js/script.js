document.addEventListener("DOMContentLoaded", () => {

    if (window.tournamentConfig) {
        initTournamentState();
    }

    // Los botones de editar y ganar fueron eliminados
    // Solo mantenemos el click en los equipos para futuras funcionalidades si es necesario
    document.querySelectorAll(".team").forEach(team => {
        team.addEventListener("click", (e) => {
            // Evitar que se active si se hace click en un botón (como el botón de info)
            if (e.target.closest("button")) return;

            // Aquí se puede agregar funcionalidad futura si es necesario
            // Por ahora solo está como placeholder
        });
    });

});

function handleWin(team) {
    const nameSpan = team.querySelector(".team-name");
    const teamName = nameSpan.textContent.trim();

    if (!teamName) return;

    const matchBox = team.closest(".match-box");
    if (!matchBox) return;

    const matchId = matchBox.id;

    matchBox.querySelectorAll(".team").forEach(t => {
        t.classList.remove("winner", "loser");
    });

    team.classList.add("winner");

    matchBox.querySelectorAll(".team").forEach(t => {
        if (t !== team) {
            t.classList.add("loser");
        }
    });

    advanceWinner(matchId, teamName);
}

function advanceWinner(fromMatchId, winnerName) {
    const nextSlots = document.querySelectorAll(`[data-from="${fromMatchId}"]`);

    nextSlots.forEach(slot => {
        const span = slot.querySelector(".team-name");
        if (!span) return;

        span.textContent = winnerName;
        slot.classList.remove("winner");
        slot.animate([
            { transform: "scale(1)", filter: "brightness(1.4)" },
            { transform: "scale(1)", filter: "brightness(1)" }
        ], { duration: 300 });

        // Agregar/actualizar botón de info al equipo que avanzó (habilitado)
        if (window.addInfoButtonToTeam) {
            window.addInfoButtonToTeam(slot, true);
        }
    });

    if (fromMatchId === "match-final") {
        const champSlot = document.querySelector(".champion-slot");
        if (champSlot) {
            champSlot.textContent = winnerName;
            champSlot.classList.add("winner");
        }
        setTimeout(() => {
            showVictoryModal(winnerName);
        }, 500);
    }

    resetFutureMatches(fromMatchId);
}

function resetFutureMatches(fromMatchId) {
    const affectedSlots = document.querySelectorAll(`[data-from="${fromMatchId}"]`);
    affectedSlots.forEach(slot => {
        slot.classList.remove("winner");
        const span = slot.querySelector(".team-name");
        if (!span) return;

        const parentMatch = slot.closest(".match-box");
        if (!parentMatch) return;

        const parentMatchId = parentMatch.id;
        const nextSlots = document.querySelectorAll(`[data-from="${parentMatchId}"]`);

        nextSlots.forEach(ns => {
            const nsSpan = ns.querySelector(".team-name");
            if (nsSpan) nsSpan.textContent = "—";
            ns.classList.remove("winner");

            // Eliminar botón de info cuando se resetea
            const controls = ns.querySelector(".team-controls");
            if (controls) {
                const infoBtn = controls.querySelector(".info-btn");
                if (infoBtn) {
                    infoBtn.remove();
                }
            }
        });
    });
}

function showVictoryModal(championName) {
    const modal = document.getElementById('victory-modal');
    const championNameEl = document.getElementById('champion-name');
    const championLogoEl = document.getElementById('champion-logo');

    if (championNameEl) championNameEl.textContent = championName;

    // Get team logo from team-info-data
    if (championLogoEl && window.teamInfoData && window.teamInfoData[championName]) {
        championLogoEl.src = window.teamInfoData[championName].logo;
        championLogoEl.style.display = 'block';
    } else if (championLogoEl) {
        championLogoEl.style.display = 'none';
    }

    // Generate credits content
    generateCredits();

    if (modal) {
        modal.classList.add('show');

        // Sequence for smooth transition:
        // 1. Fade out current content (3.5s)
        // 2. Move elements + expand layout (4.0s)
        // 3. Fade in new layout

        setTimeout(() => {
            const trophy = modal.querySelector('.trophy-animation');
            const title = modal.querySelector('.victory-title');
            const championInfo = modal.querySelector('.champion-info');

            if (trophy) trophy.classList.add('content-hidden');
            if (title) title.classList.add('content-hidden');
            if (championInfo) championInfo.classList.add('content-hidden');
        }, 3500);

        setTimeout(() => {
            const victoryContent = modal.querySelector('.victory-content');
            const victoryColumns = document.getElementById('victory-columns');
            const championColumn = modal.querySelector('.champion-column');
            const championInfo = modal.querySelector('.champion-info');
            const creditsSection = document.getElementById('credits-section');

            // Move champion info AND trophy/title to left column
            const trophy = modal.querySelector('.trophy-animation');
            const title = modal.querySelector('.victory-title');

            if (championColumn) {
                if (trophy) {
                    championColumn.appendChild(trophy);
                    // Force reflow
                    void trophy.offsetWidth;
                    trophy.classList.remove('content-hidden');
                }
                if (title) {
                    championColumn.appendChild(title);
                    void title.offsetWidth;
                    title.classList.remove('content-hidden');
                }
                if (championInfo) {
                    championColumn.appendChild(championInfo);
                    void championInfo.offsetWidth;
                    championInfo.classList.remove('content-hidden');
                }
            }

            if (victoryContent) victoryContent.classList.add('show-columns');
            if (victoryColumns) victoryColumns.classList.add('visible');
            if (creditsSection) {
                creditsSection.classList.add('visible');
                // Start auto-scroll animation
                startCreditsScroll();

                // Play credits music
                const audio = document.getElementById('credits-audio');
                if (audio) {
                    audio.volume = 0.5; // Set volume level
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!
                            console.log("Audio playing successfully");
                        }).catch(error => {
                            console.error("Audio play failed:", error);
                            // Auto-play was prevented
                        });
                    }
                } else {
                    console.error("Audio element 'credits-audio' not found!");
                }
            }
        }, 4000);
    }
}

function generateCredits() {
    const creditsContent = document.getElementById('credits-content');
    if (!creditsContent || !window.teamInfoData) return;

    let html = `
        <div class="credits-group">
            <h3 class="credits-section-title">ORGANIZACIÓN</h3>
            <p class="credits-name">Error466</p>
            <p class="credits-name">AlvaroJesus</p>
            <p class="credits-name">Miguel</p>
            <p class="credits-name">Anyelus</p>
        </div>
    `;

    // Add all teams and their members
    html += `<div class="credits-group">
        <h3 class="credits-section-title">PARTICIPANTES</h3>
    `;

    for (const teamName in window.teamInfoData) {
        const team = window.teamInfoData[teamName];

        html += `
            <div class="credits-team">
                <h4 class="credits-team-name">${team.fullName}</h4>
        `;

        // Representatives
        if (team.representatives && team.representatives.length > 0) {
            html += `<p class="credits-role">Representantes:</p>`;
            team.representatives.forEach(rep => {
                html += `<p class="credits-member">${rep}</p>`;
            });
        }

        // Members
        if (team.members && team.members.length > 0) {
            html += `<p class="credits-role">Integrantes:</p>`;
            team.members.forEach(member => {
                html += `<p class="credits-member">${member}</p>`;
            });
        }

        // Substitutes
        if (team.substitutes && team.substitutes.length > 0) {
            html += `<p class="credits-role">Suplentes:</p>`;
            team.substitutes.forEach(sub => {
                html += `<p class="credits-member">${sub}</p>`;
            });
        }

        html += `</div>`;
    }

    html += `</div>`;

    html += `
        <div class="credits-group">
            <h3 class="credits-section-title">GRACIAS POR PARTICIPAR</h3>
            <p class="credits-name">PVZ GW2 Tournament 2024</p>
        </div>
    `;

    creditsContent.innerHTML = html;
}

function startCreditsScroll() {
    const creditsContent = document.getElementById('credits-content');
    if (!creditsContent) return;

    // Add scrolling animation class
    creditsContent.classList.add('scrolling');
}

function closeVictoryModal() {
    const modal = document.getElementById('victory-modal');
    if (modal) {
        modal.classList.remove('show');

        setTimeout(() => {
            modal.classList.remove('credits-mode');

            // Reset dynamic classes
            const victoryContent = modal.querySelector('.victory-content');
            if (victoryContent) victoryContent.classList.remove('show-columns');

            const victoryColumns = document.getElementById('victory-columns');
            if (victoryColumns) victoryColumns.classList.remove('visible');

            const creditsSection = document.getElementById('credits-section');
            if (creditsSection) creditsSection.classList.remove('visible');

            const trophy = modal.querySelector('.trophy-animation');
            const title = modal.querySelector('.victory-title');
            const championInfo = modal.querySelector('.champion-info');

            if (trophy) trophy.classList.remove('content-hidden');
            if (title) title.classList.remove('content-hidden');
            if (championInfo) championInfo.classList.remove('content-hidden');

        }, 300);
    }

    // Stop credits music
    const audio = document.getElementById('credits-audio');
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('victory-modal');
    if (e.target === modal) closeVictoryModal();
});

document.addEventListener("DOMContentLoaded", () => {
    // ... existing init code ...
    if (window.tournamentConfig) {
        initTournamentState();

        // Controlar visibilidad del botón de créditos
        const creditsBtnContainer = document.querySelector(".credits-btn-container");
        if (creditsBtnContainer) {
            creditsBtnContainer.style.display = window.tournamentConfig.showCreditsButton ? "block" : "none";
        }
    }

    // Configurar botón de ver créditos
    const viewCreditsBtn = document.getElementById("view-credits-btn");
    if (viewCreditsBtn) {
        viewCreditsBtn.addEventListener("click", () => {
            showCreditsOnly();
        });
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVictoryModal();
});

function showCreditsOnly() {
    const modal = document.getElementById('victory-modal');

    // Generate credits content first
    generateCredits();

    if (modal) {
        // Add special class for credits-only mode
        modal.classList.add('show', 'credits-mode');

        // Ensure credits section is visible
        const creditsSection = document.getElementById('credits-section');
        if (creditsSection) {
            creditsSection.classList.add('visible');
            // Start auto-scroll animation
            startCreditsScroll();
        }

        // Play credits music
        const audio = document.getElementById('credits-audio');
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed", e));
        }
    }
}

function initTournamentState() {
    const config = window.tournamentConfig;
    const body = document.body;

    // 1. MODO ADMIN
    if (!config.adminMode) {
        body.classList.add('view-only');
    }

    // 2. APLICAR RESULTADOS
    if (config.matches) {
        config.matches.forEach(matchInfo => {
            const matchBox = document.getElementById(matchInfo.id);
            if (!matchBox) return;

            const teams = matchBox.querySelectorAll('.team');
            if (teams.length < 2) return;

            const teamTop = teams[0];
            const teamBottom = teams[1];

            // --- APLICAR SCORE ---
            const score1 = (matchInfo.team1_score !== undefined) ? matchInfo.team1_score : 0;
            const score2 = (matchInfo.team2_score !== undefined) ? matchInfo.team2_score : 0;

            updateTeamScore(teamTop, score1);
            updateTeamScore(teamBottom, score2);

            // --- APLICAR W/L ---
            const p1Win = matchInfo.team1_status && matchInfo.team1_status.toUpperCase() === 'W';
            const p2Win = matchInfo.team2_status && matchInfo.team2_status.toUpperCase() === 'W';

            if (!p1Win && !p2Win) return;

            let winnerNode = null;
            if (p1Win) winnerNode = teamTop;
            if (p2Win) winnerNode = teamBottom;

            if (winnerNode) {
                winnerNode.classList.add("winner");
                matchBox.querySelectorAll(".team").forEach(t => {
                    if (t !== winnerNode) t.classList.add("loser");
                });

                const winnerName = winnerNode.querySelector('.team-name').textContent.trim();
                advanceWinner(matchInfo.id, winnerName);
            }
        });
    }
}

function updateTeamScore(teamNode, score) {
    let scoreEl = teamNode.querySelector('.team-score');

    if (!scoreEl) {
        scoreEl = document.createElement('span');
        scoreEl.className = 'team-score';
        const nameEl = teamNode.querySelector('.team-name');
        if (nameEl.nextSibling) {
            teamNode.insertBefore(scoreEl, nameEl.nextSibling);
        } else {
            teamNode.appendChild(scoreEl);
        }
    }

    scoreEl.textContent = score;
}
