const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");
// Configura una clave secreta para firmar y verificar tokens JWT
const secretKey = process.env.SECRET_KEY;

// Función para autenticar y generar el token JWT
async function authenticate(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(404).json({ error: "Usuario no válido" });
    }

    // Si las credenciales son válidas, se genera un nuevo token JWT
    const token = jwt.sign({ email, password }, secretKey);

    // Guarda el token en la base de datos para el usuario correspondiente
    user.token = token;
    await user.save();

    return res.json(token);
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Middleware para verificar el token JWT en las rutas protegidas
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    try {
      // Verificar la existencia del usuario en la base de datos
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      // Almacenar el usuario en el objeto de solicitud para usarlo en otras rutas
      res.json(user.token);
      
    } catch (error) {
      console.error("Error al verificar el token:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  });
}

module.exports = { authenticate, verifyToken };
