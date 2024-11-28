// config/db.config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_bootcamp', 'postgres', 'Lucas8', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false // Desactivar logging de SQL
});

module.exports = sequelize;

  


