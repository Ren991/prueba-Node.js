// index.js
const express = require('express');
const mongoose = require('mongoose');
const productoRoutes = require('./routes/produtoRoutes');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env


const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.use(express.json());
app.use('/api', productoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
