const express = require('express');
const router = express.Router();
const { validateOnboard} = require("../validations/investor.validation")

//----------task------------------------------------------------------------------
const investorController = require('../controllers/investor.controller');
router.post('/onboard', validateOnboard('onboard'), investorController.onboard);
   

module.exports = router;