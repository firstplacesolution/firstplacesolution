const express = require('express');
const router = express.Router();
const { validatePortfolio} = require("../validations/portfolio.validation")

//----------task------------------------------------------------------------------
const portfolioController = require('../controllers/portfolio.controller');

router.post('/add', validatePortfolio('potfolio'),portfolioController.portfolio);   
router.get('/data/:investor_id',validatePortfolio('getAll'),portfolioController.getAll)

module.exports = router;