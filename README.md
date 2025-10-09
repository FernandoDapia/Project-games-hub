# 🎮 PROJECT GAMES HUB

Una colección de tres juegos clásicos desarrollados con JavaScript vanilla y Vite. Este proyecto incluye **Piedra, Papel o Tijera**, **El Ahorcado** y **Tres en Raya**, todos en una única aplicación web interactiva con diseño retro.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Juegos](#-juegos)
  - [Piedra, Papel o Tijera](#1-piedra-papel-o-tijera)
  - [El Ahorcado](#2-el-ahorcado)
  - [Tres en Raya](#3-tres-en-raya)
- [Funcionalidades Adicionales](#-funcionalidades-adicionales)
- [Comandos Disponibles](#-comandos-disponibles)
- [Autor](#-autor)

## ✨ Características

- 🎯 Tres juegos clásicos completamente funcionales
- 💾 Sistema de almacenamiento local (LocalStorage) para guardar progreso
- 🎨 Diseño retro con estética gaming
- 🎵 Música de fondo ambiente (tema Pokémon Center Synthwave)
- 📱 Diseño responsive y optimizado para móviles
- ⚡ Desarrollado con Vite para desarrollo rápido

## 🛠 Tecnologías Utilizadas

- **JavaScript ES6+**: Lenguaje de programación principal
- **HTML5**: Estructura del proyecto
- **CSS3**: Estilos y diseño visual
- **Vite 7.1.7**: Herramienta de construcción y desarrollo
- **LocalStorage API**: Persistencia de datos
- **Google Fonts (Sixtyfour)**: Tipografía retro
- **Cloudinary**: Hosting de assets (imágenes y audio)

### Versión de Vite

```json
"vite": "^7.1.7"
```

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd projectgameshub
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

5. **Vista previa de producción**
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
projectgameshub/
├── index.html              # Punto de entrada HTML
├── package.json            # Dependencias y scripts
├── src/
│   ├── main.js            # Punto de entrada JavaScript
│   ├── style.css          # Estilos globales
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas de cada juego
│   │   ├── menu-juegos/   # Menú principal
│   │   │   ├── menuJuegos.js
│   │   │   └── menuJuegos.css
│   │   ├── Ppt/           # Piedra, Papel o Tijera
│   │   │   ├── ppt.js
│   │   │   └── ppt.css
│   │   ├── ahorcado/      # El Ahorcado
│   │   │   ├── ahorcado.js
│   │   │   └── ahorcado.css
│   │   └── tres-en-raya/  # Tres en Raya
│   │       ├── tresenraya.js
│   │       └── tresenraya.css
│   └── utils/             # Utilidades
│       └── storage.js     # Gestión de LocalStorage
└── public/                # Assets estáticos
```

## 🎮 Juegos

### 1. Piedra, Papel o Tijera

**Archivo principal:** [`src/pages/Ppt/ppt.js`](src/pages/Ppt/ppt.js)

#### Cómo funciona:
- El jugador elige entre Piedra (🗿), Papel (📄) o Tijera (✂️)
- La CPU realiza una elección aleatoria
- Se aplican las reglas clásicas:
  - Piedra vence a Tijera
  - Tijera vence a Papel
  - Papel vence a Piedra
- El sistema mantiene un marcador de puntuación persistente

#### Características:
- **Marcador persistente**: Los puntos se guardan en LocalStorage
- **Sistema de colores**: Verde para victoria, rojo para derrota, amarillo para empate
- **Botón de reset**: Reinicia el marcador sin recargar la página
- **Feedback visual**: Muestra la elección de la CPU y el resultado

#### Código clave:
```javascript
const jugar = (eleccionUsuario) => {
  const eleccionCpu = opcionesPpt[Math.floor(Math.random() * 3)];
}
```

---

### 2. El Ahorcado

**Archivo principal:** [`src/pages/ahorcado/ahorcado.js`](src/pages/ahorcado/ahorcado.js)

#### Cómo funciona:
- El juego selecciona aleatoriamente una palabra de un banco de 40 palabras
- Las palabras son nombres de películas, series, actores y cantantes famosos
- El jugador tiene 10 intentos para adivinar la palabra letra por letra
- Cada letra incorrecta construye progresivamente el dibujo del ahorcado
- Se proporciona una pista para ayudar al jugador

#### Características:
- **40 palabras diferentes**: Temática de entretenimiento (películas, series, celebridades)
- **Sistema de pistas**: Cada palabra tiene una pista descriptiva
- **Dibujo progresivo**: El ahorcado se dibuja con CSS en 10 etapas
- **Contador de palabras acertadas**: Registro de 0 a 40 palabras completadas
- **Persistencia de partida**: Guarda el progreso actual en LocalStorage
- **Sistema de siguiente palabra**: Avanza a una nueva palabra sin repetir

#### Banco de palabras incluye:
- Películas: Harry Potter, Frozen, Titanic, Toy Story, Aladdin, etc.
- Series: Breaking Bad, The Simpsons, Stranger Things, Game of Thrones, etc.
- Celebridades: Michael Jackson, Taylor Swift, Leonardo DiCaprio, etc.

#### Código clave:
```javascript
const seleccionarPalabra = () => {
 
  const posicionAleatoriaPalabra = Math.floor(
    Math.random() * palabrasRestantes.length
  );
  const seleccionPalabra = palabrasRestantes[posicionAleatoriaPalabra];
  palabrasRestantes.splice(posicionAleatoriaPalabra, 1);
  return seleccionPalabra;
};
```

#### Lógica del dibujo:
- **10 intentos**: Cada error dibuja una parte del ahorcado
- **Partes del dibujo**: Base → Poste → Techo → Cuerda → Cabeza → Cuerpo → Brazo Izq → Brazo Der → Pierna Izq → Pierna Der
- **Control visual**: Uso de clases CSS `.ocultar` para mostrar/ocultar partes

---

### 3. Tres en Raya

**Archivo principal:** [`src/pages/tres-en-raya/tresenraya.js`](src/pages/tres-en-raya/tresenraya.js)

#### Cómo funciona:
- Tablero clásico de 3x3
- Los jugadores alternan colocando X y O
- El primero en formar una línea de tres (horizontal, vertical o diagonal) gana
- Si se llena el tablero sin ganador, es empate

#### Características:
- **Tres modos de juego**:
  1. **Player vs CPU - Fácil**: La CPU hace movimientos aleatorios
  2. **Player vs CPU - Difícil**: La CPU usa estrategia (bloquea y juega en esquinas)
  3. **2 Players**: Modo para dos jugadores locales

- **IA de CPU Fácil**: Selección aleatoria de casillas vacías
- **IA de CPU Difícil**:
  - Detecta amenazas del jugador y bloquea
  - Prioriza esquinas estratégicas
  - Busca oportunidades de victoria

- **Sistema de persistencia**: Guarda el estado del tablero, turno actual y modo de juego
- **Validación de ganador**: Comprueba las 8 líneas posibles
- **Detección de empate**: Identifica cuando el tablero está lleno sin ganador

#### Código clave de la IA Difícil:
```javascript
const jugadaCPUDificil = () => {
  // Primero intenta bloquear al jugador
  const jugadaBloqueo = buscarJugadaGanadora("X");
  if (jugadaBloqueo !== null) {
    return jugadaBloqueo;
  }
  // Si no hay amenaza, juega en esquinas estratégicas
  const esquinas = [0, 2, 4, 6, 8].filter((index) => tablero[index] === "");
  if (esquinas.length > 0) {
    return esquinas[Math.floor(Math.random() * esquinas.length)];
  }
};
```

#### Verificación de ganador:
```javascript
const lineasGanadoras = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontales
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Verticales
  [0, 4, 8], [2, 4, 6]              // Diagonales
];
```

---

## 🎵 Funcionalidades Adicionales

### Sistema de Música
- **Música de fondo**: Tema Pokémon Center en versión Synthwave/Vaporwave
- **Controles**: Botón de play/pause con ícono dinámico
- **Control de volumen**: Slider para ajustar el volumen
- **Estado visual**: Los íconos cambian según el estado de reproducción

### Sistema de Almacenamiento (LocalStorage)

**Archivo:** [`src/utils/storage.js`](src/utils/storage.js)

Gestiona la persistencia de datos para todos los juegos:

```javascript
// Guardar datos de un juego
guardarDatosJuego("nombreJuego", { datos });

// Obtener datos guardados
const datos = obtenerDatosJuego("nombreJuego");

// Limpiar datos de un juego
limpiarDatosJuego("nombreJuego");
```

#### Datos guardados por juego:
- **PPT**: `usuarioScore`, `cpuScore`
- **Ahorcado**: `palabraSecreta`, `pistaActual`, `letrasAdivinadas`, `letrasErroneas`, `intentosRestantes`, `palabrasAcertadas`
- **Tres en Raya**: `tablero`, `turnoActual`, `modoJuego`

### Navegación
- **Menú principal**: Hub central con acceso a los tres juegos
- **Botones de retorno**: Cada juego tiene un botón "Volver" al menú
- **Sistema de capas**: Los juegos se superponen al menú sin recarga de página

## 📜 Comandos Disponibles

```json
{
  "dev": "vite",           // Inicia servidor de desarrollo
  "build": "vite build",   // Construye para producción
  "preview": "vite preview" // Previsualiza build de producción
}
```

### Uso:
```bash
npm run dev      # Puerto 5173 por defecto
npm run build    # Genera carpeta /dist
npm run preview  # Sirve el build en local
```

## 🎨 Características de Diseño

- **Fuente retro**: Sixtyfour de Google Fonts
- **Paleta de colores**: Estilo gaming retro con neones
- **Responsive**: Adaptado para móviles y tablets
- **PWA Ready**: Meta tags configurados para Progressive Web App
- **Theme color**: `#4834d4` (morado retro)

## 👤 Autor

**Fernando Dapia Rodriguez**

---

## 📝 Notas Técnicas

### Vite Configuration
Este proyecto usa **Vite 7.1.7**, el cual proporciona:
- ⚡ Hot Module Replacement (HMR) instantáneo
- 📦 Bundling optimizado para producción
- 🔧 Zero-config por defecto
- 🚀 Servidor de desarrollo ultrarrápido

### Compatibilidad
- Navegadores modernos con soporte ES6+
- LocalStorage habilitado
- JavaScript activado

### Assets Externos
Los assets (imágenes, audio) están alojados en **Cloudinary** para:
- ⚡ Carga optimizada y rápida
- 🌐 CDN global
- 📦 Reducción del tamaño del bundle

---

¡Disfruta jugando! 🎮✨
