const router = require("express").Router();
const {
  createPost,
  deletePost,
  showPost,
  editPost,
  managePost,
} = require("../controllers/posts.controller");

const isAuth = require("../middlewares/isAuth");

router.post("/publish", createPost);
router.delete("/posts/:id", deletePost);

router.get("/post", showPost);

router.get("/edit/:postId", isAuth, editPost);
router.post("/edit-post/:postId", managePost);

module.exports = router;
