const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.use('/api/users', userRoutes);
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;