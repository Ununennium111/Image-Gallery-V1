const { Schema, model, Types } = require('mongoose');

const ImageSchema = new Schema(
    {
        uploadedBy: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required to upload an image']
        },

        image: {
            type: String,
            required: [true, 'Please provide an image'],
        }
    }
);



module.exports = model('Image', ImageSchema);