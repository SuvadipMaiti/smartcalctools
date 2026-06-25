const express = require('express');
const ssrCalculatorController = require('../controllers/ssrCalculatorController');


const router = express.Router();

router.get('/:slug',ssrCalculatorController.calculatorView);

module.exports = router;