const router = require("express").Router();
const User = require("../db/models/user.model");
const { getFriends } = require("../controllers/user.controller");
const {
  getAllPosts,
  getAllNotifications,
} = require("../controllers/posts.controller");
const {
  getAllUsers,
  getSuggestionUsers,
} = require("../controllers/user.controller");
const isAuth = require("../middlewares/isAuth");

router.use(require("./auth"));
router.use(require("./posts"));

router.get("/file", (req, res) => {
  res.render("file");
});

router.get("/", isAuth, async (req, res) => {
  const posts = await getAllPosts();
  const notifications = await getAllNotifications(req.user._id);
  const users = await getSuggestionUsers(req.user);

  res.render("index", {
    posts,
    user: req.user,
    users,
    notifications,
  });
});

router.post("/test", (req, res) => {
  console.log("test valided");
  res.sendStatus(200);
});

router.get("/message", isAuth, async (req, res) => {
  const friends = await getFriends(req.user);

  res.render("message", {
    user: req.user,
    friends,
  });
});

module.exports = router;
