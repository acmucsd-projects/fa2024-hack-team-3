const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.use('/api/users', userRoutes);
        app.use('/api/posts', postRoutes);
    })
    .catch(err => { console.log(err) });

module.exports = app;
