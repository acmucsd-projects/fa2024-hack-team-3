const express = require('express');
const authenticate = require('../middleware/authenticate');
const { accessChat,fetchChat, createGroupChat, renameGroupChat, addToGroup, removeFromGroup} = require('../controllers/chatController')
const Chat = require('../models/chatModel');

const router = express.Router();

router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate, fetchChat);
router.route("/group").post(authenticate, createGroupChat);
router.route("/rename").put(authenticate, renameGroupChat);
router.route("/groupadd").put(authenticate, addToGroup);
router.route("/groupremove").put(authenticate, removeFromGroup);
router.delete('/clear', async (req, res) => {
    try {
      await Chat.deleteMany({}); // 删除所有聊天记录
      res.status(200).json({ message: 'All chat data cleared successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to clear chat data', error });
    }
  });

module.exports = router;