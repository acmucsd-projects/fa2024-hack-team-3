const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, default: "Anonymous" },
        title: { type: String, required: false, trim: true },
        description: { type: String, required: true, trim: true },
        tags: { type: [String], default: ["insert course"]}, 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Associate with use
    }, 
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);