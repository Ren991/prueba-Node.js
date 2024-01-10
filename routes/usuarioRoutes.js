// En usuarioRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registro de usuario
router.post('/auth/register', authController.register);
// Ruta para inicio de sesión
router.post('/auth/login', authController.login);
// Ruta para cierre de sesión
router.get('/auth/logout', authController.logout);
// Ruta para ver los usuarios
router.get('/users', authController.getAllUsers);

module.exports = router;
