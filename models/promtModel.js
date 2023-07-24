const mongoose = require("mongoose");

const promtSchema = new mongoose.Schema({
  model: { type: String },
  input: { type: String },
  instruction: { type: String },
  prompt: { type: String },
  temperature: { type: Number },
  quantity: { type: String },
  size: { type: String },
  response: { type: String },
  userID: { type: String },
  tags: { type: [String] },
});

module.exports = mongoose.model("Promt", promtSchema);
