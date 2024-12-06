const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    console.log("Incoming Request Body:", req.body);

    const { username, emailAddress, password, courses, anonymous} = req.body;

    if (!username || !emailAddress || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    try {
        const user = await User.create({username, emailAddress, courses, password, anonymous});
        console.log("Created User: ", user);
        res.status(201).json(user);
    } catch (err) {
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyValue);
            return res.status(400).json({ error: `${duplicateField} is already taken` });
        }
        console.log("Error: ", err);
        res.status(500).json({ error: err.message });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide both username and password' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database\
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Respond with success (in a real-world app, also generate a token)
        const token = jwt.sign({ id: user._id }, process.env.MONGO_URI, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            username: user.username,
            token,
        });
    } catch (err) {
        console.log("Error during login: ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const checkUsername = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    res.status(200).json({ exists: !!user });
};

const checkEmail = async (req, res) => {
    const { emailAddress } = req.body;
    const user = await User.findOne( {emailAddress});
    res.status(200).json({ exists: !!user });
};

module.exports = {
    createUser,
    loginUser,
    checkUsername,
    checkEmail,
}