const express = require('express');
const { Subscriber } = require('../models');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const subscribers = await Subscriber.findAll({ order: [['createdAt', 'DESC']] });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, name, phone } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Subscriber.findOne({ where: { email: normalizedEmail } });
    if (existing) {
      if (!existing.is_active) {
        const update = { is_active: true };
        if (name) update.name = name;
        if (phone) update.phone = phone;
        await Subscriber.update(update, { where: { id: existing.id } });
        return res.json({ message: 'Abonnement réactivé avec succès' });
      }
      return res.status(409).json({ error: 'Cet email est déjà abonné' });
    }

    await Subscriber.create({ email: normalizedEmail, name: name || '', phone: phone || '' });
    res.status(201).json({ message: 'Inscription réussie ! Vous recevrez nos offres et publications par email.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Subscriber.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Abonné supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
