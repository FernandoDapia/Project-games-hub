import "./tresenraya.css";
import { obtenerDatosJuego, guardarDatosJuego } from "../../utils/storage.js";
import { verificarGanador } from "./gameLogic.js";
import { ejecutarTurnoCPU } from "./cpuPlayer.js";
import { crearElementosUI } from "./uiComponents.js";

export const initTresEnRaya = (divApp) => {
  const datosGuardados = obtenerDatosJuego("tresEnRaya");
  let tablero = datosGuardados?.tablero || Array(9).fill("");
  let turnoActual = datosGuardados?.turnoActual || "X";
  let modoJuego = datosGuardados?.modoJuego || "cpu-facil";

  const ui = crearElementosUI(modoJuego);

  const mostrarTablero = () => {
    ui.tableroDiv.innerHTML = "";
    tablero.forEach((celda, index) => {
      const buttonCelda = document.createElement("button");
      buttonCelda.className = "celda-tres";
      buttonCelda.textContent = celda;
      if (celda === "X") buttonCelda.classList.add("x");
      if (celda === "O") buttonCelda.classList.add("o");
      buttonCelda.onclick = () => realizarJugada(index);
      buttonCelda.disabled = celda !== "" || verificarGanador(tablero);
      ui.tableroDiv.appendChild(buttonCelda);
    });
    actualizarResultado();
  };

  const actualizarResultado = () => {
    const ganador = verificarGanador(tablero);
    if (ganador) {
      ui.infoTurno.textContent =
        ganador === "empate" ? "¡Empate!" : `¡Ganador: ${ganador}!`;
    } else {
      ui.infoTurno.textContent = `Turno de: ${turnoActual}`;
    }
  };

  const realizarJugada = (index) => {
    if (tablero[index] !== "" || verificarGanador(tablero)) return;

    tablero[index] = turnoActual;
    guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });

    if (!verificarGanador(tablero)) {
      turnoActual = turnoActual === "X" ? "O" : "X";
      guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
      mostrarTablero();

      if (modoJuego.startsWith("cpu-") && turnoActual === "O") {
        setTimeout(() => {
          turnoActual = ejecutarTurnoCPU(
            tablero,
            modoJuego,
            guardarDatosJuego,
            mostrarTablero
          );
        }, 500);
      }
    } else {
      mostrarTablero();
    }
  };

  const reiniciarJuego = () => {
    tablero = Array(9).fill("");
    turnoActual = "X";
    guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
    mostrarTablero();
  };

  ui.selectMode.addEventListener("change", () => {
    modoJuego = ui.selectMode.value;
    guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
    reiniciarJuego();
  });

  ui.btnReiniciar.addEventListener("click", reiniciarJuego);

  ui.btnVolver.addEventListener("click", () => {
    ui.divPantallaTres.classList.remove("mostrar");
    reiniciarJuego();
  });

  divApp.append(ui.divPantallaTres);
  mostrarTablero();
};
