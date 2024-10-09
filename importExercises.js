require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Exercise = require('./model/Exercise'); // O modelo de exercício

const dbURI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

// Conectar ao MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Ler o arquivo exercises.json
const exercises = JSON.parse(fs.readFileSync('exercises.json', 'utf-8'));

// Função para salvar os exercícios no MongoDB
async function importExercises() {
  try {
    await Exercise.deleteMany(); // Limpa a coleção antes de inserir novos dados
    await Exercise.insertMany(exercises);
    console.log('Exercícios importados com sucesso!');
    process.exit();
  } catch (error) {
    console.error('Erro ao importar exercícios:', error);
    process.exit(1);
  }
}

// Executar a importação
importExercises();
