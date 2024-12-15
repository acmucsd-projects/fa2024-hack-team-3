const Comment = require('../models/userComment');
const Post = require('../models/userPost'); // Optional, for verifying post existence

// Fetch all comments for a post
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('userId', 'username') // Populate user details if needed
      .sort({ createdAt: 1 }); // Sort comments by creation time (oldest first)

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};

// Add a new comment to a post
exports.addCommentToPost = async (req, res) => {
  const { postId } = req.params;
  const { userId, text } = req.body;

  if (!text || !userId) {
    return res.status(400).json({ message: 'Text and userId are required' });
  }

  try {
    // Optionally check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = new Comment({ postId, userId, text });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};
