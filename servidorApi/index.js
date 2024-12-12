// Importa dotenv para cargar las variables de entorno desde un archivo .env
import dotenv from 'dotenv';
// Carga las variables de entorno definidas en el archivo .env
dotenv.config();

// Importa la aplicación Express desde el archivo correspondiente
import app from './src/express/app.js';

// Obtiene el puerto de las variables de entorno, si no existe, usa el valor predeterminado 3000
const PORT = process.env.PORT ?? 3000;

// Inicia el servidor Express y escucha en el puerto especificado
app.listen(PORT, () => {
    // Muestra en consola el mensaje con la URL donde el servidor está corriendo
    console.log(`Servidor disponible en: http//localhost:${PORT}`)
});
