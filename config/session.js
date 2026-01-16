const session = require("express-session");

module.exports = session({
  secret: "super-secret-key",
  resave: false,
  saveUninitialized: false,
});
