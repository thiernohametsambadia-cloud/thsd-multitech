const { sequelize, connectDB } = require('./db');
const app = require('./app');

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('DB connection failed:', err);
    process.exit(1);
  });
