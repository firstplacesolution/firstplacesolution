const express = require('express');
const router = express.Router();
const { validateWallet } = require("../validations/wallet.validation")

//----------task------------------------------------------------------------------
const walletController = require('../controllers/wallet.controller');
router.get('/getBalance/:investor_id', validateWallet('getBalance'), walletController.getWalletBalance);
router.post('/addBalance', validateWallet('updateWalletBalance'), walletController.updateWalletBalance);
// router.post('/reward',validateWallet('updateRewardWallet'), walletController.updateRewardWallet);
// router.get('/',walletController.InvestorID)
   

module.exports = router;