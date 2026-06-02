const express = require('express');
const { Service } = require('../models');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['sort_order', 'ASC']] });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Titre et description requis' });
    }
    const count = await Service.count();
    const svc = await Service.create({ title, description, icon: icon || 'FaGlobe', sort_order: count });
    res.status(201).json({ id: svc.id, message: 'Service créé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, description, icon, sort_order } = req.body;
    const update = {};
    if (title) update.title = title;
    if (description) update.description = description;
    if (icon) update.icon = icon;
    if (sort_order !== undefined) update.sort_order = sort_order;
    await Service.update(update, { where: { id: req.params.id } });
    res.json({ message: 'Service mis à jour' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Service supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
