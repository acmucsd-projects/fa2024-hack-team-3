const express = require('express');
const { createPost } = require('../controllers/postController');  // Import the controller
const router = express.Router();
const Post = require('../models/userPost'); // Path to your Post model


// Create a new post
router.post('/', createPost); // Use the controller function directly

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();  // Retrieve all posts
        res.status(200).json(posts);      // Respond with the list of posts
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find(); // Use the imported Post model
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
});


// Update a post
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
});

module.exports = router;