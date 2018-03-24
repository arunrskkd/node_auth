
var mongoose = require('mongoose');

var reportschema = new mongoose.Schema({

    name:{ type:String,required:true },
    _id: { type: mongoose.Schema.Types.ObjectId },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Greenhouse', reportschema);
