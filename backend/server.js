const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

// Asegúrate de importar la conexión a la base de datos
const db = require('./config/db');  // Esto asegura que la base de datos se conecte

const app = express();
const port = 3000;

app.use(cors());
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

app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
