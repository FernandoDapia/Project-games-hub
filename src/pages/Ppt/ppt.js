import "./ppt.css";
import { obtenerDatosJuego, guardarDatosJuego, limpiarDatosJuego } from "../../utils/storage.js";

let usuarioScore = 0;
let cpuScore = 0;


export const initPpt = (divApp) => {
  const datosGuardadosPpt = obtenerDatosJuego("ppt");
  if (datosGuardadosPpt) {
    usuarioScore = datosGuardadosPpt.usuarioScore || 0;
    cpuScore = datosGuardadosPpt.cpuScore || 0;
  }
  const divPpt = document.createElement("div");
  divPpt.className = "divPantallaJuego";
  const titulo = document.createElement("h2");
  titulo.textContent = "Piedra, Papel o Tijera";
  titulo.className = "h2-ppt";
  divPpt.append(titulo);

  const marcadorDiv = document.createElement("div");
  marcadorDiv.className = "ppt-marcador";
  marcadorDiv.textContent = `Tu: ${usuarioScore} | CPU: ${cpuScore}`;
  const pElegir = document.createElement("p");
  pElegir.textContent = "Haz click en tu elección para jugar contra la CPU ";
  pElegir.className = "pElegir";

  const buttonReset = document.createElement("button");
  buttonReset.className = "boton-ppt-reset-volver";
  buttonReset.textContent = "Reset";
  buttonReset.addEventListener("click", () => {
    usuarioScore = 0;
    cpuScore = 0;
    resultadoDiv.textContent = "";
    marcadorDiv.textContent = `Tú: ${usuarioScore} | CPU: ${cpuScore}`;
    limpiarDatosJuego("ppt");
  });

  const opcionesPpt = ["Piedra", "Papel", "Tijera"];
  const emojis = { Piedra: "🗿", Papel: "📄", Tijera: "✂️" };
  const botonesDiv = document.createElement("div");
  botonesDiv.className = "botonesDiv";
  opcionesPpt.forEach((opcion) => {
    const btn = document.createElement("button");
    btn.textContent = emojis[opcion];
    btn.className = "ppt-btn-opcion";
    btn.addEventListener("click", () => jugar(opcion));
    botonesDiv.append(btn);
  });

  const resultadoDiv = document.createElement("div");
  resultadoDiv.className = "ppt-resultado";
  resultadoDiv.textContent = "";

  const buttonVolver = document.createElement("button");
  buttonVolver.addEventListener("click", () => {
    const buttonVolver = document.querySelector(".divPantallaJuego");
    buttonVolver.classList.remove("mostrar");
  });
  buttonVolver.className = "boton-ppt-reset-volver";
  buttonVolver.textContent = "Volver";

  const menuBotonesVolverReset = document.createElement("div");
  menuBotonesVolverReset.className = "menuBotonesVolRes";

  const jugar = (eleccionUsuario) => {
    const eleccionCpu = opcionesPpt[Math.floor(Math.random() * 3)];
    let resultado = "";
    if (eleccionUsuario === eleccionCpu) {
      resultado = "¡EMPATE!";
      resultadoDiv.classList.add("empateResultado");
      resultadoDiv.classList.remove("ppt-resultado");
      resultadoDiv.classList.remove("gasteResultado");
      resultadoDiv.classList.remove("perdisteResultado");
    } else if (
      (eleccionUsuario === "Piedra" && eleccionCpu === "Tijera") ||
      (eleccionUsuario === "Papel" && eleccionCpu === "Piedra") ||
      (eleccionUsuario === "Tijera" && eleccionCpu === "Papel")
    ) {
      resultado = `¡Ganaste! La CPU eligió ${eleccionCpu}.`;
      resultadoDiv.classList.add("gasteResultado");
      resultadoDiv.classList.remove("ppt-resultado");
      resultadoDiv.classList.remove("empateResultado");
      resultadoDiv.classList.remove("perdisteResultado");
      usuarioScore++;
    } else {
      resultado = `¡Perdiste! La CPU eligió ${eleccionCpu}.`;
      resultadoDiv.classList.add("perdisteResultado");
      resultadoDiv.classList.remove("ppt-resultado");
      resultadoDiv.classList.remove("empateResultado");
      resultadoDiv.classList.remove("gasteResultado");
      cpuScore++;
    }
    resultadoDiv.textContent = resultado;
    marcadorDiv.textContent = `Tú: ${usuarioScore} | CPU: ${cpuScore}`;
    guardarDatosJuego("ppt", { usuarioScore, cpuScore });
  };
  divPpt.append(marcadorDiv);
  divPpt.append(pElegir);
  divPpt.append(botonesDiv);
  divPpt.append(resultadoDiv);
  menuBotonesVolverReset.append(buttonVolver);
  menuBotonesVolverReset.append(buttonReset);
  divPpt.append(menuBotonesVolverReset);
  divApp.append(divPpt);
};