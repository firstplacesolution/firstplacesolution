const mongoose = require('mongoose');

db=mongoose.connect('mongodb+srv://nikit:nikit@cluster0.053sm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err)=>{
    console.log("Database connected")
    if(err){
        console.log(err)
    }
});
module.exports={db}
// mongoose.connect('mongodb://localhost/myapp');
// var MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
// // Works
// MyModel.findOne(function(error, result) { /* ... */ });



// 'mongodb+srv://root:Nikitd@cluster0.053sm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'