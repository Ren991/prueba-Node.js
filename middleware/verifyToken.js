const jwt = require('jsonwebtoken');
const secretKey = 'clave_secreta';

// Middleware para verificar token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Agrega el usuario decodificado al objeto de solicitud
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = verifyToken;
