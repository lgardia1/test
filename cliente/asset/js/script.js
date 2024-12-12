// Importación de módulos necesarios
import Cards from "./modules/class/Cards.js";  // Módulo para gestionar las cartas
import UI from "./modules/class/UI.js";  // Módulo para gestionar la interfaz de usuario
import config from "./modules/config/config.js";  // Configuración para la interfaz
import ApiDevice from "./modules/service/api/ApiDevice.js";  // Módulo para interactuar con la API
import SocketDevice from "./modules/service/socket/SocketDevice.js";  // Módulo para manejar la conexión de socket

// URL inicial para conectarse al servidor
let url = "http://localhost:3000";
// Ruta para obtener las cartas
const route = "card";

// Crear una instancia de la API
let api = ApiDevice.getInstance(url);
// Variable para almacenar las posiciones de las cartas
let cardsPositon;

// Verifica si la API está disponible
if (!(await api.isAPI())) {
  // Si la API no está disponible, cambia la URL y establece la API en null
  api = null;
  url = "http://localhost:2000";
}

// Crear instancias de las clases de cartas e interfaz de usuario
const card = new Cards();
const ui = new UI();

// Si la API está disponible, obtener las posiciones de las cartas y configurar la interfaz
if (api) {
  // Obtener las posiciones de las cartas desde la API
  cardsPositon = await api.getCardsPosition(route);
  // Inicializar la interfaz y las cartas
  ui.init(config, card.init(10, cardsPositon));

  // Configurar la capacidad de arrastrar los elementos en la interfaz
  ui.initializeDraggAbleParents(({ id, parentId }) =>
    api.postCardPosition(route, { id, parentId })
  );
} else {
  // Si la API no está disponible, usar el socket
  const socket = SocketDevice.getInstance();
  // Inicializar la conexión del socket
  socket.init(
    url,
    // Callback cuando se reciben las posiciones de las cartas desde el servidor
    (cardsPositon) => {
      // Inicializar la interfaz y las cartas
      ui.init(config, card.init(10, cardsPositon));
      // Configurar la capacidad de arrastrar los elementos en la interfaz
      ui.initializeDraggAbleParents(({ id, parentId }) => {
        // Enviar las posiciones de las cartas al servidor mediante socket
        socket.postCardPosition({ id, parentId });
      });
    },
    // Callback cuando se recibe una nueva carta
    (card) => {
      // Añadir la nueva carta a la interfaz
      ui.addCard(card);
    }
  );
}
