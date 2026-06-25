const express = require('express');
const toolController = require('../controllers/toolController');


const router = express.Router();

router.post('/tool-bmi', toolController.toolBmiCalculate);
router.post('/tool-bmr', toolController.toolBmrCalculate);
router.post('/tool-tdee', toolController.toolTdeeCalculate);
router.post('/tool-calorie', toolController.toolCalorieCalculate);
router.post('/tool-bfp', toolController.toolBfpCalculate);
router.post('/tool-ibw', toolController.toolIbwCalculate);
router.post('/tool-hrz', toolController.toolHrzCalculate);
router.post('/tool-wi', toolController.toolWiCalculate);
router.post('/tool-pi', toolController.toolPiCalculate);
router.post('/tool-emi', toolController.toolEmiCalculate); 
router.post('/tool-sip', toolController.toolSipCalculate); 
router.post('/tool-ci', toolController.toolCiCalculate); 
router.post('/tool-fd', toolController.toolFdCalculate); 
router.post('/tool-rd', toolController.toolRdCalculate); 
router.post('/tool-roi', toolController.toolRoiCalculate); 
router.post('/tool-ts', toolController.toolTsCalculate); 
router.post('/tool-dr', toolController.toolDrCalculate); 
router.post('/tool-sig', toolController.toolSigCalculate); 

module.exports = router;