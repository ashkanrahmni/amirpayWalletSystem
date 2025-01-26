const User = require('../models/User');
const { createWallet } = require('../services/walletService');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation, validate } = require('../utils/validation');
const axios = require('axios')
const bcrypt = require('bcrypt');
const { sendSMS } = require('../utils/sms');
const { generateFiveLengthNumberCode } = require('../utils/RandomNumber');
exports.RegisterFunc = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, ConfirmPassword } = req.body;

    if (password !== ConfirmPassword) {
      req.flash('error', 'رمز عبور و تأیید رمز عبور مطابقت ندارند.');
      return res.render('auth/register',{
        layout:'auth',
        messages:req.flash()
      });
    }

    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
      req.flash('error', 'ایمیل قبلاً ثبت شده است.');
      return res.render('auth/register',{
        layout:'auth',
        messages:req.flash()
      });
    }

    const existingPhone = await User.findOne({ phone:phone });
    if (existingPhone) {
      req.flash('error', 'شماره تلفن قبلاً ثبت شده است.');
      return res.render('auth/register',{
        layout:'auth',
        messages:req.flash()
      });
    }
    const wallet = await createWallet();
    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      password,
      tetherWallet:{
        addressHEX:wallet.address.hex,
        addressBase58:wallet.address.base58,
        privateKey:wallet.privateKey    
      }
    });
    await user.save();

    req.flash('success', 'ثبت‌نام با موفقیت انجام شد');
    res.redirect('/auth/login');
    return;
  } catch (error) {
    req.flash('error', 'خطا در ثبت‌نام.');
    res.render('/auth/register',{
        layout:'auth',
        messages:req.flash()
    });
  }
};

exports.LoginFunc = async (req, res, next) => {
    try {
        const { phone, password } = req.body;
        
        const user = await User.findOne({ phone:phone });
        if (!user) {
        req.flash('error', 'کاربر یافت نشد ابتدا ثبت نام کنید');
         return res.render('auth/login',{
            layout:'auth',
            messages:req.flash()
           })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('error', 'رمز عبور اشتباه است.');
            return res.render('auth/login', {
                layout:'auth',
                messages: req.flash()
            });
        }
        const otp = generateFiveLengthNumberCode();
        await sendSMS(phone,otp);
        await User.findOneAndUpdate({ phone:phone },{ otp:otp , status:'online' },{ new: true });
        req.flash('success',`کد تایید به شماره تلفن ${phone} ارسال شد`);    
        res.cookie('phone', phone, { httpOnly: true, secure: true });
        res.redirect('/auth/otp');
        return;
    
    } catch (error) {
        next(error);
    }
};

exports.OtpFunc = async (req, res, next) => {
    try {
        const { otp } = req.body;
        const phone = req.cookies.phone;
        const user = await User.findOne({ phone:phone });
        console.log(user)
        if(user.otp === ""){
            req.flash('error', 'درخواست کدتایید ارسال نشده است');
            return res.render('auth/otp',{
                layout:'auth',
                messages:req.flash()
            });
        }
        const payload = {
            firstName:user.firstName,
            lastName:user.lastName,
            phone:user.phone,
            email:user.email,
            tetherWallet:user.tetherWallet,
            status:user.status,
            balance:user.balance,
            wallet:user.wallet
        }
        const token = jwt.sign({ id: user._id,payload }, '1234567890', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.redirect('/exchange');
        return;
    } catch (error) {
        next(error);
    }
};

exports.AmirPayFunc = async (req,res,next)=>{
    try {
        return res.redirect('https://panel.amirpay.top/api/OAuth/authorize?client_id=client_G2_1QQ14hOU0-_WqSq3p4&redirect_uri=http://localhost:2000/auth/amirpay&response_type=code&scope=profile.basic subscription.manage wallet.reduce&state=test123')
    } catch (error) {
        next(error)
    }
}


exports.ResendOtpFunc = async (req, res, next) => {
    try {
        if(!req.cookies.phone){
            req.flash('error', 'لطفا مجددا وارد شوید');
            return res.redirect('/auth/login');
        }
        const phone = req.cookies.phone;
        const user = await User.findOne({ phone: phone });
        if(!user){
            req.flash('error', 'کاربر یافت نشد');
            res.redirect('/auth/login');
            return;
        }
        const otp = generateFiveLengthNumberCode();
        await sendSMS(phone,otp);
        await User.findOneAndUpdate({ phone:phone },{ otp:otp },{ new: true });
        req.flash('success',`کد تایید به شماره تلفن ${phone} ارسال شد`);    
        res.redirect('/auth/otp');
        return;
    } catch (error) {
        next(error);
    }
};

exports.OtpIndex = async (req, res, next) => {
    try {
        res.render('auth/otp',{
            layout:'auth',
            messages:req.flash()
        });
    } catch (error) {
        next(error);
    }
};

exports.RegisterIndex = (req, res) => {
    try {
        res.render('auth/register',{
            title: 'ثبت نام تتر من',
            layout: 'auth',
        });
    } catch (error) {
        res.status(500).send('خطا در ثبت نام.');
    }
};
  

exports.LoginIndex = (req, res,next) => {
    try {
        res.render('auth/login',{
            title: ' ورود تتر من',
            layout: 'auth',
            messages:req.flash()
        });
    } catch (error) {
        next(error);
    }
};
  