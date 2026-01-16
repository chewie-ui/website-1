const router = require("express").Router();
const passport = require("passport");
const { register, logout } = require("../controllers/user.controller");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signup", register);

router.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signin",
  })
);

router.get('/logout', logout)

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
