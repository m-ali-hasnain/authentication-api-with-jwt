const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  userEmail: { type: String, required: true, unique: true, trim: true },
  userPassword: { type: String, required: true },
  token: { type: String, default: "" },
});
module.exports = new mongoose.model("User", userSchema);
