export const crearElementosUI = (modoJuego) => {
    const divPantallaTres = document.createElement("div");
    divPantallaTres.className = "divPantallaTres";

    const divTitulo = document.createElement("div");
    divTitulo.className = "div-titulo-tres";

    const titulo = document.createElement("h2");
    titulo.textContent = "TRES EN RAYA";

    const selectMode = document.createElement("select");
    selectMode.className = "select-mode";
    selectMode.innerHTML = `
    <option value="cpu-facil">PLAYER VS CPU - Fácil</option>
    <option value="cpu-dificil">PLAYER VS CPU - Difícil</option>
    <option value="2jugadores">2 PLAYERS</option>
  `;
    selectMode.value = modoJuego;

    const tableroDiv = document.createElement("div");
    tableroDiv.className = "tablero-tres";

    const infoTurno = document.createElement("div");
    infoTurno.className = "info-turno";

    const btnReiniciar = document.createElement("button");
    btnReiniciar.className = "btn-reiniciar";
    btnReiniciar.textContent = "Reiniciar Juego";

    const btnVolver = document.createElement("button");
    btnVolver.className = "btn-volver";
    btnVolver.textContent = "Volver al Menú";

    divTitulo.append(titulo, selectMode);
    divPantallaTres.append(
        divTitulo,
        tableroDiv,
        infoTurno,
        btnReiniciar,
        btnVolver
    );

    return {
        divPantallaTres,
        selectMode,
        tableroDiv,
        infoTurno,
        btnReiniciar,
        btnVolver,
    };
};
