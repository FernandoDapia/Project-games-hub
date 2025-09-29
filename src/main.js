import "./style.css";
import Header from "../src/components/header/header.js";
import { initPpt } from "./pages/Ppt/ppt";
import menuJuegos from "./pages/menu-juegos/menuJuegos.js";
import { initAhorcado } from "./pages/ahorcado/ahorcado.js";

const divApp = document.querySelector("#app");
Header(divApp);
menuJuegos(divApp);
initPpt(divApp);
initAhorcado(divApp);
