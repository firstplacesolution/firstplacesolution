const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InverstorSchema = new Schema({
    investor_id: { type: String, required: [true, 'Investor Id is Required'], index: true, unique: true }, //connected with investor table
    base_wallet: { type: Number, default : 0 },
    reward_wallet: { type: Number, default : 0 },
}, { timestamps: true }
);

const Inverstor = mongoose.model('inverstor_wallet', InverstorSchema);

module.exports = Inverstor;