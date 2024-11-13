// backend/utils/utils.js

// Calcular el TMB (Tasa Metabólica Basal) utilizando la fórmula de Harris-Benedict
const calcularTMB = (peso, altura, edad, genero) => {
let tmb;
if (genero === 'masculino') {
    tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
} else {
    tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
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
    return tdee * 1.2; // Superávit calórico
} else if (perfil === 'deficit') {
    return tdee * 0.875; // Déficit calórico
} else {
    return tdee; // Mantenimiento
}
};

const calcularMacronutrientes = (peso, caloriasObjetivo, perfil) => {
    let gramosProteinas, gramosGrasas, gramosCarbohidratos;
    
    // Configuración de porcentajes basada en el perfil
    let porcentajeCarbohidratos, porcentajeProteinas, porcentajeGrasas;
    
    if (perfil === 'volumen') {
        porcentajeCarbohidratos = 0.55;
        porcentajeProteinas = 0.30;
        porcentajeGrasas = 0.15;
    } else if (perfil === 'deficit') {
        porcentajeCarbohidratos = 0.30;
        porcentajeProteinas = 0.45;
        porcentajeGrasas = 0.25;
    } else if (perfil === 'mantencion') {
        porcentajeCarbohidratos = 0.45;
        porcentajeProteinas = 0.35;
        porcentajeGrasas = 0.20;
    } else {
        throw new Error("Perfil no válido. Usa 'volumen', 'deficit' o 'mantencion'.");
    }

    // Calcular los macronutrientes en gramos
    gramosProteinas = (caloriasObjetivo * porcentajeProteinas) / 4; // 1 gramo de proteína = 4 calorías
    gramosGrasas = (caloriasObjetivo * porcentajeGrasas) / 9; // 1 gramo de grasa = 9 calorías
    gramosCarbohidratos = (caloriasObjetivo * porcentajeCarbohidratos) / 4; // 1 gramo de carbohidrato = 4 calorías

    // Redondear los valores de macronutrientes
    return {
        proteinas: Math.round(gramosProteinas),
        grasas: Math.round(gramosGrasas),
        carbohidratos: Math.round(gramosCarbohidratos)
    };
};


module.exports = { calcularTMB, calcularTDEE, calcularCaloriasObjetivo, calcularMacronutrientes };

