//Hola si estas viendo esto, es porque entraste a inspeccionar y ver los archivos
//seguro diras que es esto, simplemente como no queria agregar una base de datos en la nube
//puse un archivo local del proyecto que al cambiar ciertos valores y aplique y despliegue los cambios
//se vean reflejados en los resultados del torneo en la pagina web, solo eso.  

const tournamentConfig = {
    adminMode: true,
    tournamentCancelled: 1, // 0 = Torneo activo, 1 = Torneo cancelado
    matches: [
        // --- CUARTOS DE FINAL ---
        {
            id: "match-q1",
            team1_name: "Vaso de leche", team1_status: "L", team1_score: 0,
            team2_name: "Los Alquimistas", team2_status: "L", team2_score: 0
        },
        {
            id: "match-q2",
            team1_name: "Reyes del Cementerio", team1_status: "L", team1_score: 0,
            team2_name: "Héroes de la Huerta", team2_status: "L", team2_score: 0
        },
        {
            id: "match-q3",
            team1_name: "JFRYZ", team1_status: "L", team1_score: 0,
            team2_name: "—", team2_status: "L", team2_score: 0
        },
        {
            id: "match-q4",
            team1_name: "Al Qaeda", team1_status: "L", team1_score: 0,
            team2_name: "Siege Front", team2_status: "L", team2_score: 0
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
