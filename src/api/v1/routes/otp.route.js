
const express=require('express');
const router=express.Router();
const {sendOtpAndSave,validateOtp}=require('../controllers/otp.controller')
const {validatePhone}=require('../validations/phone.validator.js')


router.post('/send',validatePhone(),sendOtpAndSave);
router.post('/validate',validateOtp);

module.exports=router; 