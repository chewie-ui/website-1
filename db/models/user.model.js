const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: String,
  password: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
