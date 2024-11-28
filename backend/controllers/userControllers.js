const User = require('../models/userModel');

const createUser = async (req, res) => {
    const { username, emailAddress, courses } = req.body;

    try {
        const user = await User.create({username, emailAddress, courses});
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createUser
}