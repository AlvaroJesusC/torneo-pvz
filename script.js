document.addEventListener("DOMContentLoaded", () => {

    if (window.tournamentConfig) {
        initTournamentState();
    }
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const team = btn.closest(".team");
            const nameSpan = team.querySelector(".team-name");
            const iconImg = btn.querySelector(".icon");
            const editing = nameSpan.isContentEditable;

            if (editing) {
                nameSpan.contentEditable = "false";
                iconImg.src = "assets/lapiz.svg";
            } else {
                nameSpan.contentEditable = "true";
                nameSpan.focus();
                iconImg.src = "assets/save.svg";
            }
        });
    });

    document.querySelectorAll(".win-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            handleWin(btn.closest(".team"));
        });
    });
    document.querySelectorAll(".team").forEach(team => {
        team.addEventListener("click", (e) => {
            if (e.target.closest("button")) return;
            const nameSpan = team.querySelector(".team-name");
            if (nameSpan.contentEditable === "true") return;
            handleWin(team);
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
        });
    });
}

function showVictoryModal(championName) {
    const modal = document.getElementById('victory-modal');
    const championNameEl = document.getElementById('champion-name');
    if (championNameEl) championNameEl.textContent = championName;
    if (modal) modal.classList.add('show');
}

function closeVictoryModal() {
    const modal = document.getElementById('victory-modal');
    if (modal) modal.classList.remove('show');
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('victory-modal');
    if (e.target === modal) closeVictoryModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVictoryModal();
});

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
