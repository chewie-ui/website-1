const Post = require("../db/models/posts.model");

exports.createPost = async (req, res) => {
  const newPost = Post({
    title: req.body.title,
  });

  const creatingPost = await newPost.save();
  res.redirect("/");
};

exports.getAllPosts = async () => {
  return await Post.find({}).sort({ createdAt: -1 });
};
