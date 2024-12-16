const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// Routes
// const authRoutes = require('./routes/authRoutes'); // Import your auth routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from this origin (your frontend)
}));

app.use(express.json());//

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB :D');
        app.use('/api/users', userRoutes);
        app.use('/api/posts', postRoutes);
        app.use('/api/posts', commentRoutes);
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB :(', err.message);
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    });

// Register API routes
// app.use('/api/auth', authRoutes); // Link the Google login handler
// app.use('/api/posts', PostRoutes); // For posts

module.exports = app;
