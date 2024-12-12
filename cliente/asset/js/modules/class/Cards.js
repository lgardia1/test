// Clase Card que maneja la creación y gestión de cartas
export default class Card {
  // Propiedades privadas para almacenar las cartas y el número de cartas
  #cards = [];
  #numberOfCards;

  // Constructor de la clase
  constructor() {
    // El constructor está vacío en este caso, ya que la inicialización se realiza en el método init
  }

  // Método para inicializar las cartas, asignar posiciones y retornar las cartas
  init(numberOfCards, positionCards) {
    // Asigna el número de cartas a la propiedad privada
    this.#numberOfCards = numberOfCards;

    // Inicializa las cartas llamando al método privado #initCards
    this.#cards = this.#initCards();

    // Recorre las posiciones de las cartas y actualiza la propiedad parentId
    positionCards.forEach(({ id, parentId }) => {
      // Busca la carta correspondiente por su id
      const card = this.#cards.find((card) => card.id === id);
      if (card) {
        // Si se encuentra la carta, asigna su parentId
        card.parentId = parentId;
      }
    });
    
    // Retorna el arreglo de cartas
    return this.#cards;
  }

  // Método privado para inicializar las cartas
  #initCards() {
    // Tipos de cartas disponibles (pueden ser modificados)
    const typesCards = ["corazones", "naipes"];
    
    // Inicializa el id de las cartas
    let id = 1;
    let cards = [];
    
    // Recorre los tipos de cartas para crear las cartas correspondientes
    typesCards.forEach((element) => {
      for (let i = 0; i < this.#numberOfCards; i++) {
        // Crea una nueva carta con un id único, el tipo de carta y el parentId asignado a 'cards'
        const card = {
            id: id,
            dataset: element,
            classStyle: element,
            parentId: 'cards'
          };

        // Incrementa el id para la siguiente carta
        id++;
        // Añade la carta al arreglo de cartas
        cards.push(card);
      }
    });

    // Retorna el arreglo de cartas creadas
    return cards;
  }

  // Getter para obtener todas las cartas
  get getCards() {
    return this.#cards;
  }
}
