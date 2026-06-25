const express = require('express');
const ssrCollectionsController = require('../controllers/ssrCollectionsController');


const router = express.Router();

router.get('/',ssrCollectionsController.collectionView);

module.exports = router;