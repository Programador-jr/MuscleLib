require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const exerciseRoutes = require("./api/exerciseRoutes"); // Rota para exercícios
const apiRoutes = require("./api/api");

const dbURI = process.env.MONGODB_URI
const app = express();
const PORT = process.env.PORT;

mongoose.set('strictQuery', false);

// Conexão com MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,  // Tempo de timeout aumentado para 30 segundos
})
.then(() => console.log('MongoDB conectado com Sucesso!'))
.catch(err => console.log('Erro ao conectar ou deletar exercícios:', err));

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Rotas
app.use("/api/exercises", exerciseRoutes); // Integrando a rota de exercícios
app.use("/api", apiRoutes);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
