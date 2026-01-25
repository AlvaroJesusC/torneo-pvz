document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // boton editar
    // =========================
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const team = btn.closest(".team");
            const nameSpan = team.querySelector(".team-name");
            const iconImg = btn.querySelector(".icon");

            const editing = nameSpan.isContentEditable;

            if (editing) {
                // Save mode: disable editing and switch back to pencil
                nameSpan.contentEditable = "false";
                iconImg.src = "assets/lapiz.svg";
            } else {
                // Edit mode: enable editing and switch to save icon
                nameSpan.contentEditable = "true";
                nameSpan.focus();
                iconImg.src = "assets/save.svg";
            }
        });
    });


    // =========================
    // boton ganar
    // =========================
    document.querySelectorAll(".win-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            handleWin(btn.closest(".team"));
        });
    });


    // =========================
    // click en equipo para ganar
    // =========================
    document.querySelectorAll(".team").forEach(team => {
        team.addEventListener("click", (e) => {
            if (e.target.closest("button")) return;

            const nameSpan = team.querySelector(".team-name");
            if (nameSpan.isContentEditable) return;

            handleWin(team);
        });
    });


    // =========================
    // manejador principal de victoria
    // =========================
    function handleWin(team) {
        const nameSpan = team.querySelector(".team-name");
        const teamName = nameSpan.textContent.trim();

        if (!teamName) return;

        const matchBox = team.closest(".match-box");
        if (!matchBox) return;

        const matchId = matchBox.id;

        // Clear previous winner/loser in match
        matchBox.querySelectorAll(".team").forEach(t => {
            t.classList.remove("winner", "loser");
        });

        // Mark winner
        team.classList.add("winner");

        // Mark loser(s)
        matchBox.querySelectorAll(".team").forEach(t => {
            if (t !== team) {
                t.classList.add("loser");
            }
        });

        advanceWinner(matchId, teamName);
    }


    // =========================
    // ADVANCE WINNER
    // =========================
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
        });

        // Champion
        if (fromMatchId === "match-final") {
            const champSlot = document.querySelector(".champion-slot");
            if (champSlot) {
                champSlot.textContent = winnerName;
                champSlot.classList.add("winner");
            }

            // Mostrar modal de victoria
            setTimeout(() => {
                showVictoryModal(winnerName);
            }, 500); // Pequeño delay para que se vea la animación del ganador primero
        }

        // Reset downstream matches if changed
        resetFutureMatches(fromMatchId);
    }


    // =========================
    // resetea futuros partidos
    // =========================
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
            });
        });
    }

});

// =========================
// modal de victoria
// =========================
function showVictoryModal(championName) {
    const modal = document.getElementById('victory-modal');
    const championNameEl = document.getElementById('champion-name');

    championNameEl.textContent = championName;
    modal.classList.add('show');
}

function closeVictoryModal() {
    const modal = document.getElementById('victory-modal');
    modal.classList.remove('show');
}

// cerrar modal al hacer click fuera del contenido
document.addEventListener('click', (e) => {
    const modal = document.getElementById('victory-modal');
    if (e.target === modal) {
        closeVictoryModal();
    }
});

// cerrar modal con tecla esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVictoryModal();
    }
});
