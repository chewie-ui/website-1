const router = require("express").Router();
const User = require("../db/models/user.model");

router.use(require("./auth"));
router.use(require("./tweet"));

router.get("/file", (req, res) => {
  res.render("file");
});

router.get("/", async (req, res) => {
  const users = await User.find({});

  const user = users[0];
  console.log(users);

  res.render("index", {
    user: user,
    posts: {
      post: {
        username: "Lanbilote",
        name: "Arnault",
        contentPosts: {
          title: "Les jambons beurre.LD.",
          medias: { images: [], videos: [] },
        },
      },
      post: {
        username: "Lanbilote",
        name: "Arnault",
        contentPosts: {
          title: "Les jambons beurre.LD.",
          medias: { images: [], videos: [] },
        },
      },
      post: {
        username: "Lanbilote",
        name: "Arnault",
        contentPosts: {
          title: "Les jambons beurre.LD.",
          medias: { images: [], videos: [] },
        },
      }
    },
  });
});

module.exports = router;
