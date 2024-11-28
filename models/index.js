const { Sequelize } = require('sequelize');
const sequelize = require('../config/db.config');  // Ruta correcta, sube un nivel a config

// Importar los modelos
const User = require('./user.model');  // Ruta correcta dentro de models
const Bootcamp = require('./bootcamp.model');  // Ruta correcta dentro de models

// Establecer relaciones entre los modelos (muchos a muchos)
User.belongsToMany(Bootcamp, { through: 'user_bootcamp' });
Bootcamp.belongsToMany(User, { through: 'user_bootcamp' });

// Sincronizar la base de datos
sequelize.sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.log("Error al sincronizar la base de datos:", err));

module.exports = { sequelize, User, Bootcamp };






