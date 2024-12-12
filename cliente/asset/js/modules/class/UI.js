// Clase UI que gestiona la interacción de la interfaz de usuario con las cartas y sus elementos drag-and-drop
export default class UI {
  // Propiedades privadas para almacenar los nodos de los padres y las cartas
  #parentsNode;
  #nodeCards;

  // Constructor de la clase
  constructor() {
    // El constructor está vacío, ya que la inicialización se realiza mediante el método init
  }

  // Método para inicializar la interfaz de usuario, recibiendo la información de los padres y las cartas
  init({ parents }, cards) {
    // Inicializa las variables privadas relacionadas con los nodos y las cartas
    this.#initializeVariable(cards, parents);
    // Inicializa los elementos que pueden ser arrastrados (draggables)
    this.#initializeDraggAbleElements();
  }

  // Método privado para inicializar las variables necesarias, como los nodos de los padres y las cartas
  #initializeVariable(cards, parents) {
    // Mapea los padres a los elementos DOM correspondientes usando su id
    this.#parentsNode = parents.map(({ id }) =>
      document.getElementById(`${id}`)
    );
    // Inicializa los nodos de las cartas y las coloca en los padres correspondientes
    this.#nodeCards = this.#initializeCards(cards);
  }

  // Método privado para inicializar las cartas y asignarlas a los padres correspondientes
  #initializeCards(cards) {
    let cardsElements = [];
    // Recorre las cartas y crea un nuevo elemento div para cada una
    cards.forEach(({ id, dataset, classStyle, parentId }) => {
      const card = document.createElement("div");
      // Asigna atributos a las cartas, como id, tipo y clase
      card.setAttribute("id", id);
      card.setAttribute("data-type", dataset);
      card.setAttribute("class", classStyle);

      // Añade la carta a la lista de cartas
      cardsElements.push(card);
      // Coloca la carta en el nodo padre correspondiente
      this.#parentsNode.forEach((parent) => {
        if (parent.id === parentId) {
          parent.prepend(card); // Agrega la carta al principio del contenedor
        }
      });
    });
    return cardsElements; // Retorna el arreglo de elementos de las cartas creadas
  }

  // Método privado para hacer que las cartas sean arrastrables
  #initializeDraggAbleElements() {
    this.#nodeCards.forEach((nodeElement) => {
      // Establece el atributo "draggable" a "true" para permitir el arrastre
      nodeElement.setAttribute("draggable", "true");
      // Añade un evento para el inicio del arrastre
      nodeElement.addEventListener("dragstart", (event) => {
        // Guarda el id del elemento arrastrado en el objeto dataTransfer
        event.dataTransfer.setData("text", `${event.target.id}`);
      });
    });
  }

  // Método para inicializar los contenedores (padres) donde las cartas pueden ser soltadas
  initializeDraggAbleParents(postCard) {
    this.#parentsNode.forEach((parentNode) => {
      // Permite que los elementos puedan ser soltados (previene el comportamiento predeterminado)
      parentNode.addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      // Maneja el evento de soltar una carta en el contenedor
      parentNode.addEventListener("drop", (event) => {
        event.preventDefault();

        // Obtiene el id del elemento arrastrado
        const idElement = event.dataTransfer.getData("text");
        // Busca el nodo de la carta correspondiente al id
        const cardNode = this.#nodeCards.find(
          (element) => element.id === idElement
        );

        // Obtiene el tipo de contenedor y el tipo de carta
        const typeContainer = parentNode.dataset.type;
        const typeCard = cardNode.dataset.type;

        // Verifica si el contenedor acepta este tipo de carta (si no es 'cards', debe coincidir el tipo)
        if (typeContainer !== 'cards') {
          if (typeContainer !== typeCard) {
            return; // Si los tipos no coinciden, no hace nada
          }
        }
        
        // Si el contenedor no contiene la carta, la agrega
        if (!parentNode.contains(cardNode)) {
          parentNode.appendChild(cardNode); // Añade la carta al contenedor
          const cardId = parseInt(cardNode.id) ?? cardNode.id;
          const fatherId = isNaN(parseInt(parentNode.id)) ? parentNode.id : parseInt(parentNode.id);

          // Llama a la función para enviar la nueva posición de la carta
          postCard({ id: cardId, parentId: fatherId });
        }
      });
    });
  }

  // Método para añadir una carta al contenedor correspondiente
  addCard({ id, parentId }) {
    // Busca la carta por su id
    const card = this.#nodeCards.find((card) => card.id == id);
    // Busca el contenedor por su id
    const parent = this.#parentsNode.find((parent) => parent.id == parentId);

    // Añade la carta al contenedor padre
    parent.appendChild(card);
  }
}
