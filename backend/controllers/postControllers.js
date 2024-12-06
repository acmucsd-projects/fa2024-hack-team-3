const Post = require('../models/postModel');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 });

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
    const { username, title, description, tags, userId } = req.body;

    try {
        const post = await Post.create({ username, title, description, tags, userId });
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findOneAndDelete({ _id: id });

        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findOneAndUpdate({ _id: id }, { ...req.body });
        
        return res.status(200).json(post);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}
