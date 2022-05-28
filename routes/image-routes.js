const express = require('express');
const router = express.Router();

const {
    createImage,
    getUserImages
} = require('../controllers/image-controllers');

router.post('/', createImage);
router.get('/', getUserImages);

module.exports = router;