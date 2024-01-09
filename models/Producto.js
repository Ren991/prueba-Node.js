// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  marca:String,
  stock:Number,
  categoria: String,
  imagen: String
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
