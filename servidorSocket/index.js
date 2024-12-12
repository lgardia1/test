// Cargar las variables de entorno desde el archivo .env
import dotenv from 'dotenv';
dotenv.config();

// Importación de módulos necesarios
import http from 'node:http'; // Módulo HTTP de Node.js
import { Server } from 'socket.io'; // Importar Server de Socket.io
import Socket from './src/Socket/app.js'; // Importación de la configuración de Socket

// Crear el servidor HTTP
const server = http.createServer();

// Crear la instancia de Socket.io con configuración de CORS
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir todas las conexiones (cualquier origen)
        methods: ["GET", "POST"],  // Permitir métodos GET y POST
        allowedHeaders: ["Content-Type"], // Permitir el header Content-Type
        credentials: true // Permitir el envío de credenciales (cookies, autenticación)
    }
});

// Inicializar las conexiones de socket
Socket.initSockets(io);

// Definir el puerto del servidor, primero intenta usar el valor de la variable de entorno PORT, sino usa 2000
const PORT = process.env.PORT ?? 2000;

// Iniciar el servidor en el puerto definido y mostrar un mensaje en la consola
server.listen(PORT, () => {
    console.log(`Servidor disponible en: http://localhost:${PORT}`); // Mensaje indicando que el servidor está corriendo
});
