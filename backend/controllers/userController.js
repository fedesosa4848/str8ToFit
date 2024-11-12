const userModel = require('../models/userModels');
const utils = require('../utils/utils'); // Importamos las funciones de utilidades

// Controlador para crear un nuevo usuario
const createUser = (req, res) => {
  
  //Esta es la data que viene de formData desde el frontend - Va ser necesaria para la creacion del usuario  
  const { email, password, nombre, apellido, edad, peso, altura, genero, perfil, nivelActividad, pais, imagen } = req.body;

  // Dividir los datos en secciones
  const personalInfo = {
    nombre,
    apellido,
    edad,
    genero,
    pais,
    imagen
  };

  const healthInfo = {
    peso,
    altura,
    perfil,
    nivelActividad
  };

  // Calcular datos nutricionales utilizando las funciones del archivo utils.js
  const tmb = utils.calcularTMB(peso, altura, edad, genero);
  const tdee = utils.calcularTDEE(tmb, nivelActividad);
  const caloriasObjetivo = utils.calcularCaloriasObjetivo(tdee, perfil);
  
  const macronutrientes = utils.calcularMacronutrientes({ 
    dataUserNutricional: { caloriasObjetivo }, 
    dataUser: { peso } 
  });

  const nutritionInfo = {
    tmb,
    tdee,
    caloriasObjetivo,
    ...macronutrientes
  };

  // Crear el usuario en la base de datos
  userModel.createUser(email, password, personalInfo, healthInfo, nutritionInfo, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al crear usuario', error: err });
    }
    res.status(201).json(result);
  });
};

// Controlador para obtener todos los usuarios
const getUsers = (req, res) => {
  userModel.getUsers((err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener usuarios', error: err });
    }
    res.status(200).json({ users: result });
  });
};

module.exports = { createUser, getUsers };
