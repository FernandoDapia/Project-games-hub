export const seleccionarPalabra = (palabrasRestantes) => {
    if (palabrasRestantes.length === 0) return null;
    const posicionAleatoriaPalabra = Math.floor(
        Math.random() * palabrasRestantes.length
    );
    const seleccionPalabra = palabrasRestantes[posicionAleatoriaPalabra];
    palabrasRestantes.splice(posicionAleatoriaPalabra, 1);
    return seleccionPalabra;
};

export const mostrarProgreso = (palabraSecreta, letrasAdivinadas) => {
    return palabraSecreta
        .split("")
        .map((letra) => {
            if (letrasAdivinadas.includes(letra)) {
                return letra;
            } else {
                return " _ ";
            }
        })
        .join("");
};

export const procesarLetra = (letra, state) => {
    const { palabraSecreta, letrasAdivinadas, letrasErroneas, intentosRestantes } = state;

    if (!letra.match(/[A-ZÑ]/) || letra.length !== 1) return state;
    if (letrasAdivinadas.includes(letra) || letrasErroneas.includes(letra)) return state;

    const nuevasLetrasAdivinadas = [...letrasAdivinadas];
    const nuevasLetrasErroneas = [...letrasErroneas];
    let nuevosIntentos = intentosRestantes;

    if (palabraSecreta.includes(letra)) {
        nuevasLetrasAdivinadas.push(letra);
    } else {
        nuevasLetrasErroneas.push(letra);
        nuevosIntentos--;
    }

    return {
        ...state,
        letrasAdivinadas: nuevasLetrasAdivinadas,
        letrasErroneas: nuevasLetrasErroneas,
        intentosRestantes: nuevosIntentos,
    };
};

export const verificarResultado = (palabraSecreta, letrasAdivinadas, intentosRestantes) => {
    const progreso = mostrarProgreso(palabraSecreta, letrasAdivinadas);
    if (!progreso.includes("_")) return "ganado";
    if (intentosRestantes === 0) return "perdido";
    return "jugando";
};
