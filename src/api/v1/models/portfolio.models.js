const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    investor_id: {type: String, required: [true, 'investor_id is Required']},
    amount: {type: Number, required: [true, 'amount is Required']},
    rate: {type: Number, required: [true, 'Rate is Required']},
    lockin: {type: Number, required: [true, 'Lockin is Required']},
    return: {type:Number,default:0}
});

const Portfolio = mongoose.model('portfolio', portfolioSchema);

module.exports = Portfolio;
