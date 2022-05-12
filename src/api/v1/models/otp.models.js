const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var OtpSchema = new Schema({
    userId: { type: String, required: true, unique: false },
    reqId:{type:String,required:true},
    otp: { type: String, required: true },
    phone: { type: String, required: true },
    sendTime: { type: Number, required: true },
    verificationTime: { type: Number, required: false },
    wrongOtp: { type: String, required: false },
    ipAddress: { type: String, required: false },
    token:{type:String,required:true}
});
const Model = mongoose.model('Otp', OtpSchema);
module.exports = Model;