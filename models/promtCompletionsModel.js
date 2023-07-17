const mongoose = require("mongoose");

const promtCompletionsSchema = new mongoose.Schema({
  model: { type: String },
  prompt: { type: String },
  temperature: { type: Number },
  response: { type: String },
  userID: { type: String },
});

module.exports = mongoose.model("Promt", promtCompletionsSchema);
