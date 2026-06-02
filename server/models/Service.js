const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Service = sequelize.define('Service', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  icon: { type: DataTypes.STRING, defaultValue: 'FaGlobe' },
  sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

module.exports = Service;
