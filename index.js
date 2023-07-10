const express = require("express");
require("dotenv").config();
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGO_DATABASE_URL);

const {
  userPost,
  userGet,
  userPatch,
  userDelete,
} = require("./controllers/userController.js");

const {
  authenticate,
  verifyToken,
} = require("./controllers/sessionController");

const {
  promtDelete,
  promtGet,
  promtPatch,
  promtPost,
} = require("./controllers/promtController.js");

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
app.patch("/api/user", userPatch);
app.delete("/api/user", userDelete);

// Session
app.post("/api/authenticate", authenticate);
app.post("/api/verify", verifyToken);

// Promt

app.post("/api/promt", promtPost);
app.get("/api/promt", promtGet);
app.patch("/api/promt", promtPatch);
app.delete("/api/promt", promtDelete);



app.listen(3001, () => console.log(`Listening on port 3001!`));
