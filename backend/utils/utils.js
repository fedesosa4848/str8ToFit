// backend/utils/utils.js

// Calcular el TMB (Tasa Metabólica Basal) utilizando la fórmula de Harris-Benedict
const calcularTMB = (peso, altura, edad, genero) => {
let tmb;
if (genero === 'masculino') {
    tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
} else {
    tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
}
return tmb;
};

// Calcular el TDEE (Total Daily Energy Expenditure)
const calcularTDEE = (tmb, nivelActividad) => {
const factorActividad = {
    'sedentario': 1.2,
    'ligero': 1.375,
    'moderado': 1.55,
    'intenso': 1.725,
    'muyIntenso': 1.9
};
return tmb * factorActividad[nivelActividad];
};

// Calcular las calorías objetivo (dependiendo del perfil: mantención, volumen, déficit)
const calcularCaloriasObjetivo = (tdee, perfil) => {
if (perfil === 'volumen') {
    return tdee + 500; // Superávit calórico
} else if (perfil === 'deficit') {
    return tdee - 500; // Déficit calórico
} else {
    return tdee; // Mantenimiento
}
};

// Calcular los macronutrientes (proteínas, grasas, carbohidratos) en base a las calorías objetivo y peso
const calcularMacronutrientes = (peso, caloriasObjetivo, perfil) => {
let gramosProteinas, caloriasProteinas, gramosGrasas, caloriasGrasas, caloriasRestantes, gramosCarbohidratos;

// Calcular la cantidad de proteínas en gramos
gramosProteinas = 1.925 * peso; // 1.925 g de proteína por kg de peso corporal
caloriasProteinas = gramosProteinas * 4; // 1 gramo de proteína = 4 calorías

// Calcular la cantidad de grasas en gramos (25% de calorías)
gramosGrasas = (caloriasObjetivo * 0.25) / 9; // 1 gramo de grasa = 9 calorías
caloriasGrasas = gramosGrasas * 9;

// Calcular la cantidad de carbohidratos en gramos con las calorías restantes
caloriasRestantes = caloriasObjetivo - (caloriasProteinas + caloriasGrasas);
gramosCarbohidratos = caloriasRestantes / 4; // 1 gramo de carbohidrato = 4 calorías

// Redondear los valores de macronutrientes
const macronutrientes = {
    proteinas: Math.round(gramosProteinas),
    grasas: Math.round(gramosGrasas),
    carbohidratos: Math.round(gramosCarbohidratos)
};

return macronutrientes;
};

module.exports = { calcularTMB, calcularTDEE, calcularCaloriasObjetivo, calcularMacronutrientes };

