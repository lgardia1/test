// Clase ApiDeviceSingleTon para manejar las interacciones con una API REST
export default class ApiDeviceSingleTon {
  // Propiedad privada que almacena la URL base de la API
  #url;

  // Constructor de la clase, inicializa la URL base de la API
  constructor(url) {
    this.#url = url;
  }

  // Método para verificar si la API está disponible
  async isAPI() {
    try {
      // Realiza una solicitud GET a la URL base de la API
      const res = await fetch(`${this.#url}/`);

      // Si la respuesta es 200, la API está disponible
      if (res.status == "200") {
        return true;
      }
      return false;  // Si el código de estado no es 200, la API no está disponible
    } catch (err) {
      // Si ocurre un error al hacer la solicitud, devuelve false
      return false;
    }
  }

  // Método para obtener las posiciones de las cartas desde la API
  async getCardsPosition(routeGet) {
    try {
      // Realiza una solicitud GET a la ruta específica para obtener las posiciones
      const res = await fetch(`${this.#url}/${routeGet}`);

      // Si la respuesta no es ok, lanza un error
      if (!res.ok) {
        throw new Error(res.status);
      }

      // Si la solicitud fue exitosa, convierte la respuesta en formato JSON
      const positions = await res.json();

      // Devuelve las posiciones obtenidas
      return positions;
    } catch (err) {
      // Si ocurre un error, lo imprime en la consola
      console.log(err);
    }
  }

  // Método para enviar las posiciones de una carta a la API
  async postCardPosition(routePost, { id, parentId }) {
    try {
      // Realiza una solicitud POST a la ruta especificada para enviar las posiciones
      const res = await fetch(`${this.#url}/${routePost}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Especifica el tipo de contenido como JSON
        },
        body: JSON.stringify({ id, parentId }),  // Convierte los datos a formato JSON en el cuerpo de la solicitud
      });

      // Si la respuesta no es ok, lanza un error
      if (!res.ok) {
        throw new Error(res.status);
      }
    } catch (err) {
      // Si ocurre un error, lo imprime en la consola
      console.log(err);
    }
  }
}
