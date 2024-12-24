const Comment = require('../models/userComment');
const Post = require('../models/userPost'); // Optional, for verifying post existence
const { io } = require('../bin/www'); 

// Fetch all comments for a post
exports.getCommentsByPostId = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('userId', 'username') // Ensure 'username' exists in User schema
      .sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};


// Add a new comment to a post
exports.addCommentToPost = async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }


  if (!text) {
    console.warn("Invalid comment payload:", req.body);
    return res.status(400).json({ message: "Text is required" });
  }

  try {
    // const post = await Post.findById(postId);
    const post = await Post.findById(postId).populate('userId', 'username');

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = new Comment({ postId, userId, text });
    await newComment.save();

    const populatedComment = await newComment.populate("userId", "username");
    res.status(201).json(populatedComment);
    console.log("New comment created:", populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};

