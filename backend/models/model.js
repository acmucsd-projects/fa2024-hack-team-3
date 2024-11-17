const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const helloWorldSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Hello World', helloWorldSchema);