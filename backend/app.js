const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
// const io  = require('../bin/www'); 
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// Routes
// const authRoutes = require('./routes/authRoutes'); // Import your auth routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from this origin (your frontend)
}));

// set strict query mode for Mongoose
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB :D' );
        app.use('/api/users', userRoutes);
        app.use('/api/posts', postRoutes);
        app.use('/api/posts', commentRoutes);
        app.use('/api/chatpage', chatRoutes);
        app.use('/api/message', messageRoutes);
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB :(', err.message);
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

// Register API routes
// app.use('/api/auth', authRoutes); // Link the Google login handler
// app.use('/api/posts', PostRoutes); // For posts
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
module.exports = app;
