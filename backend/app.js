const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
// Routes
//const authRoutes = require('./routes/authRoutes'); // Import your auth routes
const userRoutes = require('./routes/userRoutes');
const PostRoutes = require('./routes/postRoutes');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// set strict query mode for Mongoose
mongoose.set('strictQuery', true);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse incoming JSON data


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB :D');
        app.use('/api/users', userRoutes);
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB :(',err.message);
    });

// Register API routes
//app.use('/api/auth', authRoutes); // Link the Google login handler
app.use('/api/posts', PostRoutes); // For posts


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;