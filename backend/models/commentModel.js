const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
            index: true, // Add index for faster queries
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
            maxlength: 1000, // Example maximum length
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        isEdited: {
            type: Boolean,
            default: false,
        },
    }
);

// Optionally, add compound index if needed
// commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ text: 'text' });

module.exports = mongoose.model('Comment', commentSchema);
