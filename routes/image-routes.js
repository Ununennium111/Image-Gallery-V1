const express = require('express');
const router = express.Router();

const {
    createImage,
    getUserImages
} = require('../controllers/image-controllers');

const { uploadImage } = require('../controllers/upload-controllers');

router.get('/', getUserImages);
router.post('/', createImage);

router.post('/upload', uploadImage);

module.exports = router;