const express = require('express');
const router = express.Router();
const { validateKyc} = require("../validations/kyc.validation")

//----------task------------------------------------------------------------------
const kycController = require('../controllers/kyc.controller');
router.post('/apply', validateKyc('submitKyc'), kycController.submitKyc);
router.post('/changeStatus', validateKyc('changeKycStatus'), kycController.changeKycStatus);
   

module.exports = router;