const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const User = require("./db/models/user.model");
const multer = require("multer");
const sessionMiddleware = require("./config/session");
const passport = require("passport");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "/uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
});

require("./db");
require("./config/passport");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

// app.post("/file", upload.single("photos"), async (req, res) => {
//   console.log(req.file);
//   console.log(req.isAuthenticated());

//   const newUser = new User({
//     avatar: req.file.filename,
//   });
//   const savedUser = await newUser.save();
//   res.redirect("/");
// });

app.listen(3000);
