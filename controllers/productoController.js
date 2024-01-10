// controllers/productoController.js
const redis = require('redis');
const client = redis.createClient();
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

    // Consulta el producto recién creado para obtener todos los detalles
    const productoCreado = await Producto.findById(nuevoProducto._id);

    res.status(201).json({message:"Producto agregado con éxito",producto: productoCreado});
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

exports.editarProducto = async (req, res) => {
  try {
    const idProducto = req.params.id;
    const productoActualizado = await Producto.findByIdAndUpdate(
      idProducto,
      req.body,
      { new: true } // Esto devuelve el producto actualizado
    );
    
    if (!productoActualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al editar el producto' });
  }
};