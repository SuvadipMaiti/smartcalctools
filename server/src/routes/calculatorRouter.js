const express = require('express');
const calculatorController = require('../controllers/calculatorController');
const {authProtected} = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/list', calculatorController.allCalculators);
router.get('/list-by-tag', calculatorController.allCalculatorsByTag);
router.post('/:id',authProtected, calculatorController.createCalculator);
router.get('/profile',authProtected,calculatorController.profileAllCalculators);
router.get('/:slug', calculatorController.showCalculator);
router.put('/:id/:slug', authProtected, calculatorController.updateCalculator);
router.delete('/delete/:id/:slug', authProtected, calculatorController.deleteCalculator);

module.exports = router;