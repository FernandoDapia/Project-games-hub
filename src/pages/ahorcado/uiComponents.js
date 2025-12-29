import { crearEstructuraDibujo } from "./drawingLogic.js";

export const crearElementosUI = () => {
    const divAhorcado = document.createElement("div");
    divAhorcado.className = "divPantallaAhorcado";

    const titulo = document.createElement("h2");
    titulo.textContent = "EL AHORCADO";
    titulo.className = "h2-ahorcado";

    const drawAhorcado = crearEstructuraDibujo();

    const pistaDiv = document.createElement("div");
    pistaDiv.className = "ahorcado-pista";

    const progresoDiv = document.createElement("div");
    progresoDiv.className = "ahorcado-progreso";

    const letrasErrDiv = document.createElement("div");
    letrasErrDiv.className = "ahorcado-letras-erroneas";

    const palabrasAdivinadasDiv = document.createElement("div");
    palabrasAdivinadasDiv.className = "palabras-adivinadas-score";

    const intentosDiv = document.createElement("div");
    intentosDiv.className = "ahorcado-intentos";

    const inputLetra = document.createElement("input");
    inputLetra.type = "text";
    inputLetra.maxLength = 1;
    inputLetra.className = "ahorcado-input-letra";
    inputLetra.placeholder = "Letra";
    inputLetra.disabled = true;

    const resultadoDiv = document.createElement("div");
    resultadoDiv.className = "ahorcado-resultado";

    const btnEmpezar = document.createElement("button");
    btnEmpezar.textContent = "Empezar";
    btnEmpezar.className = "ahorcado-btn-empezar";

    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente palabra";
    btnSiguiente.className = "ahorcado-btn-siguiente";

    const buttonVolver = document.createElement("button");
    buttonVolver.addEventListener("click", () => {
        divAhorcado.classList.remove("mostrar");
    });
    buttonVolver.className = "boton-ahorcado-volver";
    buttonVolver.textContent = "Volver";

    const divButtons = document.createElement("div");
    divButtons.className = "div-buttons";
    divButtons.append(btnEmpezar, btnSiguiente, buttonVolver);

    divAhorcado.append(
        titulo,
        drawAhorcado,
        pistaDiv,
        progresoDiv,
        letrasErrDiv,
        palabrasAdivinadasDiv,
        intentosDiv,
        resultadoDiv,
        inputLetra,
        divButtons
    );

    return {
        divAhorcado,
        pistaDiv,
        progresoDiv,
        letrasErrDiv,
        palabrasAdivinadasDiv,
        intentosDiv,
        inputLetra,
        resultadoDiv,
        btnEmpezar,
        btnSiguiente,
    };
};
