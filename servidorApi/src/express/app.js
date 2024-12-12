// Importa el módulo express para crear el servidor
import express from 'express';
// Importa el archivo que maneja las rutas del servidor
import handleRoutes from './routes/routes.js'
// Importa el middleware de CORS para permitir solicitudes de diferentes dominios
import cors from 'cors';

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para parsear los cuerpos de las solicitudes como JSON
app.use(express.json())

// Middleware para permitir solicitudes desde cualquier origen (CORS)
app.use(cors());

// Usa las rutas definidas en el archivo 'routes.js' para manejar las solicitudes que lleguen a la raíz
app.use('/', handleRoutes);

// Exporta la instancia de la aplicación para que pueda ser utilizada en otros módulos
export default app;
