const express = require("express");
require('dotenv').config()
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGO_DATABASE_URL);

const {
  userPost,
  userGet
} = require("./controllers/userController.js");

const {
  authenticate,
  verifyToken,
} = require("./controllers/sessionController");

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

// User
app.get("/api/user", userGet);
app.post("/api/user", userPost);

// Session
app.post("/api/authenticate", authenticate);
app.post("/api/verify", verifyToken); 

app.listen(3001, () => console.log(`Listening on port 3001!`));