const express = require("express");
require("dotenv").config();
const app = express();

// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGO_DATABASE_URL);
const secretKey = process.env.SECRET_KEY;
const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const {
  userPost,
  userGet,
  userPatch,
  userDelete,
} = require("./controllers/userController.js");

const { authenticate } = require("./controllers/sessionController");

const {
  promtEditDelete,
  promtEditGet,
  promtEditPatch,
  promtEditPost,
} = require("./controllers/promtEditController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(
  cors({
    domains: "*",
    methods: "*",
  })
);

// Session
app.post("/api/authenticate", authenticate);

//user create
app.post("/api/user", userPost);

// Middleware para verificar el token JWT en las rutas protegidas
app.use(async function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, secretKey);

    // Verificar la existencia del usuario en la base de datos
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // Almacenar el usuario en el objeto de solicitud para usarlo en otras rutas
    req.user = user;
    next(); // Continuar con la siguiente función en la cadena de middleware
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expirado" });
    }
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
});

// User
app.get("/api/user", userGet);
app.patch("/api/user", userPatch);
app.delete("/api/user", userDelete);

// Promt
app.post("/api/promt", promtPost);
app.get("/api/promt", promtGet);
app.patch("/api/promt", promtPatch);
app.delete("/api/promt", promtDelete);

app.listen(3001, () => console.log(`Listening on port 3001!`));
