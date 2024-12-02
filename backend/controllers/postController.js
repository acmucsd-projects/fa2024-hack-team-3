const Post = require('../models/userPost');  // Import the Post model

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, description, tags, userId } = req.body;

    if (!description || !userId) {
        return res.status(400).json({ message: 'Description and userId are required' });
      }

    // Create a new post instance
    const newPost = new Post({
      title,
      description,
      tags: tags.length ? tags : [],
      userId,
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
