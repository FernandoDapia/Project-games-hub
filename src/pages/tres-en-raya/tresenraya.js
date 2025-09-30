import "./tresenraya.css";

export const initTresEnRaya = (divApp) =>{
  const divPantallaTres = document.createElement("div")
  divPantallaTres.className = "divPantallaTres"
  const divTitulo = document.createElement("div")
  divTitulo.className = "div-titulo-tres"
  const titulo = document.createElement("h2")
  titulo.textContent = "TRES EN RAYA"
  
  
  divTitulo.append(titulo)
  divPantallaTres.append(divTitulo)
  divApp.append(divPantallaTres)
}