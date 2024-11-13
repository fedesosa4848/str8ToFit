const mysql = require('mysql2'); //librería para conectarse a bases de datos MySQL desde Node.js.

// Configurar la conexión a la base de datos MySQL
/**
 *  Crea una conexión a la base de datos MySQL usando 
 * la configuración que se pasa en el objeto:
 */
const db = mysql.createConnection({
  host: 'localhost', //Define el servidor MySQL (en este caso, localhost, porque estás trabajando en mi máquina)
  user: 'root',   //El nombre de usuario de MySQL.
  password: 'pass123456', //La contraseña para conectarse a MySQL
  database: 'NutricionApp', //El nombre de la base de datos 
});

// Conexión a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

/**Conecta al servidor MySQL y verifica si hay algún error.
* Si hay un error, se lanza una excepción (throw err).
* Si no, muestra un mensaje en la consola diciendo que se conectó correctamente.
 */

module.exports = db;  // Exporta la conexión
