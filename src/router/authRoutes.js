const express = require('express');
const router = express.Router();
const { loginValidation, registerValidation, validate, otpValidation, resetPasswordValidation   } = require('../utils/validation');
const { LoginFunc, RegisterFunc, LoginIndex, RegisterIndex, OtpFunc, OtpIndex, ResendOtpFunc,AmirPayFunc } = require('../controller/authController');


router.post('/login', loginValidation, validate, LoginFunc);

router.post('/register',  registerValidation, validate, RegisterFunc);

router.post('/otp', otpValidation, validate, OtpFunc);

router.get('/oauth', AmirPayFunc);

// router.post('/reset-password', resetPasswordValidation, validate, ResetPasswordFunc);



// router.post('/forget-password', ForgotPasswordFunc);



// router.get('/forget-password', ForgotPasswordIndex);

// router.get('/reset-password',  ResetPasswordIndex);


router.get('/register', RegisterIndex);

router.get('/login', LoginIndex);

router.get('/otp', OtpIndex);

router.get('/resend-otp', ResendOtpFunc);


module.exports = router;
