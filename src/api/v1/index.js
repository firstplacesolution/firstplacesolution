const express = require('express');
const router = express.Router();
const nodeCron = require("node-cron");
const {rewardDistribution} =require('./helpers/reward.helpers');


const db=require("../v1/config/mongodb");


//Cron job
nodeCron.schedule("1 * * * * *",rewardDistribution);



const userRoute = require('../v1/routes/user.route');
const investorRoute = require('../v1/routes/investor.route');
const kycRoute = require('../v1/routes/kyc.route');
const transactionRoute = require('../v1/routes/transaction.route');
const walletRoute = require('../v1/routes/wallet.route');
const locationRoute = require('../v1/routes/location.route');
const portfolioRoute = require('../v1/routes/portfolio.route');

router.use('/user', userRoute);
router.use('/investor', investorRoute);
router.use('/kyc', kycRoute);
router.use('/transaction', transactionRoute);
router.use('/wallet', walletRoute);
router.use('/location', locationRoute);
router.use('/portfolio', portfolioRoute);

module.exports = router;