const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    emailAddress: { type: String, required: true, unique: true, lowercase: true },
    courses: {
        type:[
            {
                name: {type: String, required: false}
            }
        ],
        default: [], required: false
    },
    anonymous: { type: Boolean, required: false, default: false },
    profilePicture: { type: String, required: false, default: 'https://www.gravatar.com/avatar/'},
}, { timestamps: true });

userSchema.plugin(uniqueValidator, {message: 'Error: {PATH} is already taken'});

module.exports = mongoose.model('User', userSchema);