const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {sendMessage, allMessages} = require('../controllers/messageController');
const Message = require('../models/messageModel');

router.route('/').post(authenticate, sendMessage);
router.route('/:chatId').get(authenticate, allMessages);
router.delete('/clear', async (req, res) => {
    try {
      await Message.deleteMany({}); 
      res.status(200)
    } catch (error) {
      res.status(500).json({ message: 'Failed to clear message data', error });
    }
  });

module.exports = router;