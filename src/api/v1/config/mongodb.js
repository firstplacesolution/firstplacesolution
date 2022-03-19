const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://firstplace:Fps2020@cluster0.t693e.mongodb.net/firstplacesolution').then(() => {
    console.log('mongodb initialized...');
});