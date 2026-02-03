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

  const profileUser = await User.findById(userId)
    .populate("followers", "name surname avatar")
    .populate("following", "name surname avatar");

  if (!profileUser) {
    return res.status(404).send("Utilisateur introuvable");
  }

  let isFollowing = false;
  let isOwnProfile = false;

  if (req.user) {
    isFollowing = profileUser.followers.some((followerId) =>
      followerId.equals(req.user._id),
    );

    isOwnProfile = req.user._id.equals(profileUser._id);
  }

  const posts = await Post.find({ author: userId })
    .populate("author", "name surname avatar")
    .sort({ createdAt: -1 });

  res.render("profile", {
    profileUser,
    followersCount: profileUser.followers.length,
    followingCount: profileUser.following.length,
    isFollowing,
    isOwnProfile,
    posts,
    user: req.user,
  });
};

exports.followingSystem = async (req, res) => {
  const targetUserId = req.params.userId;
  const currentUserId = req.user._id;

  if (targetUserId === currentUserId.toString()) {
    return res.status(400).json({ error: "Impossible de se follow soi-meme" });
  }

  const targetUser = await User.findById(targetUserId);
  const currentUser = await User.findById(currentUserId);

  if (!targetUser) {
    return res.status(404).json({ error: "Utilisateur introuvable" });
  }

  const isFollowing = targetUser.followers.some((id) =>
    id.equals(currentUserId),
  );

  if (isFollowing) {
    // UNFOLLOW
    targetUser.followers.pull(currentUserId);
    currentUser.following.pull(targetUserId);
  } else {
    // FOLLOW
    targetUser.followers.push(currentUserId);
    currentUser.following.push(targetUserId);
  }

  await targetUser.save();
  await currentUser.save();

  res.json({
    isFollowing: !isFollowing,
    followersCount: targetUser.followers.length,
  });
};

exports.getAllUsers = async () => {
  return await User.find({}).sort({ createdAt: -1 }).limit(5);
};

exports.getSuggestionUsers = async (currentUser) => {
  return await User.find({
    _id: {
      $ne: currentUser._id, // exclure soi-même
      $nin: [...currentUser.following, ...currentUser.hiddenSuggestions], // exclure les users déjà suivis
    },
  })
    .sort({ createdAt: -1 })
    .limit(5);
};

exports.isUserFriend = async (userAId, userBId) => {
  const userA = await User.findById(userAId).select("followers following");

  if (!userA) return false;

  return userA.following.includes(userBId) && userA.followers.includes(userBId);
};

exports.getFriends = async (user) => {
  const friendIds = user.following.filter((id) =>
    user.followers.some((followerId) => followerId.equals(id)),
  );

  return await User.find({ _id: { $in: friendIds } });
};

exports.hideSuggestion = async (req, res) => {
  const targetId = req.params.userId;
  console.log(targetId);

  const userId = req.user._id;
  await User.findOneAndUpdate(userId, {
    $addToSet: { hiddenSuggestions: targetId },
  });

  res.json({ status: "ok" });
};
