const mysql = require('mysql2');

// Configurar la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: 'pass123456',
  database: 'NutricionApp',
});

// Conexión a MySQL
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

module.exports = db;  // Exporta la conexión
