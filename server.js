const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const User = require("./db/models/user.model");
const multer = require("multer");
const sessionMiddleware = require("./config/session");
const passport = require("passport");
const setCurrentPath = require("./middlewares/setCurrentPath");
console.log("server.js log");

require("./db");
require("./config/passport");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sessionMiddleware);
app.use(setCurrentPath);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports = app;
