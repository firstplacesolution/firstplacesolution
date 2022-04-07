const express = require('express');
const router = express.Router();
const { validateRegistration} = require("../validations/user.validation")

//----------task------------------------------------------------------------------
const userController = require('../controllers/user.controller');
router.post('/register', validateRegistration('register'), userController.register);

module.exports = router;