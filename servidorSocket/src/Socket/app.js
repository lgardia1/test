// Importa el controlador de cartas para poder gestionarlas en el servidor
import CardController from './Controller/CardController.js';

// Definición del objeto Socket que maneja las conexiones de Socket.io
const Socket = {
    // Método para inicializar los sockets
    initSockets(io) {
        // Escucha las conexiones entrantes de clientes
        io.on('connection', (socket) => {
            console.log('Se ha conectado un usuario'); // Imprime un mensaje cuando un usuario se conecta

            // Envía a todos los clientes conectados (incluyendo al que se conecta) la lista de cartas
            socket.emit('get-data', CardController.getCards());

            // Escucha el evento 'post-cardsPosition' enviado por un cliente
            socket.on('post-cardsPosition', ({ id, parentId }) => {
                
                // Emite el evento 'get-data' a todos los clientes conectados (menos al emisor) con la carta actualizada
                socket.broadcast.emit('get-data', CardController.saveCard({ id, parentId }));
            });
        });
    }
}

// Exporta el objeto Socket para que pueda ser utilizado en otros módulos
export default Socket;
