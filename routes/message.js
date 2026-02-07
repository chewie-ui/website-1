const router = require("express").Router();
const isAuth = require("../middlewares/isAuth");

const {
  chooseConv,
  openMessages,
  sendMessage,
} = require("../controllers/message.controller");

router.post("/api/conversations", isAuth, chooseConv);
router.post("/api/messages", isAuth, sendMessage);
router.get("/api/messages/:conversationId", isAuth, openMessages);

module.exports = router;
