// models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Aquí importamos la instancia de sequelize

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = User;



