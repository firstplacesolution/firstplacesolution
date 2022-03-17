const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
        phone: {type: String, required: [true, 'Phone Number is Required'], index: true, unique: true},
        token: {type: String, required: [true, 'Token is Required'], index: true, unique: true},
    }, {timestamps: true}
);

const User = mongoose.model('user', UserSchema);

module.exports = User;