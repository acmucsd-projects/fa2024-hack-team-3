const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });

        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById({ _id: id });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const createUser = async (req, res) => {
    const { username, emailAddress, password, courses, anonymous } = req.body;

    if (!username || !emailAddress || !password) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    try {
        const user = await User.create({username, emailAddress, courses, password, anonymous});

        return res.status(201).json(user);
    } catch (err) {
        if (err.code === 11000) {
            const duplicateField = Object.keys(err.keyValue);

            return res.status(400).json({ error: `${duplicateField} is already taken` });
        }

        return res.status(400).json({ error: err.message });
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

        // Respond with success (in a real-world app, also generate a token), replaced _id with id!
        const token = jwt.sign({ id: user._id, username: user.username, profilePicture: user.profilePicture }, process.env.MONGO_URI, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
            token,
        });
    } catch (err) {
        console.log("Error during login: ", err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const checkUsername = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
    res.status(200).json({ exists: !!user });
}

const checkEmail = async (req, res) => {
    const { emailAddress } = req.body;
    const user = await User.findOne( {emailAddress});
    res.status(200).json({ exists: !!user });
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndDelete({ _id: id });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { _id: id }, 
            { ...req.body }, 
            { new: true}); // Returns the updated user
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a new token with updated information
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
            },
            process.env.MONGO_URI,
            { expiresIn: '1h' }
        );

        // Respond with updated user and new token
        return res.status(200).json({
            message: "User updated successfully",
            user,
            token,
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage
const storage = multer.diskStorage({});
const upload = multer({ storage });

const uploadProfilePicture = async (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: 'Please provide an image' });
    }

    try {
        // Upload file buffer to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'profile_pictures' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary Upload Error:', error);
                        reject(new Error('Failed to upload image'));
                    } else {
                        resolve(result);
                    }
                }
            );
            stream.end(req.file.buffer);
        })

        //Update user in the database
        const user = await User.findOneAndUpdate(
            { _id: id },
            { profilePicture: result.secure_url },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a new token with updated profile picture
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
            },
            process.env.MONGO_URI,
            { expiresIn: '1h' }
        );
            
        res.status(200).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword} = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: "Please provide all fields." });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match." });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if the current password is correct
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Current password is incorrect." });
        }


        // Update the password
        user.password = newPassword;
        await user.save();

        // Optionally create a new token
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                profilePicture: user.profilePicture,
            },
            process.env.MONGO_URI,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: "Failed to update password."});
    }
};

const getLoggedInUser = async (req, res) => {
    try {
        // Use the authenticated user's ID from `req.user`
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({
            id: user._id,
            username: user.username,
            emailAddress: user.emailAddress,
            courses: user.courses,
            profilePicture: user.profilePicture,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

const updateCourses = async (req, res) => {
    const { courses, remove } = req.body; // Expect an array of course
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (remove) {
            // Remove courses matching names in the array
            user.courses = user.courses.filter(
                (existingCourse) => !courses.some((course) => course.name === existingCourse.name)
            );
        } else {
            // Add unique courses from the array
            courses.forEach((course) => {
                if (!user.courses.some((existingCourse) => existingCourse.name === course.name)) {
                    user.courses.push({ name: course.name });
                }
            });
        }

        await user.save();
        res.status(200).json({ courses: user.courses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update courses' });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user details
        const user = await User.findById(userId).select('username emailAddress courses profilePicture');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch user's posts
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });

        // Fetch user's comments
        const comments = await Comment.find({ userId })
            .populate('postId', 'title')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            user,
            posts,
            comments
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

const getUserCourses = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user.courses);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  };
  

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    loginUser,
    checkUsername,
    checkEmail,
    deleteUser,
    updateUser,
    uploadProfilePicture,
    changePassword,
    getLoggedInUser,
    updateCourses,
    getUserProfile,
    getUserCourses,
}
