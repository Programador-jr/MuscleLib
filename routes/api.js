const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Exercise = require('../models/Exercise');

// Carregar o arquivo exercises.json
router.post('/upload-exercises', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '..', 'exercises.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Inserir os exercícios no banco de dados
    await Exercise.insertMany(data);
    res.status(200).send("Exercícios carregados com sucesso.");
  } catch (error) {
    console.error("Erro ao carregar exercícios:", error);
    res.status(500).send("Erro ao carregar exercícios.");
  }
});

module.exports = router;
