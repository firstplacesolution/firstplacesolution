const express = require('express');
const router = express.Router();
const {validateTransaction} = require("../validations/transaction.validation")

//----------task------------------------------------------------------------------
const {getTransaction,updateTransaction} = require('../controllers/transaction.controller');
router.get('/:id', validateTransaction('getAll'), getTransaction);
router.post('/update', validateTransaction('update'), updateTransaction);
   

module.exports = router;