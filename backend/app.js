const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.use(route);
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;