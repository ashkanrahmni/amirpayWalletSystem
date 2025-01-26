const { check, validationResult } = require('express-validator');

const loginValidation = [
  check('phone')
    .notEmpty().withMessage('شماره تلفن نمی‌تواند خالی باشد.')
    .isMobilePhone('fa-IR').withMessage('شماره تلفن معتبر نیست.'),
  check('password')
    .notEmpty().withMessage('رمز عبور نمی‌تواند خالی باشد.')
    .isLength({ min: 6 }).withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد.')
];

const otpValidation = [
  check('otp')
    .notEmpty().withMessage('کد تایید نمی‌تواند خالی باشد')
    .isLength({ min: 5 }).withMessage('کد تایید باید ۵ کاراکتر باشد')
];

const resetPasswordValidation = [
    check('otp')
    .notEmpty().withMessage('کد تایید نمی‌تواند خالی باشد')
    .isLength({ min: 5 }).withMessage('کد تایید باید ۵ کاراکتر باشد'),
  check('password')
    .notEmpty().withMessage('رمز عبور نمی‌تواند خالی باشد.')
    .isLength({ min: 6 }).withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد.'),
  check('confirmPassword')
    .notEmpty().withMessage('تکرار رمز عبور نمی‌تواند خالی باشد')
    .isLength({ min: 6 }).withMessage('تکرار رمز عبور باید حداقل ۶ کاراکتر باشد')
];

const registerValidation = [
  check('firstName')
    .notEmpty().withMessage('نام نمی‌تواند خالی باشد.'),
  check('lastName')
    .notEmpty().withMessage('نام خانوادگی نمی‌تواند خالی باشد.'),
  check('email')
    .notEmpty().withMessage('ایمیل نمی‌تواند خالی باشد.')
    .isEmail().withMessage('ایمیل معتبر نیست.'),
  check('phone')
    .notEmpty().withMessage('شماره تلفن نمی‌تواند خالی باشد.')
    .isMobilePhone('fa-IR').withMessage('شماره تلفن معتبر نیست.'),
  check('password')
    .notEmpty().withMessage('رمز عبور نمی‌تواند خالی باشد.')
    .isLength({ min: 6 }).withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد.')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', errors.array().map(error => error.msg));
    return res.redirect(req.originalUrl);
  }
  next();
};

module.exports = {
  loginValidation,
  registerValidation,
  otpValidation,
  resetPasswordValidation,
  validate
};
