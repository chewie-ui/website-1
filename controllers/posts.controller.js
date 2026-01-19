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

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await post.deleteOne();

    res.json({ success: true });
  } catch (e) {
    console.error(e);
  }
};

exports.showPost = (req, res) => {
  console.log(req.user);

  res.render("post", {
    user: req.user,
  });
};
