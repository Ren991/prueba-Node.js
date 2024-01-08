// controllers/productoController.js
const Producto = require('../models/Producto');

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.agregarProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar un nuevo producto' });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const idProducto = req.params.id; // Obtener el ID del producto desde los parámetros de la solicitud
    const productoEliminado = await Producto.findByIdAndDelete(idProducto);

    if (!productoEliminado) {
      // Si no se encuentra el producto con el ID proporcionado, devolver un error 404
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};