// config/db.config.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_bootcamp', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false // Desactivar logging del SQL
});

module.exports = sequelize;

  


