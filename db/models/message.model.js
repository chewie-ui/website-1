const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema({
  conversation: {
    type: schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },

  from: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  content: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);

const conversationSchema = new schema({
  participants: [
    {
      type: schema.Types.ObjectId,
      ref: "user",
    },
  ],

  lastMessage: {
    type: schema.Types.ObjectId,
    ref: "message",
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = { Message, Conversation };
