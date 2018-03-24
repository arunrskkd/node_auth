
var mongoose = require('mongoose');


var reportschema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    date:{ type:Date,required:true },
    Greenhouse:{ type:String,required:true },
    itemRows:[{
            description: { type: String, required: true },
            manpower: { type: Number, required: true },
            remarks: { type: String, required: true },
        }
    ],
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportschema);
