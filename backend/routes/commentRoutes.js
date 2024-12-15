const express = require('express');
const router = express.Router();
const { getCommentsByPostId, addCommentToPost } = require('../controllers/commentController');

// Fetch all comments for a post
router.get('/:postId/comments', getCommentsByPostId);

// Add a new comment to a post
router.post('/:postId/comments', addCommentToPost);

module.exports = router;
