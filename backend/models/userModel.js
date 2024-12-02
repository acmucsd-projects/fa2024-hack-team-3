const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true },
    emailAddress: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
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

// Checks for unique username and email
userSchema.plugin(uniqueValidator, {message: 'Error: {PATH} is already taken'});

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Compare password for authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema, 'users');