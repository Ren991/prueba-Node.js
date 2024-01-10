const bcrypt = require('bcrypt');
const User = require('../models/Usuario');

exports.register = async (req, res) => {
  try {
      const { name, email, username, password } = req.body;

      // Verificar si el correo electrónico ya existe en la base de datos
      const existingUser = await User.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      }

      // Validar la contraseña
      if (password.length < 8) {
          return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
      }

      // Verificar si hay al menos un carácter especial en la contraseña
      const specialCharRegex = /[\W_]/;
      if (!specialCharRegex.test(password)) {
          return res.status(400).json({ error: 'La contraseña debe contener al menos un carácter especial' });
      }

      // Verificar si hay al menos una letra mayúscula en la contraseña
      const uppercaseRegex = /[A-Z]/;
      if (!uppercaseRegex.test(password)) {
          return res.status(400).json({ error: 'La contraseña debe contener al menos una letra mayúscula' });
      }

      // Hash de la contraseña antes de almacenarla en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ name, email, username, password: hashedPassword });
      await user.save();

      res.json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
      console.log("No se pudo registrar");
      res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;  
      // Buscar al usuario por su correo electrónico
      const user = await User.findOne({ email });  
      if (user && (await bcrypt.compare(password, user.password))) {
        // La contraseña es válida, el usuario está autenticado
  
        // Puedes establecer una sesión o generar un token JWT aquí  
        res.json({ message: 'Login exitoso' });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
  
exports.logout = (req, res) => {
    // Lógica para cerrar la sesión, por ejemplo, eliminar la información de la sesión
  
    // Redireccionar al usuario a la página de inicio de sesión o a donde prefieras
    res.redirect('/login');
  };

exports.getAllUsers = async (req, res) => {
    try {
        // Proyección para seleccionar solo los campos deseados (nombre y email)
        const users = await User.find({}, { name: 1, email: 1 });

        res.json(users);
    } catch (error) {
        console.log("No se pudieron obtener los usuarios");
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};