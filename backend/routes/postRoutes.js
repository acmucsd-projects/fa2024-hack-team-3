const express = require('express');
const { getAllPosts, getPost, createPost, deletePost, updatePost } = require('../controllers/postControllers');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);

router.post('/', createPost);

router.delete('/:id', authenticate, deletePost);

router.patch('/:id', updatePost);

module.exports = router;
