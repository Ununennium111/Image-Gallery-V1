const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'image-gallery',
        }
    );

    fs.unlinkSync(req.files.image.tempFilePath);

    return res
        .status(200)
        .json(
            {
                image: {
                    src: result.secure_url
                }
            }
        );
}

module.exports = {
    uploadImage
}