const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    investor_id: { type: String, required: [true, 'Investor Id is Required'], index: true }, //connected with investor table
    transaction_type: { type: String, enum : ['debited','credited'] },
    amount: { type: Number, required : [true,'Amount is Required']},
    transaction_reason: { type: String,enum :['reward','rechagedWallet','intrest', 'withdrawl','invested'], required : [true,'Amount is Required']},
    transaction_status: { type: String,enum :['requested','success','rejected', 'cancelled'], default : 'requested'},
}, { timestamps: true }
);

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;