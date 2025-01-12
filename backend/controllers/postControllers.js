// const mongoose = require('mongoose');
// const Post = require('../models/postModel');
// const User = require('../models/userModel');
// const Comment = require('../models/commentModel');
import mongoose from 'mongoose';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Comment from '../models/commentModel.js';

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('userId', '_id username profilePicture');

        return res.status(200).json(posts);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById({ _id: id });

        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const createPost = async (req, res) => {
    const { title, description, tags, userId, course} = req.body;

    if (!description) {
        console.log("NO DESCRIPTION");

        return res.status(400).json({ message: 'Description is required' });
    }

    if (!userId) {
        console.log("NO USERID");

        return res.status(400).json({ message: 'userId is required' });
    }

    // Validate and convert userId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log("INVALID ID");

        return res.status(400).json({ message: 'Invalid userId' });
    }
    

    const user = await User.findById(userId);
    if (!user) {
        console.log("NO USER");

        return res.status(404).json({ message: 'User not found' });
    }

    try {
        const post = await Post.create({
            username: user.username,
            title,
            description,
            tags: tags.length ? tags : [],
            userId: user._id,
            profilePicture: user.profilePicture,
            course: course && course.trim() !== '' ? course : null, // Ensure course is set
        });


        const populatedPost = await post.populate('userId', '_id username profilePicture');

        res.status(201).json(populatedPost);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error creating post" });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findOneAndDelete({ _id: id });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Delete all comments associated with the post
        await Comment.deleteMany({ postId: id });
        
        // Check if the authenticated user owns the post
        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this post' });
        }

        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { course, ...otherUpdates } = req.body;

    try {
        // Include course if it's provided in the request
        const updatedData = { 
            ...otherUpdates, 
            isEdited: true, 
            ...(course !== undefined && { course }) // Add course if defined
        };

        const post = await Post.findOneAndUpdate(
            { _id: id },
            updatedData,
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

// module.exports = {
//     getAllPosts,
//     getPost,
//     createPost,
//     deletePost,
//     updatePost
// }

export {getAllPosts, getPost, createPost, deletePost, updatePost};