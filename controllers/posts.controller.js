const Post = require("../db/models/posts.model");
const Notification = require("../db/models/notifications.model");

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
  res.render("post", {
    user: req.user,
  });
};

exports.editPost = async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findByIdAndUpdate(postId);

  res.render("edit", {
    post,
    user: req.user,
  });
};

exports.managePost = async (req, res) => {
  const { postId } = req.params;
  const { title } = req.body;
  await Post.findByIdAndUpdate(postId, { title }, { new: true });
  res.redirect("/");
};

exports.likePublication = async (req, res) => {
  try {
    const io = req.app.locals.io;
    const users = req.app.locals.users;

    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId).populate("author");

    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }

    let action;

    if (post.likes.includes(userId)) {
      // UNLIKE
      post.likes.pull(userId);
      action = "unliked";
    } else {
      // LIKE
      post.likes.push(userId);
      action = "liked";

      // 🔔 créer notification (SI pas son propre post)
      // 🔔 créer notification (SI pas son propre post)
      if (!post.author._id.equals(userId)) {
        const existingNotif = await Notification.findOne({
          from: userId,
          to: post.author._id,
          post: post._id,
          type: "like",
        });

        if (!existingNotif) {
          await Notification.create({
            to: post.author._id,
            from: userId,
            type: "like",
            post: post._id,
          });

          // ⚡ temps réel
          const socketId = users.get(post.author._id.toString());
          if (socketId) {
            io.to(socketId).emit("new-notification", {
              type: "like",
              from: req.user.name,
              postId: post._id,
            });
          }
        }
      }
    }

    await post.save();

    res.json({
      success: true,
      action,
      likesCount: post.likes.length,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllNotifications = async (userId) => {
  return await Notification.find({ to: userId })
    .sort({ createdAt: -1 })
    .populate("from", "name surname avatar")
    .populate("post", "title");
};
