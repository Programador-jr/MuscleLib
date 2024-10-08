const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise');

// Rota para obter exercícios paginados
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 50;

        const exercises = await Exercise.find()
            .skip(page * limit)
            .limit(limit);

        console.log("Exercicíos retornados: ", exercises); // Verifica o conteudo
        
        res.json(exercises);
    } catch (err) {
        console.error('Erro ao buscar exercicíos', err.message);

        console.error('Detalhes do erro:', err);
        res.status(500).json({ message: 'Erro ao buscar os exercicíos', error: err.message });
    }
});


module.exports = router;
