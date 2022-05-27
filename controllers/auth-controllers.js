const User = require('../models/user-model');
const {
    BadRequestError,
    UnauthenticatedError
} = require('../errors');

const registerUser = async (req, res) => {
    const user = await User.create({ ...req.body });

    return res
        .status(201)
        .json(
            {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
        );
}

const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    // Verify whether password nor username are empty
    if (!email || !password) {
        throw new BadRequestError('All fields are required');
    }

    // Verify wheter the user exists
    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError('Invalid email or password');
    }

    // Verify wheter the password is correct
    const isPasswordCorrect = await user.validatePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid email or password');
    }

    const token = user.createJWT();

    return res
        .status(200)
        .json(
            {
                user: {
                    username: user.username
                },
                token
            }
        );
}

module.exports = {
    registerUser,
    loginUser
}