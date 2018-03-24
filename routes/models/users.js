var mongoose = require('mongoose');


var userschema = new mongoose.Schema({

    _id:{ type:mongoose.Schema.Types.ObjectId},
    name:{ type:String,required:true},
    email:{ type:String,unique:true,required:true},
    password:{ type:String,required:true},
    
});

module.exports = mongoose.model('User',userschema);