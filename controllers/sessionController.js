const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secretKey = process.env.SECRET_KEY;

function generateJWTToken(userData) {
  const { email, role, _id, name } = userData;
  return jwt.sign({ email, role, id_user: _id, name }, secretKey);
}

async function authenticate(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = generateJWTToken(user);

    return res.json({
      token,
      userRole: user.role,
      userId: user._id,
      userName: user.name,
    });
  } catch (error) {
    console.error("Error al autenticar el usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = { authenticate };
