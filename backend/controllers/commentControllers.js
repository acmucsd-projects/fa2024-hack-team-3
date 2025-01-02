const Comment = require('../models/commentModel');
const Post = require('../models/postModel'); // Optional, for verifying post existence


// Fetch all comments for a post
const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
            .populate('userId', 'username profilePicture createdAt') // Ensure 'username' exists in User schema
            .sort({ createdAt: 1 });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
    }
}

// Add a new comment to a post
const addCommentToPost = async (req, res) => {
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
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new Comment({ postId, userId, text });
        await newComment.save();

        const populatedComment = await newComment.populate("userId", "username profilePicture createdAt");
        res.status(201).json(populatedComment);
        console.log("New comment created:", populatedComment);
    } catch (error) {
        res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
}

// const editComment = async (req, res) => {
//     const { id } =  req.params; // Comment ID
//     const { text } = req.body;
//     const userId = req.user?.id;

//     try {
//         const comment = await Comment.findById(id);
//         if (!comment) {
//             return res.status(404).json({ message: "Comment not found" });
//         }

//         // Only the comment owner can edit
//         if (comment.userId.toString() !== userId) {
//             return res.status(403).json({ message: "Unauthorized to edit comment" });
//         }

//         comment.text = text;
//         comment.isEdited = true;
//         await comment.save();

//         res.status(200).json(comment);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to edit comment", error: error.message });
//     }
// }

const editComment = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            id,
            { text, isEdited: true }, // Add `isEdited` flag
            { new: true }
        ).populate('userId', 'username profilePicture'); // Populate user details

        if (!updatedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
};


const deleteComment = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;

    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Allow the post owner or comment owner to delete
        const post = await Post.findById(comment.postId);
        if (comment.userId.toString() !== userId && post.userId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await comment.deleteOne();
        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete comment', error: error.message });
    }
};


module.exports = { getCommentsByPostId, addCommentToPost, editComment, deleteComment};