const { sequelize, connectDB } = require('../server/db');
const app = require('../server/app');

connectDB()
  .then(() => sequelize.sync())
  .catch(err => console.error('DB sync error:', err.message));

module.exports = app;