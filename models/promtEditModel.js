const mongoose = require("mongoose");

const promtSchema = new mongoose.Schema({
  model: { type: String },
  input: { type: String },
  instruction: { type: String },
  response: { type: String },
  userID: { type: String },
});

module.exports = mongoose.model("Promt", promtSchema);
