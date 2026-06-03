const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const tests = {};

try {
  tests.bcrypt = !!require('bcryptjs');
} catch (e) { tests.bcrypt = e.message; }

try {
  tests.jsonwebtoken = !!require('jsonwebtoken');
} catch (e) { tests.jsonwebtoken = e.message; }

try {
  tests.data = !!require('../server/data.json');
} catch (e) { tests.data = e.message; }

try {
  tests.store = !!require('../server/store');
} catch (e) { tests.store = e.message; }

try {
  tests.middleware_auth = !!require('../server/middleware/auth');
} catch (e) { tests.middleware_auth = e.message; }

try {
  tests.notification = !!require('../server/services/notificationService');
} catch (e) { tests.notification = e.message; }

try {
  tests.models = !!require('../server/models');
} catch (e) { tests.models = e.message; }

try {
  tests.auth_routes = !!require('../server/routes/auth');
} catch (e) { tests.auth_routes = e.message; }

try {
  tests.messages_routes = !!require('../server/routes/messages');
} catch (e) { tests.messages_routes = e.message; }

try {
  tests.services_routes = !!require('../server/routes/services');
} catch (e) { tests.services_routes = e.message; }

try {
  tests.subscribers_routes = !!require('../server/routes/subscribers');
} catch (e) { tests.subscribers_routes = e.message; }

app.get('/api/debug', (req, res) => {
  res.json(tests);
});

module.exports = app;
