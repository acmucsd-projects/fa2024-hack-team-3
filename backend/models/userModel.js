const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    courses: [
        {
            name: { type: String, required: true}
        }
    ],
    anonymous: { type: Boolean, required: false, default: false },
    profilePicture: { type: String, required: false, default: 'https://www.gravatar.com/avatar/'},
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);