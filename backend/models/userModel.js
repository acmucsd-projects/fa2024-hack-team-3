const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    emailAddress: { type: String, required: true },
    courses: [
        {
            name: { type: String, required: true}
        }
    ],
    anonymous: { type: Boolean, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);