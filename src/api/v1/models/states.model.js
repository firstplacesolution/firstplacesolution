// {"_id":{"$oid":"6091274c5315181cb07e5573"},"id":"1","name":"Andaman and Nicobar Islands","country_id":"101"}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StateSchema = new Schema({
    country_id: {type: String, required: [true, 'Country ID is Required']},
    id: {type: String, required: [true, 'State ID is Required'], index : true  , unique : true},
    name: {type: String, required: [true, 'City Name is Required'], index : true  , unique : true},
    area_name: {type: String, required: [true, 'Area Name is Required'], index: true, unique: true},
    status : {type : Number , default : 1}
});

const State   = mongoose.model('states', StateSchema);

module.exports = State;
