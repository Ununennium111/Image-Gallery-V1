const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter an username'],
            minlength: [4, 'Username cannot have less than 4 characters'],
            maxlength: [40, 'Username cannot have more than 40 characters'],
            trim: true,
            unique: [true, 'This username is already registered, try a different one']
        },

        email: {
            type: String,
            required: [true, 'Please enter a valid email'],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter a valid email'
            ],
            trim: true,
            unique: [true, 'This email is already registered, try a different one']
        },

        password: {
            type: String,
            required: [true, 'Please enter a password'],
            minlength: [6, 'Password cannot have less than 6 characters'],
            trim: true
        }
    }
);

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    );
}

UserSchema.methods.validatePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}

module.exports = model('User', UserSchema);