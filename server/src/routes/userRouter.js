const express = require('express');
const userController = require('../controllers/userController');
const { authProtected } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register',userController.register);
router.post('/login', userController.login);
router.post('/logingoogle', userController.logingoogle);
router.put('/profile/:id', authProtected, userController.updateUser);
router.put('/password/:id', authProtected, userController.updateUserPassword);
router.get('/', userController.allUsers);
router.get('/find/email/:email', userController.findUserByEmail);
router.post('/forgot-password-email', userController.forgotPasswordEmail);
router.post('/forgot-password-otp', userController.forgotPasswordOtp);
router.post('/forgot-password-new-password', userController.forgotPasswordNewPassword);
router.post('/account-activation', userController.accountActivation);
router.post('/account-activation-link-create', userController.accountActivationLinkCreate);

module.exports = router;