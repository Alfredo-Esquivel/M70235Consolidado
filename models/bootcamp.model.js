// models/bootcamp.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Asegúrate de que esta configuración exista

/*class Bootcamp extends Model {}

Bootcamp.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.STRING,
  },
}, {
  sequelize, // Pasamos la instancia de sequelize aquí
  modelName: 'Bootcamp', // Le damos el nombre del modelo
  timestamps: true,
});

module.exports = Bootcamp;*/


const Bootcamp = sequelize.define('Bootcamp', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,  // Asegúrate de que `title` sea obligatorio
  },
  cue: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Asegúrate de que `cue` sea obligatorio
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,  // Descripción también es importante
  }
}, {
  timestamps: true // Esto agrega `createdAt` y `updatedAt` automáticamente
});

module.exports = Bootcamp;


