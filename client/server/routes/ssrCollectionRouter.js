const express = require('express');
const ssrCollectionController = require('../controllers/ssrCollectionController');


const router = express.Router();

router.get('/:slug',ssrCollectionController.collectionView);

module.exports = router;