const User = require("../db/models/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, surname, email, password: hashedPassword });

  res.redirect("/");
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.id");
      res.redirect("/signin");
    });
  });
};
