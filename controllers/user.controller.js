const User = require("../db/models/user.model");
const Post = require("../db/models/posts.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
  });
  try {
    req.login(user, (err) => {
      return res.redirect("/");
    });
  } catch (err) {}
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

exports.profile = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .populate("followers", "name surname avatar")
    .populate("following", "name surname avatar");

  if (!user) {
    return res.status(404).send("Utilisateur introuvable");
  }

  let isFollowing = false;

  if (req.user) {
    isFollowing = user.followers.includes(req.user._id);
  }
  const posts = await Post.find({ author: userId })
    .populate("author", "name surname avatar")
    .sort({ createdAt: -1 });
  res.render("profile", {
    profileUser: user,
    followersCount: user.followers.length,
    followingCount: user.following.length,
    isFollowing,
    posts,
  });
};
