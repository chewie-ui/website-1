const router = require("express").Router();
const { createPost, deletePost, showPost } = require("../controllers/posts.controller");

router.post("/publish", createPost);
router.delete("/posts/:id", deletePost);

router.get("/post", showPost)

module.exports = router;
