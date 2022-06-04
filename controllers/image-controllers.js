const Image = require('../models/image-model');

const createImage = async (req, res) => {
    req.body.uploadedBy = req.user.userId;

    const image = await Image.create(req.body);

    return res
        .status(201)
        .json(
            {
                image
            }
        );
}

const getUserImages = async (req, res) => {
    const images = await Image.find({ uploadedBy: req.user.userId });

    return res
        .status(200)
        .json(
            {
                images
            }
        );
}

module.exports = {
    createImage,
    getUserImages
}