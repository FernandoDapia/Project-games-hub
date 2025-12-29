import { buscarJugadaGanadora } from "./gameLogic.js";

export const jugadaCPUFacil = (tablero) => {
    const celdasVacias = tablero
        .map((celda, index) => (celda === "" ? index : null))
        .filter((index) => index !== null);
    return celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
};

export const jugadaCPUDificil = (tablero) => {
    const jugadaGanadora = buscarJugadaGanadora(tablero, "O");
    if (jugadaGanadora !== null) {
        return jugadaGanadora;
    }

    const jugadaBloqueo = buscarJugadaGanadora(tablero, "X");
    if (jugadaBloqueo !== null) {
        return jugadaBloqueo;
    }

    const esquinas = [0, 2, 6, 8].filter((index) => tablero[index] === "");
    if (esquinas.length > 0) {
        return esquinas[Math.floor(Math.random() * esquinas.length)];
    }

    if (tablero[4] === "") {
        return 4;
    }

    const celdasVacias = tablero
        .map((celda, index) => (celda === "" ? index : null))
        .filter((index) => index !== null);
    return celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
};

export const ejecutarTurnoCPU = (
    tablero,
    modoJuego,
    guardarDatosJuego,
    mostrarTablero
) => {
    const cpuIndex =
        modoJuego === "cpu-facil"
            ? jugadaCPUFacil(tablero)
            : jugadaCPUDificil(tablero);

    tablero[cpuIndex] = "O";
    const turnoActual = "X";
    guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
    mostrarTablero();
    return "X";
};
