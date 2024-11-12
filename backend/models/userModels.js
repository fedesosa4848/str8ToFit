// backend/models/userModel.js
const db = require('../config/db');

// Crear un nuevo usuario
const createUser = (email, password, personalInfo, healthInfo, nutritionInfo, callback) => {
const userQuery = 'INSERT INTO User (email, password) VALUES (?, ?)';
db.query(userQuery, [email, password], (err, result) => {
if (err) {
    return callback(err, null);
}

const userId = result.insertId; // Obtenemos el ID del nuevo usuario

// Insertar información personal
const personalInfoQuery = 'INSERT INTO PersonalInfo (userId, nombre, apellido, edad, genero, pais, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)';
db.query(personalInfoQuery, [userId, personalInfo.nombre, personalInfo.apellido, personalInfo.edad, personalInfo.genero, personalInfo.pais, personalInfo.imagen], (err, result) => {
    if (err) {
    return callback(err, null);
    }

    // Insertar información de salud
    const healthInfoQuery = 'INSERT INTO HealthInfo (userId, peso, altura, perfil, nivelActividad) VALUES (?, ?, ?, ?, ?)';
    db.query(healthInfoQuery, [userId, healthInfo.peso, healthInfo.altura, healthInfo.perfil, healthInfo.nivelActividad], (err, result) => {
    if (err) {
        return callback(err, null);
    }

    // Insertar información nutricional
    const nutritionInfoQuery = 'INSERT INTO NutritionInfo (userId, tmb, tdee, caloriasObjetivo) VALUES (?, ?, ?, ?)';
    db.query(nutritionInfoQuery, [userId, nutritionInfo.tmb, nutritionInfo.tdee, nutritionInfo.caloriasObjetivo], (err, result) => {
        if (err) {
        return callback(err, null);
        }

        // Insertar macronutrientes
        const macronutrientsQuery = 'INSERT INTO Macronutrients (nutritionInfoId, proteinas, grasas, carbohidratos) VALUES (?, ?, ?, ?)';
        db.query(macronutrientsQuery, [result.insertId, nutritionInfo.proteinas, nutritionInfo.grasas, nutritionInfo.carbohidratos], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, { message: 'Usuario creado con éxito' });
        });
    });
    });
});
});
};

// Obtener todos los usuarios con su información personal
const getUsers = (callback) => {
    const query = `
    SELECT u.id, u.email, p.nombre, p.apellido
    FROM user AS u
    INNER JOIN PersonalInfo AS p ON p.userID = u.id
    `;
    db.query(query, callback);
};


module.exports = { createUser, getUsers };
