const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const TableSchema = new Schema ({
    tablenum: { 
        type: Number,
        required:true
    },
    barcode:{
        type:String,
        required:true
    },
    numperson:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    restref:{
        type:String
    }



});


module.exports = Table = mongoose.model('tables', TableSchema);