const express = require('express');
const router = express.Router();

const paymentRoute = require('../v1/routes/payment.route');
router.use('/payment', paymentRoute);

module.exports = router;