const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const MenuSchema = new Schema ({
    item: { 
        type: String,
        required:true
    },
    itemtype:{
        type:String,
        required:true
    },
    itemimg:{
        type:String,
        required:true
    },
    ingredients:{
        type:[{}],
        required:true
    },
    itemprice:{
        type:Number,
        required:true
    },
    itemdes:{
        type:String,
        required:true,
    },
    restref:{
        type:String
    }
    }
    


);


module.exports = Menu = mongoose.model('menus', MenuSchema);