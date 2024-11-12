// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear un nuevo usuario
router.post('/users', userController.createUser);

// Ruta para obtener todos los usuarios
router.get('/users', userController.getUsers);

router.get('/api', (req, res) => {
    console.log("Ruta /api accesada");
    res.json({ message: 'Bienvenido a la API' });
});


module.exports = router;
