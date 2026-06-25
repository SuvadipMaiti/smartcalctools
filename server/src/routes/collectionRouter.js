const express = require('express');
const collectionController = require('../controllers/collectionController');
const {authProtected} = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/', collectionController.allCollections);
router.post('/:id',authProtected, collectionController.createCollection);
router.get('/profile/:id',authProtected,collectionController.profileAllCollections);
router.get('/:slug', collectionController.showCollection);
router.put('/:id/:slug', authProtected, collectionController.updateCollection);
router.put('/calculator-addto-collection/:id/:collectionSlug', authProtected, collectionController.calculatorAddtoCollection);
router.put('/calculator-editto-collection/:id/:collectionSlug', authProtected, collectionController.calculatorEdittoCollection);
router.get('/calculator-in-collection-show/:calculatorInCollectionId', collectionController.calculatorInCollectionShow);


module.exports = router;