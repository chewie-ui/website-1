const Post = require("../db/models/posts.model");

exports.createPost = async (req, res) => {
  await Post.create({
    title: req.body.title,
    author: req.user._id,
  });

  res.redirect("/");
};

exports.getAllPosts = async () => {
  return await Post.find({})
    .populate("author", "name surname")
    .sort({ createdAt: -1 });
};
