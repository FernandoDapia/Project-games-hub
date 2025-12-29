const PARTES_AHORCADO = [
    ".base",
    ".poste",
    ".techo",
    ".cuerda",
    ".cabeza",
    ".cuerpo",
    ".brazo-izq",
    ".brazo-der",
    ".pierna-izq",
    ".pierna-der",
];

export const resetDraw = () => {
    PARTES_AHORCADO.forEach((selector) => {
        const elemento = document.querySelector(selector);
        if (elemento) elemento.classList.add("ocultar");
    });
};

export const actualizarDibujo = (intentosRestantes) => {
    const partesAMostrar = 10 - intentosRestantes;

    for (let i = 0; i < partesAMostrar; i++) {
        const elemento = document.querySelector(PARTES_AHORCADO[i]);
        if (elemento) elemento.classList.remove("ocultar");
    }
};

export const dibujarEstadoGuardado = (intentosRestantes) => {
    resetDraw();
    actualizarDibujo(intentosRestantes);
};

export const crearEstructuraDibujo = () => {
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
    return drawAhorcado;
};
