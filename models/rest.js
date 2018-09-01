const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const RestSchema = new Schema ({
    restname: { 
        type: String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    resttype:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now

    }


}

);


module.exports = RestUser = mongoose.model('rest', RestSchema);