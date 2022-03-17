const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KYCSchema = new Schema({
    investor_id: { type: String, required: [true, 'Inverstor ID is Required'], index: true, unique: true },
    dob: { type: String, required: [true, 'Date of Birth is Required'], index: true, unique: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: [true, 'Gender is Required'] },
    occupation: { type: String, required: [true, 'Occupation is Required'] },
    annual_income: { type: Number, required: [true, 'Annual Income is Required'] },
    address: { type: String, required: [true, 'Address is Required'] },
    postal_code: { type: String, required: [true, 'Postal Code is Required'] },
    aadhaar_number: { type: String, required: [true, 'Aadhaar Number is Required'] },
    pan_number: { type: String, required: [true, 'PAN Number is Required'] },
    aadhaar_front_image: { type: String, required: [true, 'Aadhaar front image is Required'] },
    aadhaar_back_image: { type: String, required: [true, 'Aadhaar back image is Required'] },
    pan_front_image: { type: String, required: [true, 'PAN front image is Required'] },
    selfie: { type: String, required: [true, 'Selfie is Required'] }
}, { timestamps: true }
);

const UserAuth = mongoose.model('investor_kyc', KYCSchema);

module.exports = UserAuth;