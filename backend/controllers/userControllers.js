const User = require('../models/userModel');

const createUser = async (req, res) => {
    const { username, emailAddress, courses, anonymous = false} = req.body;

    if (!username || !emailAddress || !courses) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }
    try {
        const user = await User.create({username, emailAddress, courses});
        console.log("Created User: ", user);
        res.status(201).json(user);
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createUser
}