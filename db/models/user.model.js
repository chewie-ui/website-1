const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    surname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    avatar: {
      type: String,
      default: null,
    },

    followers: [
      {
        type: schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],

    following: [
      {
        type: schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
