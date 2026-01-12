const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

require("./db");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(routes);

app.listen(3000);
