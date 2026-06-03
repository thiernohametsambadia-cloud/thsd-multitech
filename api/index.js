const express = require('express');
const cors = require('cors');

const authRoutes = require('../server/routes/auth');
const messageRoutes = require('../server/routes/messages');
const serviceRoutes = require('../server/routes/services');
const subscriberRoutes = require('../server/routes/subscribers');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = app;
