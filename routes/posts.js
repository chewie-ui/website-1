const router = require("express").Router();
const { createPost } = require("../controllers/posts.controller");
router.post("/publish", createPost);

module.exports = router;
