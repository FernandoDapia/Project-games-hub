import "./tresenraya.css";
import { obtenerDatosJuego, guardarDatosJuego, limpiarDatosJuego } from "../../utils/storage.js";

export const initTresEnRaya = (divApp) => {
  const datosGuardados = obtenerDatosJuego("tresEnRaya");
  let tablero = datosGuardados?.tablero || Array(9).fill("");
  let turnoActual = datosGuardados?.turnoActual || "X";
  let modoJuego = datosGuardados?.modoJuego || "cpu-facil";

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

  const mostrarTablero = () => {
    tableroDiv.innerHTML = "";
    tablero.forEach((celda, index) => {
      const buttonCelda = document.createElement("button");
      buttonCelda.className = "celda-tres";
      buttonCelda.textContent = celda;
      if (celda === "X") buttonCelda.classList.add("x");
      if (celda === "O") buttonCelda.classList.add("o");
      buttonCelda.onclick = () => realizarJugada(index);
      buttonCelda.disabled = celda !== "" || verificarGanador();
      tableroDiv.appendChild(buttonCelda);
    });
    actualizarResultado();
  };

  const actualizarResultado = () => {
    const ganador = verificarGanador();
    if (ganador) {
      infoTurno.textContent =
        ganador === "empate" ? "¡Empate!" : `¡Ganador: ${ganador}!`;
    } else {
      infoTurno.textContent = `Turno de: ${turnoActual}`;
    }
  };

  const realizarJugada = (index) => {
    if (tablero[index] !== "" || verificarGanador()) return;

    tablero[index] = turnoActual;
    guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });

    if (!verificarGanador()) {
      turnoActual = turnoActual === "X" ? "O" : "X";
      guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
      mostrarTablero();

      if (modoJuego.startsWith("cpu-") && turnoActual === "O") {
        setTimeout(() => {
          const cpuIndex =
            modoJuego === "cpu-facil" ? jugadaCPUFacil() : jugadaCPUDificil();

          tablero[cpuIndex] = turnoActual;
          turnoActual = "X";
          guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
          mostrarTablero();
        }, 500);
      }
    } else {
      mostrarTablero();
    }
  };

  const verificarGanador = () => {
    const lineasGanadoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const linea of lineasGanadoras) {
      const [a, b, c] = linea;
      if (
        tablero[a] &&
        tablero[a] === tablero[b] &&
        tablero[a] === tablero[c]
      ) {
        return tablero[a];
      }
    }

    return tablero.includes("") ? null : "empate";
  };

  const jugadaCPUFacil = () => {
    const celdasVacias = tablero
      .map((celda, index) => (celda === "" ? index : null))
      .filter((index) => index !== null);
    return celdasVacias[Math.floor(Math.random() * celdasVacias.length)];
  };

  const jugadaCPUDificil = () => {
    const jugadaBloqueo = buscarJugadaGanadora("X");
    if (jugadaBloqueo !== null) {
      return jugadaBloqueo;
    }
    const esquinas = [0, 2, 4, 6, 8].filter((index) => tablero[index] === "");
    if (esquinas.length > 0) {
      return esquinas[Math.floor(Math.random() * esquinas.length)];
    }
  };

  const buscarJugadaGanadora = (jugador) => {
    const lineasGanadoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const linea of lineasGanadoras) {
      const [a, b, c] = linea;
      const valores = [tablero[a], tablero[b], tablero[c]];
      const cantidadJugador = valores.filter((v) => v === jugador).length;
      const cantidadVacias = valores.filter((v) => v === "").length;

      // Si hay 2 fichas del jugador y 1 vacía, es una amenaza
      if (cantidadJugador === 2 && cantidadVacias === 1) {
        if (tablero[a] === "") return a;
        if (tablero[b] === "") return b;
        if (tablero[c] === "") return c;
      }
    }

    return null;
  };
  const calcularMejorJugada = (tableroPrueba, jugador, nivel = 0) => {
    const celdasVacias = tableroPrueba
      .map((celda, index) => (celda === "" ? index : null))
      .filter((index) => index !== null);

    const ganador = verificarGanador();
    if (ganador === "X") return { puntuacion: -10 + nivel };
    if (ganador === "O") return { puntuacion: 10 - nivel };
    if (celdasVacias.length === 0) return { puntuacion: 0 };

    const jugadas = celdasVacias.map((index) => {
      tableroPrueba[index] = jugador;
      const puntuacion = calcularMejorJugada(
        tableroPrueba,
        jugador === "O" ? "X" : "O",
        nivel + 1
      ).puntuacion;
      tableroPrueba[index] = "";
      return { index, puntuacion };
    });

    return jugador === "O"
      ? jugadas.reduce(
          (mejor, jugada) =>
            jugada.puntuacion > mejor.puntuacion ? jugada : mejor,
          { puntuacion: -Infinity }
        )
      : jugadas.reduce(
          (mejor, jugada) =>
            jugada.puntuacion < mejor.puntuacion ? jugada : mejor,
          { puntuacion: Infinity }
        );
  };

  const reiniciarJuego = () => {
    tablero = Array(9).fill("");
    turnoActual = "X";
    guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
    mostrarTablero();
  };

  selectMode.addEventListener("change", () => {
    modoJuego = selectMode.value;
    guardarDatosJuego("tresEnRaya", { tablero, turnoActual, modoJuego });
    reiniciarJuego();
  });

  btnReiniciar.addEventListener("click", reiniciarJuego);

  btnVolver.addEventListener("click", () => {
    divPantallaTres.classList.remove("mostrar");
    reiniciarJuego();
  });

  divTitulo.append(titulo, selectMode);
  divPantallaTres.append(
    divTitulo,
    tableroDiv,
    infoTurno,
    btnReiniciar,
    btnVolver
  );
  divApp.append(divPantallaTres);

  // Inicializar juego
  mostrarTablero();
};
