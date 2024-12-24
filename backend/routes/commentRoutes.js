// commentRoutes.js
const express = require('express');
const router = express.Router();
const { getCommentsByPostId, addCommentToPost } = require('../controllers/commentControllers');
const authenticate = require('../middleware/authenticate'); // Import the authenticate middleware

// Fetch all comments for a post
router.get('/:postId/comments', getCommentsByPostId);

// Add a new comment to a post (Requires Authentication)
router.post('/:postId/comments', authenticate, addCommentToPost);

module.exports = router;

