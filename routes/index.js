const router = require("express").Router();

router.use(require("./auth"));

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
