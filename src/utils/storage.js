// Sistema centralizado de localStorage para todos los juegos

const STORAGE_KEY = "projectGamesHub_data";

export const obtenerDatos = () => {
  const datos = localStorage.getItem(STORAGE_KEY);
  return datos ? JSON.parse(datos) : {};
};

export const guardarDatosJuego = (nombreJuego, datosJuego) => {
  const todosLosDatos = obtenerDatos();
  todosLosDatos[nombreJuego] = datosJuego;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todosLosDatos));
};

export const obtenerDatosJuego = (nombreJuego) => {
  const todosLosDatos = obtenerDatos();
  return todosLosDatos[nombreJuego] || null;
};

export const limpiarDatosJuego = (nombreJuego) => {
  const todosLosDatos = obtenerDatos();
  delete todosLosDatos[nombreJuego];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todosLosDatos));
};

export const limpiarTodosLosDatos = () => {
  localStorage.removeItem(STORAGE_KEY);
};
