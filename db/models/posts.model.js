const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
