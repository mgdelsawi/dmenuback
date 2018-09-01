const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const RestUserSchema = new Schema ({
    userName: { 
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    acclvl:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now

    }

    
});


module.exports = RestUser = mongoose.model('restusers', RestUserSchema);