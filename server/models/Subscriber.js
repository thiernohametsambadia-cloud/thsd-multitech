const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Subscriber = sequelize.define('Subscriber', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true, lowercase: true },
  name: { type: DataTypes.STRING, defaultValue: '' },
  phone: { type: DataTypes.STRING, defaultValue: '' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { timestamps: true });

module.exports = Subscriber;
