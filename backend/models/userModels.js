// backend/models/userModel.js
const db = require('../config/db');

// Crear un nuevo usuario en la base de datos
const createUser = (email, password, personalInfo, healthInfo, nutritionInfo, callback) => {
    // Query para insertar al usuario
    const userQuery = 'INSERT INTO User (email, password) VALUES (?, ?)';
    db.query(userQuery, [email, password], (err, result) => {
        if (err) return callback(err, null);

        const userId = result.insertId;

        // Query para insertar la información personal
        const personalInfoQuery = 'INSERT INTO PersonalInfo (userId, nombre, apellido, edad, genero, pais, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(personalInfoQuery, [userId, personalInfo.nombre, personalInfo.apellido, personalInfo.edad, personalInfo.genero, personalInfo.pais, personalInfo.imagen], (err) => {
            if (err) return callback(err, null);

            // Query para insertar la información de salud
            const healthInfoQuery = 'INSERT INTO HealthInfo (userId, peso, altura, perfil, nivelActividad) VALUES (?, ?, ?, ?, ?)';
            db.query(healthInfoQuery, [userId, healthInfo.peso, healthInfo.altura, healthInfo.perfil, healthInfo.nivelActividad], (err) => {
                if (err) return callback(err, null);

                // Query para insertar la información nutricional
                const nutritionInfoQuery = 'INSERT INTO NutritionInfo (userId, tmb, tdee, caloriasObjetivo) VALUES (?, ?, ?, ?)';
                db.query(nutritionInfoQuery, [userId, nutritionInfo.tmb, nutritionInfo.tdee, nutritionInfo.caloriasObjetivo], (err, result) => {
                    if (err) return callback(err, null);

                    const nutritionInfoId = result.insertId;

                    // Query para insertar los macronutrientes
                    const macronutrientsQuery = 'INSERT INTO Macronutrients (nutritionInfoId, proteinas, grasas, carbohidratos) VALUES (?, ?, ?, ?)';
                    db.query(macronutrientsQuery, [nutritionInfoId, nutritionInfo.proteinas, nutritionInfo.grasas, nutritionInfo.carbohidratos], (err) => {
                        if (err) return callback(err, null);

                        callback(null, { message: 'Usuario creado con éxito' });
                    });
                });
            });
        });
    });
};

const getUsers = (callback) => {
    const query = `
    SELECT 
        u.id AS user_id, 
        u.email, 
        u.password,
        pi.nombre, 
        pi.apellido, 
        pi.edad, 
        pi.genero, 
        pi.pais, 
        pi.imagen,
        hi.peso, 
        hi.altura, 
        hi.perfil, 
        hi.nivelActividad,
        ni.tmb, 
        ni.tdee, 
        ni.caloriasObjetivo, 
        ni.fecha_calculo,
        m.proteinas, 
        m.grasas, 
        m.carbohidratos
    FROM 
        User u
    LEFT JOIN 
        PersonalInfo pi ON u.id = pi.userId
    LEFT JOIN 
        HealthInfo hi ON u.id = hi.userId
    LEFT JOIN 
        NutritionInfo ni ON u.id = ni.userId
    LEFT JOIN 
        Macronutrients m ON ni.id = m.nutritionInfoId;
    `;
    db.query(query, callback);
};



module.exports = { createUser, getUsers };
