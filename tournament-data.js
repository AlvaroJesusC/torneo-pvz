const tournamentConfig = {
    adminMode: false, // false para ocultar botones (modo espectador)

    matches: [
        // --- RONDA 1 (Play-ins) ---
        {
            id: "match-p1",
            // Equipo 1
            team1_name: "Vaso de leche",
            team1_status: "L", team1_score: 0,
            // Equipo 2
            team2_name: "Delta Force",
            team2_status: "L", team2_score: 0
        },
        {
            id: "match-p2",
            // Equipo 1
            team1_name: "Reyes del Cementerio",
            team1_status: "L", team1_score: 0,
            // Equipo 2
            team2_name: "Héroes de la Huerta",
            team2_status: "L", team2_score: 0
        },

        // --- RONDA 2 (Cuartos de Final) ---
        {
            id: "match-q1",
            team1_desc: "Los Alquimistas", team1_status: "L", team1_score: 0,
            team2_desc: "Ganador P1", team2_status: "L", team2_score: 0
        },
        {
            id: "match-q2",
            team1_desc: "ROT CARTEL", team1_status: "L", team1_score: 0,
            team2_desc: "La Raza Dominante", team2_status: "L", team2_score: 0
        },
        {
            id: "match-q3",
            team1_desc: "JFRYZ", team1_status: "L", team1_score: 0,
            team2_desc: "Ganador P2", team2_status: "L", team2_score: 0
        },
        {
            id: "match-q4",
            team1_desc: "Al Qaeda", team1_status: "L", team1_score: 0,
            team2_desc: "Siege Front", team2_status: "L", team2_score: 0
        },

        // --- SEMIFINALES ---
        {
            id: "match-s1",
            team1_desc: "Ganador Q1", team1_status: "L", team1_score: 0,
            team2_desc: "Ganador Q2", team2_status: "L", team2_score: 0
        },
        {
            id: "match-s2",
            team1_desc: "Ganador Q3", team1_status: "L", team1_score: 0,
            team2_desc: "Ganador Q4", team2_status: "L", team2_score: 0
        },

        // --- GRAN FINAL ---
        {
            id: "match-final",
            team1_desc: "Finalista 1", team1_status: "L", team1_score: 0,
            team2_desc: "Finalista 2", team2_status: "L", team2_score: 0
        }
    ]
};

window.tournamentConfig = tournamentConfig;
