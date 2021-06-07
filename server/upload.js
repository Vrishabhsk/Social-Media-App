const mongoose = require("mongoose");

const upload = new mongoose.Schema({
  username: String,
  post: String,
  photo: String,
  video: String,
});

module.exports = mongoose.model("Upload", upload);
