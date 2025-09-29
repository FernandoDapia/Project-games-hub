import "./ahorcado.css";

let palabraSecreta = "";
let pistaActual = "";
let letrasAdivinadas = [];
let letrasErroneas = [];
let intentosRestantes = 10;
let palabrasAcertadas = 0;

const palabras = [
  { palabra: "HARRY POTTER", pista: "El niño mago más famoso de Hogwarts" },
  { palabra: "FROZEN", pista: "Película de Disney donde cantan 'Let it go'" },
  {
    palabra: "BREAKING BAD",
    pista: "Serie del profesor que cocina metanfetamina",
  },
  { palabra: "THE SIMPSONS", pista: "Familia amarilla con Homer y Bart" },
  { palabra: "IRON MAN", pista: "Superhéroe millonario con armadura de acero" },
  { palabra: "SPIDERMAN", pista: "Héroe que lanza telarañas" },
  { palabra: "EL REY LEON", pista: "Película de Disney con Simba y Mufasa" },
  { palabra: "TOY STORY", pista: "Woody y Buzz son los protagonistas" },
  { palabra: "TITANIC", pista: "Película del barco que se hundió" },
  { palabra: "AVENGERS", pista: "Grupo de superhéroes de Marvel" },
  { palabra: "STRANGER THINGS", pista: "Serie con niños y el Mundo del Revés" },
  { palabra: "GAME OF THRONES", pista: "Serie con dragones y tronos" },
  { palabra: "MICHAEL JACKSON", pista: "El Rey del Pop" },
  { palabra: "BEYONCE", pista: "Cantante famosa por 'Single Ladies'" },
  { palabra: "SHAKIRA", pista: "Cantante de Colombia, sus caderas no mienten" },
  { palabra: "BRAD PITT", pista: "Actor de Hollywood, ex de Angelina Jolie" },
  { palabra: "ANGELINA JOLIE", pista: "Actriz famosa por 'Maléfica'" },
  { palabra: "LEONARDO DICAPRIO", pista: "Ganó un Óscar por 'El Renacido'" },
  { palabra: "SELENA GOMEZ", pista: "Cantante y actriz de Disney" },
  { palabra: "MILEY CYRUS", pista: "Famosa por 'Hannah Montana'" },
  {
    palabra: "HIGH SCHOOL MUSICAL",
    pista: "Película de Disney con Troy y Gabriella",
  },
  { palabra: "ALADDIN", pista: "Película con una lámpara mágica" },
  { palabra: "MOANA", pista: "Película de Disney sobre el océano" },
  { palabra: "ENCANTO", pista: "Película de Disney ambientada en Colombia" },
  { palabra: "COCO", pista: "Película de Disney sobre el Día de Muertos" },
  { palabra: "BLACKPINK", pista: "Grupo de K-Pop femenino muy famoso" },
  { palabra: "BTS", pista: "Grupo de K-Pop masculino conocido mundialmente" },
  { palabra: "JUSTIN BIEBER", pista: "Cantante de 'Baby'" },
  { palabra: "TAYLOR SWIFT", pista: "Cantante famosa por 'Shake It Off'" },
  { palabra: "ADELE", pista: "Cantante de 'Hello'" },
  { palabra: "RIHANNA", pista: "Cantante de 'Umbrella'" },
  { palabra: "EMINEM", pista: "Rapero de Detroit, conocido como Slim Shady" },
  {
    palabra: "DWAYNE JOHNSON",
    pista: "Actor y ex luchador conocido como 'La Roca'",
  },
  {
    palabra: "JENNIFER LOPEZ",
    pista: "Cantante y actriz, también conocida como JLo",
  },
  { palabra: "MADONNA", pista: "Reina del pop en los 80 y 90" },
  { palabra: "ELSA", pista: "Princesa de Disney con poderes de hielo" },
  { palabra: "MICKEY MOUSE", pista: "El ratón más famoso de Disney" },
  { palabra: "CENICIENTA", pista: "Princesa que perdió un zapato de cristal" },
  {
    palabra: "MULAN",
    pista: "Princesa guerrera que se hace pasar por soldado",
  },
  { palabra: "LA CASA DE PAPEL", pista: "Serie española con máscaras de Dalí" },
];

let palabrasRestantes = [...palabras];

const seleccionarPalabra = () => {
  if (palabrasRestantes.length === 0) return null;
  const posicionAleatoriaPalabra = Math.floor(
    Math.random() * palabrasRestantes.length
  );
  const seleccionPalabra = palabrasRestantes[posicionAleatoriaPalabra];
  palabrasRestantes.splice(posicionAleatoriaPalabra, 1);
  return seleccionPalabra;
};

const reiniciarJuego = (
  resultadoDiv,
  inputLetra,
  progresoDiv,
  letrasErrDiv,
  intentosDiv,
  pistaDiv
) => {
  const seleccion = seleccionarPalabra();
  if (!seleccion) {
    const btnSiguiente = document.querySelector(".ahorcado-btn-siguiente");
    btnSiguiente.disabled = true;
    resultadoDiv.textContent = "¡No quedan palabras!";
    inputLetra.disabled = true;
    progresoDiv.textContent = "";
    letrasErrDiv.textContent = "";
    intentosDiv.textContent = "";
    pistaDiv.textContent = "";
    return;
  }
  palabraSecreta = seleccion.palabra;
  pistaActual = seleccion.pista;
  letrasAdivinadas = [];
  letrasErroneas = [];
  intentosRestantes = 10;
  resultadoDiv.textContent = "";
  inputLetra.disabled = false;
  progresoDiv.textContent = mostrarProgreso();
  letrasErrDiv.textContent = "Letras incorrectas: ";
  intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;
  pistaDiv.textContent = `Pista: ${pistaActual}`;
  localStorage.setItem(
    "partidaAhorcado",
    JSON.stringify({
      palabraSecreta,
      pistaActual,
      letrasAdivinadas,
      letrasErroneas,
      intentosRestantes,
      palabrasAcertadas,
    })
  );
};

const iniciarJuego = (
  resultadoDiv,
  inputLetra,
  progresoDiv,
  letrasErrDiv,
  intentosDiv,
  pistaDiv
) => {
  letrasAdivinadas = [];
  letrasErroneas = [];
  intentosRestantes = 10;
  palabrasRestantes = [...palabras];

  resultadoDiv.textContent = "";
  inputLetra.disabled = false;
  letrasErrDiv.textContent = "Letras incorrectas: ";
  intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;

  const seleccion = seleccionarPalabra();
  if (!seleccion) {
    resultadoDiv.textContent = "¡No quedan palabras!";
    inputLetra.disabled = true;
    progresoDiv.textContent = "";
    letrasErrDiv.textContent = "";
    intentosDiv.textContent = "";
    pistaDiv.textContent = "";
    return;
  }
  palabraSecreta = seleccion.palabra;
  pistaActual = seleccion.pista;
  progresoDiv.textContent = mostrarProgreso();
  pistaDiv.innerHTML = `Pista: <br> ${pistaActual}`;
  localStorage.setItem(
    "partidaAhorcado",
    JSON.stringify({
      palabraSecreta,
      pistaActual,
      letrasAdivinadas,
      letrasErroneas,
      intentosRestantes,
      palabrasAcertadas,
    })
  );
};

function mostrarProgreso() {
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
}

export const initAhorcado = (divApp) => {
  const datosGuardadosAhorcado = localStorage.getItem("partidaAhorcado");
  let partidaGuardada = false;
  if (datosGuardadosAhorcado) {
    const datos = JSON.parse(datosGuardadosAhorcado);
    palabraSecreta = datos.palabraSecreta || "";
    pistaActual = datos.pistaActual || "";
    letrasAdivinadas = datos.letrasAdivinadas || [];
    letrasErroneas = datos.letrasErroneas || [];
    intentosRestantes = datos.intentosRestantes || 10;
    palabrasAcertadas = datos.palabrasAcertadas || 0;
    partidaGuardada = true;
  }
  const divAhorcado = document.createElement("div");
  divAhorcado.className = "divPantallaAhorcado";

  const titulo = document.createElement("h2");
  titulo.textContent = "EL AHORCADO";
  titulo.className = "h2-ahorcado";
  divAhorcado.append(titulo);

  const drawAhorcado = document.createElement("div");
  drawAhorcado.className = "draw-ahorcado";
  drawAhorcado.innerHTML = `
  <div class="base ocultar"></div>
  <div class="poste ocultar"></div>
  <div class="techo ocultar"></div>
  <div class="cuerda ocultar"></div>
  <div class="cabeza ocultar"></div>
  <div class="cuerpo ocultar"></div>
  <div class="brazo-izq ocultar"></div>
  <div class="brazo-der ocultar"></div>
  <div class="pierna-izq ocultar"></div>
  <div class="pierna-der ocultar"></div>
`;
  divAhorcado.append(drawAhorcado);

  const resetDraw = () => {
    const base = document.querySelector(".base");
    base.classList.add("ocultar");

    const poste = document.querySelector(".poste");
    poste.classList.add("ocultar");

    const techo = document.querySelector(".techo");
    techo.classList.add("ocultar");

    const cuerda = document.querySelector(".cuerda");
    cuerda.classList.add("ocultar");

    const cabeza = document.querySelector(".cabeza");
    cabeza.classList.add("ocultar");

    const cuerpo = document.querySelector(".cuerpo");
    cuerpo.classList.add("ocultar");

    const brazoIzq = document.querySelector(".brazo-izq");
    brazoIzq.classList.add("ocultar");

    const brazoDer = document.querySelector(".brazo-der");
    brazoDer.classList.add("ocultar");

    const piernaIzq = document.querySelector(".pierna-izq");
    piernaIzq.classList.add("ocultar");

    const piernaDer = document.querySelector(".pierna-der");
    piernaDer.classList.add("ocultar");
  };

  const pistaDiv = document.createElement("div");
  pistaDiv.className = "ahorcado-pista";
  divAhorcado.append(pistaDiv);

  const progresoDiv = document.createElement("div");
  progresoDiv.className = "ahorcado-progreso";
  divAhorcado.append(progresoDiv);

  const letrasErrDiv = document.createElement("div");
  letrasErrDiv.className = "ahorcado-letras-erroneas";
  divAhorcado.append(letrasErrDiv);

  const palabrasAdivinadasDiv = document.createElement("div");
  palabrasAdivinadasDiv.className = "palabras-adivinadas-score";
  palabrasAdivinadasDiv.textContent = `Palabras acertadas: ${palabrasAcertadas} de 40.`;
  divAhorcado.append(palabrasAdivinadasDiv);

  const intentosDiv = document.createElement("div");
  intentosDiv.className = "ahorcado-intentos";
  divAhorcado.append(intentosDiv);

  const inputLetra = document.createElement("input");
  inputLetra.type = "text";
  inputLetra.maxLength = 1;
  inputLetra.className = "ahorcado-input-letra";
  inputLetra.placeholder = "Letra";
  inputLetra.disabled = true;
  divAhorcado.append(inputLetra);

  const resultadoDiv = document.createElement("div");
  resultadoDiv.className = "ahorcado-resultado";
  divAhorcado.append(resultadoDiv);

  const divButtons = document.createElement("div");
  divButtons.className = "div-buttons";

  const buttonVolver = document.createElement("button");
  buttonVolver.addEventListener("click", () => {
    const buttonVolver = document.querySelector(".divPantallaAhorcado");
    buttonVolver.classList.remove("mostrar");
  });
  buttonVolver.className = "boton-ahorcado-volver";
  buttonVolver.textContent = "Volver";

  const audioWestern = new Audio(
    "https://res.cloudinary.com/dy45x7mjl/video/upload/v1758711738/Proyecto%205%20-%20games%20hub/The_House_of_The_Rising_Sun_-_The_White_Buffalo_-_VID11ROCHA_box3od.mp3"
  );

  const btnEmpezar = document.createElement("button");
  btnEmpezar.textContent = "Empezar";
  btnEmpezar.className = "ahorcado-btn-empezar";
  btnEmpezar.addEventListener("click", () => {
    iniciarJuego(
      resultadoDiv,
      inputLetra,
      progresoDiv,
      letrasErrDiv,
      intentosDiv,
      pistaDiv
    );
    resetDraw();
    // audioWestern.play()
  });

  const btnSiguiente = document.createElement("button");
  btnSiguiente.textContent = "Siguiente palabra";
  btnSiguiente.className = "ahorcado-btn-siguiente";
  btnSiguiente.addEventListener("click", () => {
    reiniciarJuego(
      resultadoDiv,
      inputLetra,
      progresoDiv,
      letrasErrDiv,
      intentosDiv,
      pistaDiv
    );
    resetDraw();
  });

  inputLetra.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !inputLetra.disabled) {
      const letra = inputLetra.value.toUpperCase();
      inputLetra.value = "";
      if (!letra.match(/[A-ZÑ]/) || letra.length !== 1) return;
      if (letrasAdivinadas.includes(letra) || letrasErroneas.includes(letra))
        return;

      if (palabraSecreta.includes(letra)) {
        letrasAdivinadas.push(letra);
      } else {
        letrasErroneas.push(letra);
        intentosRestantes--;
      }
      if (intentosRestantes === 9) {
        const base = document.querySelector(".base");
        base.classList.remove("ocultar");
      }
      if (intentosRestantes === 8) {
        const poste = document.querySelector(".poste");
        poste.classList.remove("ocultar");
      }
      if (intentosRestantes === 7) {
        const techo = document.querySelector(".techo");
        techo.classList.remove("ocultar");
      }
      if (intentosRestantes === 6) {
        const cuerda = document.querySelector(".cuerda");
        cuerda.classList.remove("ocultar");
      }
      if (intentosRestantes === 5) {
        const cabeza = document.querySelector(".cabeza");
        cabeza.classList.remove("ocultar");
      }
      if (intentosRestantes === 4) {
        const cuerpo = document.querySelector(".cuerpo");
        cuerpo.classList.remove("ocultar");
      }
      if (intentosRestantes === 3) {
        const brazoIzq = document.querySelector(".brazo-izq");
        brazoIzq.classList.remove("ocultar");
      }
      if (intentosRestantes === 2) {
        const brazoDer = document.querySelector(".brazo-der");
        brazoDer.classList.remove("ocultar");
      }
      if (intentosRestantes === 1) {
        const piernaIzq = document.querySelector(".pierna-izq");
        piernaIzq.classList.remove("ocultar");
      }
      if (intentosRestantes === 0) {
        const piernaDer = document.querySelector(".pierna-der");
        piernaDer.classList.remove("ocultar");
      }

      progresoDiv.textContent = mostrarProgreso();
      letrasErrDiv.textContent =
        "Letras incorrectas: " + letrasErroneas.join(", ");
      intentosDiv.textContent = `Intentos restantes: ${intentosRestantes}`;

      const progreso = mostrarProgreso();
      if (!progreso.includes("_")) {
        resultadoDiv.textContent = "¡TE SALVASTE!";
        inputLetra.disabled = true;
        btnSiguiente.disabled = false;
        palabrasAcertadas++;
        palabrasAdivinadasDiv.textContent = `Palabras acertadas: ${palabrasAcertadas} de 10.`;
      } else if (intentosRestantes === 0) {
        resultadoDiv.textContent = `¡Perdiste! La palabra era: ${palabraSecreta}`;
        inputLetra.disabled = true;
        btnSiguiente.disabled = false;
      }
    }
    localStorage.setItem(
      "partidaAhorcado",
      JSON.stringify({
        palabraSecreta,
        pistaActual,
        letrasAdivinadas,
        letrasErroneas,
        intentosRestantes,
        palabrasAcertadas,
      })
    );
  });

  localStorage.setItem(
    "partidaAhorcado",
    JSON.stringify({
      palabraSecreta,
      pistaActual,
      letrasAdivinadas,
      letrasErroneas,
      intentosRestantes,
      palabrasAcertadas,
    })
  );
  divButtons.append(btnEmpezar);
  divButtons.append(btnSiguiente);
  divButtons.append(buttonVolver);
  divAhorcado.append(divButtons);
  divApp.append(divAhorcado);
};
