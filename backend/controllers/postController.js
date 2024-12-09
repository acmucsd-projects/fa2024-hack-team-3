const Post = require('../models/userPost');  // Import the Post model
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, description, tags, userId } = req.body;

    if (!description) {
      console.log("NO DESCRIPTION");
      return res.status(400).json({ message: 'Description and userId are required' });
    }

    if (!userId) {
      console.log("NO USERID");
      return res.status(400).json({ message: 'Description and userId are required' });
    }

    // if (!description || !userId) {
    //     console.log("ERROR");
    //     return res.status(400).json({ message: 'Description and userId are required' });
    //   }

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

    // Create a new post instance
    const newPost = new Post({
      username: user.username,
      title,
      description,
      tags: tags.length ? tags : [],
      userId: new mongoose.Types.ObjectId(userId),
    });

    // Save the new post to the database
    await newPost.save();

    // Send a response back with the created post
    res.status(201).json(newPost);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
};

module.exports = { createPost };
