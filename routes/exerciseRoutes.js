const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// Rota para obter todos os exercícios
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
