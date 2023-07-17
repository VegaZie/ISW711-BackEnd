const mongoose = require("mongoose");

const promtImagesSchema = new mongoose.Schema({
  quantity: { type: String },
  prompt: { type: String },
  size: { type: String },
  response: { type: String },
  userID: { type: String },
});

module.exports = mongoose.model("Promt", promtImagesSchema);
