const router = require("express").Router();
const passport = require("passport");
const { register, logout, profile } = require("../controllers/user.controller");
const User = require("../db/models/user.model");

const uploadAvatar = require("../middlewares/uploadAvatar");

router.post(
  "/profile/avatar",
  uploadAvatar.single("avatar"),
  async (req, res) => {
    if (!req.file) {
      return res.redirect("back");
    }

    await User.findByIdAndUpdate(req.user._id, {
      avatar: `/avatars/${req.file.filename}`,
    });

    res.redirect(`/profile/${req.user._id}`);
  }
);

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

router.get("/logout", logout);

router.get("/profile/:userId", profile);

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
