require('dotenv').config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.static("public"));


// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
