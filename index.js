// index.js
const express = require('express');
const mongoose = require('mongoose');
const productoRoutes = require('./routes/produtoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb+srv://Ren_Beccari:AbraCadaBra12@cluster0.muqnu.mongodb.net/pruebaNode?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

//const CONNECTION_URL = 
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

app.use(express.json());
app.use('/api', productoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
