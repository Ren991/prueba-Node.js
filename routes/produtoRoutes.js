// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/productos', productoController.obtenerProductos);
router.post('/productos', productoController.agregarProducto);
router.delete('/productos/:id', productoController.eliminarProducto); // Nueva ruta para eliminar un producto

module.exports = router;
