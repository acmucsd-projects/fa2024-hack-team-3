const User = require('../models/userModel');

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

module.exports = {
    createUser
}