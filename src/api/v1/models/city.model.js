const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    id: {type: String, required: [true, 'City Id is Required'], index : true,  unique : true},
    state_id: {type: String, required: [true, 'State Id is Required']},
    name: {type: String, required: [true, 'Name is Required'], index: true, unique: true},
    status : { type : Number , default : 1}
});

const City = mongoose.model('Cities', CitySchema);

module.exports = City;

