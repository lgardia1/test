// Importa el módulo express para crear las rutas del servidor
import express from 'express';
// Importa el controlador de cartas para gestionar las operaciones sobre las cartas
import CardController from '../Controller/CardController.js';

// Crea una instancia de Router para gestionar las rutas
const route = express.Router();

// Ruta GET para la raíz, responde con un código de estado 200 y un objeto vacío
route.get('/', (req, res) => {
    res.status(200).json();
});

// Ruta GET para obtener las cartas, responde con las cartas guardadas
route.get('/card', (req, res) => {
    try {
        // Obtiene todas las cartas usando el método del controlador
        const cards = CardController.getCards();
        console.log(cards);  // Muestra las cartas en la consola
        // Responde con las cartas en formato JSON y un código de estado 201 (creado)
        res.status(201).json(cards);
    } catch (err) {
        // Si ocurre un error, lo muestra en la consola y responde con un código de estado 400 (Bad Request) y el mensaje de error
        console.log(err);
        res.status(400).json(err.message);
    }
});

// Ruta POST para guardar una nueva carta, recibe datos en el cuerpo de la solicitud
route.post('/card', (req, res) => {
    try {
        // Guarda la nueva carta usando el controlador y los datos del cuerpo de la solicitud
        const card = CardController.saveCard(req.body);
        // Responde con la carta guardada en formato JSON y un código de estado 201 (creado)
        res.status(201).json(card);
    } catch (err) {
        // Si ocurre un error, lo muestra en la consola y responde con un código de estado 400 (Bad Request) y el mensaje de error
        console.log(err);
        res.status(400).json(err.message);
    }
})

// Exporta las rutas definidas para que puedan ser usadas en otros archivos
export default route;
