const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InverstorSchema = new Schema({
    user_id: { type: String, required: [true, 'User Id is Required'], index: true, unique: true }, //connected with user table
    full_name: { type: String, required: [true, 'Full Name is Required'] },
    profile: { type: String, default: '' },
    email: { type: String, required: [true, 'Email is Required'] },
    state: { type: String, required: [true, 'State is Required'] },
    city: { type: String, required: [true, 'City is Required'] },
    referral_code: { type: String, default: '' },
}, { timestamps: true }
);

const Inverstor = mongoose.model('inverstor', InverstorSchema);

module.exports = Inverstor;