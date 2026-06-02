const express = require('express');
const { Message } = require('../models');
const { authenticate } = require('../middleware/auth');
const { notifyNewMessage } = require('../services/notificationService');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nom, email et message requis' });
    }
    const newMsg = await Message.create({ name, email, subject: subject || '', message });
    notifyNewMessage({ name, email, subject: subject || '', message });
    res.status(201).json({ id: newMsg.id, message: 'Message envoyé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/read', authenticate, async (req, res) => {
  try {
    await Message.update({ is_read: true }, { where: { id: req.params.id } });
    res.json({ message: 'Marqué comme lu' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Message.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Message supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
