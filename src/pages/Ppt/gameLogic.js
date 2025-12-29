export const OPCIONES_PPT = ["Piedra", "Papel", "Tijera"];
export const EMOJIS = { Piedra: "🗿", Papel: "📄", Tijera: "✂️" };

export const determinarGanador = (eleccionUsuario, eleccionCpu) => {
    if (eleccionUsuario === eleccionCpu) {
        return { resultado: "empate", mensaje: "¡EMPATE!" };
    }

    const ganador =
        (eleccionUsuario === "Piedra" && eleccionCpu === "Tijera") ||
        (eleccionUsuario === "Papel" && eleccionCpu === "Piedra") ||
        (eleccionUsuario === "Tijera" && eleccionCpu === "Papel");

    if (ganador) {
        return {
            resultado: "ganaste",
            mensaje: `¡Ganaste! La CPU eligió ${eleccionCpu}.`,
        };
    } else {
        return {
            resultado: "perdiste",
            mensaje: `¡Perdiste! La CPU eligió ${eleccionCpu}.`,
        };
    }
};
