const router = require("express").Router();
const User = require("../db/models/user.model");
const { getAllPosts } = require("../controllers/posts.controller");

router.use(require("./auth"));
router.use(require("./posts"));

router.get("/file", (req, res) => {
  res.render("file");
});

router.get("/", async (req, res) => {
  const users = await User.find({});
  const posts = await getAllPosts();

  const user = users[0];
  console.log(users);

  res.render("index", {
    user: { name: "jean", surname: "JEANNN", username: "EZIKEZKEZKEIZ" },
    posts,
  });
});

module.exports = router;
