export const LINEAS_GANADORAS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export const verificarGanador = (tablero) => {
    for (const linea of LINEAS_GANADORAS) {
        const [a, b, c] = linea;
        if (
            tablero[a] &&
            tablero[a] === tablero[b] &&
            tablero[a] === tablero[c]
        ) {
            return tablero[a];
        }
    }

    return tablero.includes("") ? null : "empate";
};

export const buscarJugadaGanadora = (tablero, jugador) => {
    for (const linea of LINEAS_GANADORAS) {
        const [a, b, c] = linea;
        const valores = [tablero[a], tablero[b], tablero[c]];
        const cantidadJugador = valores.filter((v) => v === jugador).length;
        const cantidadVacias = valores.filter((v) => v === "").length;

        if (cantidadJugador === 2 && cantidadVacias === 1) {
            if (tablero[a] === "") return a;
            if (tablero[b] === "") return b;
            if (tablero[c] === "") return c;
        }
    }

    return null;
};
