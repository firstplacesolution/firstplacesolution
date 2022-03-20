const express = require('express');
const router = express.Router();

require("../v1/config/mongodb")


const userRoute = require('../v1/routes/user.route');
const investorRoute = require('../v1/routes/investor.route');
const kycRoute = require('../v1/routes/kyc.route');
const transactionRoute = require('../v1/routes/transaction.route');
const walletRoute = require('../v1/routes/wallet.route');
const locationRoute = require('../v1/routes/location.route');

router.use('/user', userRoute);
router.use('/investor', investorRoute);
router.use('/kyc', kycRoute);
router.use('/transaction', transactionRoute);
router.use('/wallet', walletRoute);
router.use('/location', locationRoute);

module.exports = router;