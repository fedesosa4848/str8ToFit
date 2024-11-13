const express = require('express'); //framework para Node.js 
/**
 *  Es un middleware que permite o restringe el acceso de otros dominios a tu API. 
 * En este caso, lo estamos usando para permitir que la aplicación pueda hacer peticiones a este servidor.
 */
const cors = require('cors'); 
/**
 * Es un middleware que ayuda a procesar el cuerpo de las solicitudes HTTP en JSON, lo cual es útil para recibir datos en peticiones POST
 */
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

// importar la conexión a la base de datos
const db = require('./config/db');  // Esto asegura que la base de datos se conecte

/**
 * Crea una aplicación Express.
 */
const app = express();
const port = 3000;


/**
 * Activa CORS para permitir que aplicaciones en otros dominios
 *  (por ejemplo, en esta app en localhost:4200) 
 * puedan hacer peticiones a este servidor en localhost:3000.
 */
app.use(cors()); //Activa CORS para permitir que aplicaciones en otros dominio
/**
 * Configura el servidor para que pueda leer datos en formato JSON que se envían en el 
 * cuerpo de las solicitudes (por ejemplo, en las peticiones POST).
 */
app.use(bodyParser.json());

// Usar las rutas de usuario
app.use('/api', userRoutes);

// Probar la conexión a la base de datos con una consulta simple
db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Error al ejecutar consulta: ', err);
  } else {
    console.log('Consulta ejecutada con éxito, conexión a la base de datos está bien');
  }
});


/**
 * Inicia el servidor en el puerto 3000.
  Cuando el servidor se inicia, muestra un mensaje en la consola con la dirección del servidor
 */
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
