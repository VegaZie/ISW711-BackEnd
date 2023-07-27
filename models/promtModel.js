const mongoose = require("mongoose");

const promtSchema = new mongoose.Schema({
  name: { type: String },
  model: { type: String },
  input: { type: String },
  instruction: { type: String },
  promt: { type: String },
  temperature: { type: Number },
  quantity: { type: Number },
  size: { type: String },
  response: { type: String },
  imageresponse: { type: [String] },
  userID: { type: String },
  tags: { type: [String] },
  type: { type: String },
});

module.exports = mongoose.model("Promt", promtSchema);
