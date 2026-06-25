const express = require('express');
const tagController = require('../controllers/tagController');


const router = express.Router();

router.get('/',tagController.allTags);
router.get('/:slug', tagController.showTag);

module.exports = router;