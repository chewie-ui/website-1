const mongoose = require("mongoose");
const envName = process.env.NODE_ENV || "development";
const env = require(`../environment/${envName}`);

mongoose
  .connect(env.dbUrl)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.error(err));
