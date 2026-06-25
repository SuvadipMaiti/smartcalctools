const express = require('express');
const commentController = require('../controllers/commentController');
const {authProtected} = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/list', commentController.allComments);
router.post('/:userId',authProtected, commentController.createComment);
router.put('/:userId/:commentId', authProtected, commentController.updateComment);
router.delete('/delete/:userId/:commentId', authProtected, commentController.deleteComment);

module.exports = router;