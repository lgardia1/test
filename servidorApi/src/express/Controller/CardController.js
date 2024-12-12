// Controla las cartas (gestión de las cartas)
const CardController = {
  // Array para almacenar las cartas
  cards: [],

  // Método para guardar una carta
  saveCard: function ({ id: cardId, parentId: parentid }) {
    // Crea un objeto carta con el id y el parentId
    const card = {
      id: cardId,
      parentId: parentid
    };

    // Agrega la carta al array de cartas
    this.cards.push(card);

    // Devuelve la carta recién creada
    return card;
  },

  // Método para obtener todas las cartas almacenadas
  getCards: function () {
    // Devuelve el array de cartas
    return this.cards;
  },
};

// Exporta el objeto CardController para que pueda ser utilizado en otros módulos
export default CardController;
