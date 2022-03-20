const express = require('express');
const router = express.Router();
const { validateOnboard} = require("../validations/investor.validation")

//----------task------------------------------------------------------------------
const locationController = require('../controllers/location.controller');
router.get('/states',  locationController.getStates);
router.get('/cities/:state_id', locationController.getCitiesByStateId);
   

module.exports = router;