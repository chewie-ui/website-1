const mongoose = require("mongoose");
const envName = process.env.NODE_ENV || "development";
const env = require(`../environment/${envName}`);

console.log("NODE_ENV =", envName);
console.log("env =", env);
console.log("env.dbUrl =", env.dbUrl);

mongoose
  .connect(env.dbUrl)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.error(err));
