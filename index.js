const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/library");

/*const {
  userPost,
  userGet
} = require("./controllers/userController.js");

const {
  sessionPost
} = require("./controllers/sessionController");
*/

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));


// User
//app.get("/user", a);
//app.post("/user", a);

// Session
//app.post("/session", a);

app.listen(3001, () => console.log(`Listening on port 3001!`))