import "./style.css";
import { initPpt } from "./pages/Ppt/ppt";
import menuJuegos from "./pages/menu-juegos/menuJuegos.js";
import { initAhorcado } from "./pages/ahorcado/ahorcado.js";
import { initTresEnRaya } from "./pages/tres-en-raya/tresenraya.js";

const divApp = document.querySelector("#app");
menuJuegos(divApp);
initPpt(divApp);
initAhorcado(divApp)
initTresEnRaya(divApp);
