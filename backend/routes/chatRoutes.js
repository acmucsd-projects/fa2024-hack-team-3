const express = require('express');
const authenticate = require('../middleware/authenticate');
const { accessChat,fetchChat, createGroupChat, renameGroupChat, addToGroup, removeFromGroup} = require('../controllers/chatController')

const router = express.Router();

router.route("/").post(authenticate, accessChat);
router.route("/").get(authenticate, fetchChat);
router.route("/group").post(authenticate, createGroupChat);
router.route("/rename").post(authenticate, renameGroupChat);
router.route("/groupadd").post(authenticate, addToGroup);
router.route("/groupremove").post(authenticate, removeFromGroup);

module.exports = router;