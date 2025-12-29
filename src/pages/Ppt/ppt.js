import "./ppt.css";
import { obtenerDatosJuego, guardarDatosJuego, limpiarDatosJuego } from "../../utils/storage.js";
import { OPCIONES_PPT, determinarGanador } from "./gameLogic.js";
import { crearElementosUI } from "./uiComponents.js";

let usuarioScore = 0;
let cpuScore = 0;

export const initPpt = (divApp) => {
  const datosGuardadosPpt = obtenerDatosJuego("ppt");
  if (datosGuardadosPpt) {
    usuarioScore = datosGuardadosPpt.usuarioScore || 0;
    cpuScore = datosGuardadosPpt.cpuScore || 0;
  }

  const jugar = (eleccionUsuario) => {
    const eleccionCpu = OPCIONES_PPT[Math.floor(Math.random() * 3)];
    const { resultado, mensaje } = determinarGanador(eleccionUsuario, eleccionCpu);

    ui.resultadoDiv.classList.remove("ppt-resultado", "empateResultado", "gasteResultado", "perdisteResultado");

    if (resultado === "empate") {
      ui.resultadoDiv.classList.add("empateResultado");
    } else if (resultado === "ganaste") {
      ui.resultadoDiv.classList.add("gasteResultado");
      usuarioScore++;
    } else {
      ui.resultadoDiv.classList.add("perdisteResultado");
      cpuScore++;
    }

    ui.resultadoDiv.textContent = mensaje;
    ui.marcadorDiv.textContent = `Tú: ${usuarioScore} | CPU: ${cpuScore}`;
    guardarDatosJuego("ppt", { usuarioScore, cpuScore });
  };

  const resetear = () => {
    usuarioScore = 0;
    cpuScore = 0;
    ui.resultadoDiv.textContent = "";
    ui.marcadorDiv.textContent = `Tú: ${usuarioScore} | CPU: ${cpuScore}`;
    limpiarDatosJuego("ppt");
  };

  const ui = crearElementosUI(usuarioScore, cpuScore, jugar, resetear);
  divApp.append(ui.divPpt);
};