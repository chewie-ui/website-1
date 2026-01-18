const router = require("express").Router();
const User = require("../db/models/user.model");
const { getAllPosts } = require("../controllers/posts.controller");
const isAuth = require("../middlewares/isAuth");

router.use(require("./auth"));
router.use(require("./posts"));

router.get("/file", (req, res) => {
  res.render("file");
});

router.get("/", isAuth, async (req, res) => {
  const posts = await getAllPosts();
  console.log(posts);

  res.render("index", {
    posts,
    user: req.user,
  });
});

module.exports = router;
