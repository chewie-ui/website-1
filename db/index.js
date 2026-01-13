const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.error(err));
