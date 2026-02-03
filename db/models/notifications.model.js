const mongoose = require("mongoose");
const schema = mongoose.Schema;

const notificationsSchema = new schema({
  to: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  from: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "comment", "follow"],
    required: true,
  },
  post: {
    type: schema.Types.ObjectId,
    ref: "post",
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notifications = mongoose.model("Notification", notificationsSchema);

module.exports = Notifications;
