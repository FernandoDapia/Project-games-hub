import { EMOJIS, OPCIONES_PPT } from "./gameLogic.js";

export const crearElementosUI = (usuarioScore, cpuScore, onJugar, onReset) => {
    const divPpt = document.createElement("div");
    divPpt.className = "divPantallaJuego";

    const titulo = document.createElement("h2");
    titulo.textContent = "Piedra, Papel o Tijera";
    titulo.className = "h2-ppt";

    const marcadorDiv = document.createElement("div");
    marcadorDiv.className = "ppt-marcador";
    marcadorDiv.textContent = `Tu: ${usuarioScore} | CPU: ${cpuScore}`;

    const pElegir = document.createElement("p");
    pElegir.textContent = "Haz click en tu elección para jugar contra la CPU ";
    pElegir.className = "pElegir";

    const botonesDiv = document.createElement("div");
    botonesDiv.className = "botonesDiv";
    OPCIONES_PPT.forEach((opcion) => {
        const btn = document.createElement("button");
        btn.textContent = EMOJIS[opcion];
        btn.className = "ppt-btn-opcion";
        btn.addEventListener("click", () => onJugar(opcion));
        botonesDiv.append(btn);
    });

    const resultadoDiv = document.createElement("div");
    resultadoDiv.className = "ppt-resultado";
    resultadoDiv.textContent = "";

    const buttonReset = document.createElement("button");
    buttonReset.className = "boton-ppt-reset-volver";
    buttonReset.textContent = "Reset";
    buttonReset.addEventListener("click", onReset);

    const buttonVolver = document.createElement("button");
    buttonVolver.addEventListener("click", () => {
        divPpt.classList.remove("mostrar");
    });
    buttonVolver.className = "boton-ppt-reset-volver";
    buttonVolver.textContent = "Volver";

    const menuBotonesVolverReset = document.createElement("div");
    menuBotonesVolverReset.className = "menuBotonesVolRes";
    menuBotonesVolverReset.append(buttonVolver, buttonReset);

    divPpt.append(
        titulo,
        marcadorDiv,
        pElegir,
        botonesDiv,
        resultadoDiv,
        menuBotonesVolverReset
    );

    return { divPpt, marcadorDiv, resultadoDiv };
};
