// Importa la librería socket.io para gestionar la comunicación en tiempo real con el servidor
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";

// Clase SocketDeviceSingleton para gestionar las conexiones y eventos del socket
export default class SocketDeviceSingleton {
  // Propiedad privada para almacenar la instancia del socket
  #socket;

  // Constructor de la clase
  constructor() {
    // El constructor está vacío en este caso, ya que la inicialización del socket se realiza en el método init
  }

  // Método de inicialización del socket con la URL del servidor, y las funciones para actualizar la UI
  init(url, initUi, addCardUi) {
    // Inicializa el socket con la URL proporcionada
    this.#socket = io(url);
    
    // Escucha el evento 'get-data' enviado desde el servidor
    this.#socket.on("get-data", (data) => {
      // Si los datos recibidos son un arreglo (listado de cartas o posiciones)
      if (Array.isArray(data)) {
        // Llama a la función initUi para inicializar la UI con los datos
        initUi(data);
      } else {
        // Si los datos no son un arreglo, se considera una carta individual y se llama a addCardUi
        addCardUi(data);
      }
    });
  }

  // Método para emitir las posiciones de las cartas al servidor
  postCardPosition({ id, parentId }) {
    // Envía el evento 'post-cardsPosition' al servidor con los datos de la carta
    this.#socket.emit("post-cardsPosition", { id, parentId });
  }
}
