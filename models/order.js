const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const OrderSchema = new Schema ({
    tablenum: { 
        type: Number,
        required:true
    },
    item: [{}],
    date:{
        type:Date,
        default:Date.now

    },
    restref:{
        type:String
    }

});


module.exports = Order = mongoose.model('orders', OrderSchema);