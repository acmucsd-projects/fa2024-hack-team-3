const User = require('../models/userModel');
// const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    /*
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Not a valid id' });
    }

    const user = await User.findById({ _id: id });

    if (!user) {
        return res.status(400).json({ error: 'Cannot get this user' });
    }

    res.status(200).json(user);
    */
    try {
        const user = await User.findById({ _id: id });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const createUser = async (req, res) => {
    const { username, emailAddress, courses, anonymous } = req.body;

    try {
        const user = await User.create({ username, emailAddress, courses, anonymous });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    /*
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Not a valid id' });
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
        return res.status(400).json({ error: 'Cannot delete this user' });
    }

    res.status(200).json(user);
    */

    try {
        const user = await User.findOneAndDelete({ _id: id });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;

    /*
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Not a valid id' });
    }

    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!user) {
        return res.status(400).json({ error: 'Cannot update this user' });
    }

    res.status(200).json(user);
    */

    try {
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}