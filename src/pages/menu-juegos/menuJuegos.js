import "./menuJuegos.css";

const menuJuegos = (divApp) => {
  const divMenuJuegos = document.createElement("div");
  const divTitulo = document.createElement("div");
  divTitulo.className = "divTitulo";
  const titulo = document.createElement("h1");
  titulo.className = "titulo-h1";
  titulo.textContent = "PROYECTO 5 GAMES HUB";
  divTitulo.append(titulo);
  divMenuJuegos.append(divTitulo);
  const divBotonesJuegos = document.createElement("div");
  divBotonesJuegos.className = "botones-juegos";
  const buttonPpt = document.createElement("button");
  buttonPpt.className = "button-retro";
  buttonPpt.textContent = "PIEDRA, PAPEL O TIJERA";
  const buttonAhorcado = document.createElement("button");
  buttonAhorcado.className = "button-retro";
  buttonAhorcado.textContent = "EL AHORCADO";
  const buttonTresEnRaya = document.createElement("button");
  buttonTresEnRaya.className = "button-retro"
  buttonTresEnRaya.textContent = "TRES EN RAYA"

  buttonPpt.addEventListener("click", () => {
    const divPpt = document.querySelector(".divPantallaJuego");
    divPpt.classList.add("mostrar");
  });
  buttonAhorcado.addEventListener("click", () => {
    const divAhorcado = document.querySelector(".divPantallaAhorcado");
    divAhorcado.classList.add("mostrar");
  });

  buttonTresEnRaya.addEventListener("click", () => {
    const divTresEnRaya = document.querySelector(".divPantallaTres")
    divTresEnRaya.classList.add("mostrar")
  })


  const divControlerMusic = document.createElement("div");
  divControlerMusic.className = "div-controler-music";

  const buttonSoundPlay = document.createElement("button");
  buttonSoundPlay.className = "button-sound-menu";
  const imgSound = document.createElement("img");
  imgSound.className = "img-sound-menu";
  imgSound.src =
    "https://res.cloudinary.com/dy45x7mjl/image/upload/v1759138036/Proyecto%205%20-%20games%20hub/play_circle_24dp_48752C_FILL0_wght400_GRAD0_opsz24_fowmcd.svg";
  imgSound.alt = "Sonido";
  
  const audioIntro = new Audio(
    "https://res.cloudinary.com/dy45x7mjl/video/upload/v1758786383/Proyecto%205%20-%20games%20hub/Poke%CC%81mon_Center_-_Poke%CC%81mon_Red_Blue_Synthwave_Vaporwave_OST_-_FusionTunes_yxbhix.mp3"
  );
  buttonSoundPlay.addEventListener("click", () => {
    if (audioIntro.paused) {
      audioIntro.play();
      imgSound.src =
        "https://res.cloudinary.com/dy45x7mjl/image/upload/v1759138164/Proyecto%205%20-%20games%20hub/pause_circle_24dp_8C1A10_FILL0_wght400_GRAD0_opsz24_ikk17t.svg";
    } else {
      audioIntro.pause();
      imgSound.src =
        "https://res.cloudinary.com/dy45x7mjl/image/upload/v1759138036/Proyecto%205%20-%20games%20hub/play_circle_24dp_48752C_FILL0_wght400_GRAD0_opsz24_fowmcd.svg";
    }
  });
  const slideVolume = document.createElement("input");
  slideVolume.type = "range";
  slideVolume.min = 0;
  slideVolume.max = 1;
  slideVolume.step = 0.01;
  slideVolume.value = audioIntro.volume;

  slideVolume.className = "slide-volumen-menu";

  slideVolume.addEventListener("input", () => {
    audioIntro.volume = slideVolume.value;
  });
  buttonSoundPlay.append(imgSound);

  divBotonesJuegos.append(buttonPpt, buttonAhorcado, buttonTresEnRaya);
  divBotonesJuegos.append(buttonSoundPlay);
  divBotonesJuegos.append(slideVolume);
  divMenuJuegos.className = "divMenuJuegos";
  divMenuJuegos.append(divBotonesJuegos);
  divApp.append(divMenuJuegos);
};

export default menuJuegos;