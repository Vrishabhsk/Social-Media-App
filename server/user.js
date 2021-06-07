const mongoose = require("mongoose");
const Upload = require("./upload");

const user = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String, required: true },
  userPost: [{ type: mongoose.Schema.Types.ObjectId, ref: Upload }],
});

module.exports = mongoose.model("User", user);
