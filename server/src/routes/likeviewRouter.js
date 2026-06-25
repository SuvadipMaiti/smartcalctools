const express = require('express');
const likeviewController = require('../controllers/likeviewController');
const {authProtected} = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/like',authProtected, likeviewController.createLike);
router.post('/like-count', likeviewController.countLike);
router.post('/view', likeviewController.createView);

module.exports = router;