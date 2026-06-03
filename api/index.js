const express = require('express');
const cors = require('cors');

let authRoutes, messageRoutes, serviceRoutes, subscriberRoutes;

try {
  authRoutes = require('../server/routes/auth');
  console.log('auth routes loaded');
} catch (e) {
  console.log('auth routes error:', e.message);
}

try {
  messageRoutes = require('../server/routes/messages');
  console.log('message routes loaded');
} catch (e) {
  console.log('message routes error:', e.message);
}

try {
  serviceRoutes = require('../server/routes/services');
  console.log('service routes loaded');
} catch (e) {
  console.log('service routes error:', e.message);
}

try {
  subscriberRoutes = require('../server/routes/subscribers');
  console.log('subscriber routes loaded');
} catch (e) {
  console.log('subscriber routes error:', e.message);
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/debug', (req, res) => {
  res.json({
    authLoaded: !!authRoutes,
    messagesLoaded: !!messageRoutes,
    servicesLoaded: !!serviceRoutes,
    subscribersLoaded: !!subscriberRoutes,
    vercel: process.env.VERCEL,
    nodeEnv: process.env.NODE_ENV
  });
});

module.exports = app;
