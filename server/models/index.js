if (process.env.VERCEL) {
  const store = require('../store');
  module.exports = store;
} else {
  const User = require('./User');
  const Service = require('./Service');
  const Message = require('./Message');
  const Subscriber = require('./Subscriber');
  module.exports = { User, Service, Message, Subscriber };
}
