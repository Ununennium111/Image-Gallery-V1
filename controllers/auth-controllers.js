const User = require('../models/user-model');

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
    const { email, password } = req.body;

    // Verify whether password nor username are empty

    // Verify wheter the user exists

    // Verify wheter the password is correct

    return res
        .status(200)
        .json(
            {
                user: {
                    username: user.username
                },
                token: 'Here goes the token'
            }
        );
}

module.exports = {
    registerUser,
    loginUser
}