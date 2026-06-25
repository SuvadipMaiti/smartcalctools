const express = require('express');
const ssrHomeController = require('../controllers/ssrHomeController');


const router = express.Router();

router.get('/',ssrHomeController.homeView);

module.exports = router;