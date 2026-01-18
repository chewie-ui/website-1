const router = require("express").Router();
const { createPost, deletePost } = require("../controllers/posts.controller");

router.post("/publish", createPost);
router.delete("/posts/:id", deletePost);

module.exports = router;
