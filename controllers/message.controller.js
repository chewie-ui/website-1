const { Message, Conversation } = require("../db/models/message.model");

exports.chooseConv = async (req, res) => {
  const { userId } = req.body;
  const me = req.user._id;

  let conversation = await Conversation.findOne({
    participants: { $all: [me, userId], $size: 2 },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [me, userId],
    });
  }

  res.json(conversation);
};

exports.openMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId,
    })
      .populate("from", "name surname avatar")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "cannot load messages" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    if (!content || !conversationId) {
      return res.status(400).json({ error: "missing data" });
    }

    const message = await Message.create({
      conversation: conversationId,
      from: req.user._id,
      content,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
      updatedAt: Date.now(),
    });

    const populatedMessage = await message.populate(
      "from",
      "name surname avatar",
    );

    req.app.locals.io.to(conversationId).emit("new-message", populatedMessage);

    res.json(populatedMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "cannot send message" });
  }
};
