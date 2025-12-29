import "./ahorcado.css";
import { obtenerDatosJuego, guardarDatosJuego, limpiarDatosJuego } from "../../utils/storage.js";
import { PALABRAS } from "./wordData.js";
import { seleccionarPalabra, mostrarProgreso, procesarLetra, verificarResultado } from "./gameLogic.js";
import { resetDraw, actualizarDibujo, dibujarEstadoGuardado } from "./drawingLogic.js";
import { crearElementosUI } from "./uiComponents.js";

let palabraSecreta, pistaActual, letrasAdivinadas, letrasErroneas, intentosRestantes, palabrasAcertadas, palabrasRestantes;

const inicializarEstado = (datos) => {
  palabraSecreta = datos?.palabraSecreta || "";
  pistaActual = datos?.pistaActual || "";
  letrasAdivinadas = datos?.letrasAdivinadas || [];
  letrasErroneas = datos?.letrasErroneas || [];
  intentosRestantes = datos?.intentosRestantes || 10;
  palabrasAcertadas = datos?.palabrasAcertadas || 0;
  palabrasRestantes = [...PALABRAS];
};

export const initAhorcado = (divApp) => {
  const datosGuardados = obtenerDatosJuego("ahorcado");
  inicializarEstado(datosGuardados);
  const ui = crearElementosUI();

  const actualizarUI = () => {
    ui.progresoDiv.textContent = mostrarProgreso(palabraSecreta, letrasAdivinadas);
    ui.letrasErrDiv.textContent = "Letras incorrectas: " + letrasErroneas.join(", ");
    ui.intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
    ui.palabrasAdivinadasDiv.textContent = `Palabras acertadas: ${palabrasAcertadas} de 40.`;
  };

  const guardarEstado = () => guardarDatosJuego("ahorcado", { palabraSecreta, pistaActual, letrasAdivinadas, letrasErroneas, intentosRestantes, palabrasAcertadas });

  const configurarNuevaPalabra = (seleccion, esInicio = false) => {
    if (!seleccion) {
      ui.btnSiguiente.disabled = true;
      ui.resultadoDiv.textContent = "¡No quedan palabras!";
      ui.inputLetra.disabled = true;
      [ui.progresoDiv, ui.letrasErrDiv, ui.intentosDiv, ui.pistaDiv].forEach(el => el.textContent = "");
      limpiarDatosJuego("ahorcado");
      palabrasRestantes = [...PALABRAS];
      return;
    }
    palabraSecreta = seleccion.palabra;
    pistaActual = seleccion.pista;
    letrasAdivinadas = [];
    letrasErroneas = [];
    intentosRestantes = 10;
    ui.resultadoDiv.textContent = "";
    ui.inputLetra.disabled = false;
    ui.pistaDiv.innerHTML = esInicio ? `Pista: <br> ${pistaActual}` : `Pista: ${pistaActual}`;
    actualizarUI();
    resetDraw();
    guardarEstado();
  };

  ui.btnEmpezar.addEventListener("click", () => {
    palabrasRestantes = [...PALABRAS];
    configurarNuevaPalabra(seleccionarPalabra(palabrasRestantes), true);
  });
  ui.btnSiguiente.addEventListener("click", () => configurarNuevaPalabra(seleccionarPalabra(palabrasRestantes)));

  ui.inputLetra.addEventListener("keyup", (e) => {
    if (e.key !== "Enter" || ui.inputLetra.disabled) return;
    const letra = ui.inputLetra.value.toUpperCase();
    ui.inputLetra.value = "";

    const nuevoEstado = procesarLetra(letra, { palabraSecreta, letrasAdivinadas, letrasErroneas, intentosRestantes });

    letrasAdivinadas = nuevoEstado.letrasAdivinadas;
    letrasErroneas = nuevoEstado.letrasErroneas;
    intentosRestantes = nuevoEstado.intentosRestantes;

    actualizarDibujo(intentosRestantes);
    actualizarUI();

    const resultado = verificarResultado(palabraSecreta, letrasAdivinadas, intentosRestantes);
    if (resultado === "ganado") {
      ui.resultadoDiv.textContent = "¡TE SALVASTE!";
      ui.inputLetra.disabled = true;
      ui.btnSiguiente.disabled = false;
      palabrasAcertadas++;
      ui.palabrasAdivinadasDiv.textContent = `Palabras acertadas: ${palabrasAcertadas} de 40.`;
    } else if (resultado === "perdido") {
      ui.resultadoDiv.textContent = `¡Perdiste! La palabra era: ${palabraSecreta}`;
      ui.inputLetra.disabled = true;
      ui.btnSiguiente.disabled = false;
    }
    guardarEstado();
  });

  divApp.append(ui.divAhorcado);

  if (datosGuardados && palabraSecreta) {
    ui.pistaDiv.innerHTML = `Pista: <br> ${pistaActual}`;
    ui.inputLetra.disabled = false;
    actualizarUI();
    dibujarEstadoGuardado(intentosRestantes);
  }
};

