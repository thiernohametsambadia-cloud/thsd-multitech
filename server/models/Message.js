const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Message = sequelize.define('Message', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  subject: { type: DataTypes.STRING, defaultValue: '' },
  message: { type: DataTypes.TEXT, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true });

module.exports = Message;
