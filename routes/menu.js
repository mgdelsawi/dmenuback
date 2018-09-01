const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser=require('body-parser');
const menu = require('../models/menu');
const keys = require('../config/key');
const passport = require('passport');
const jwt = require('jsonwebtoken');
router.get('/test', (req,res) =>
res.json({msg:"this is a test"}));

router.post('/addmenu', (req, res) => {
console.log(req.body)
menu.findOne({ menuitem: req.body.item }).then(menuitems => {
    if (menuitems) {
        return res.status(400).json({menuitem:"Item already exists"});
    }
    else
    {
        const newUser = new menu({
         item: req.body.item,        
         itemtype: req.body.itemtype,
         itemimg:req.body.itemimg,
         ingredients: req.body.ingredients,        
         itemprice: req.body.itemprice,
         itemdes:req.body.itemimg,
        restref:req.body.restref
        });   
        newUser
        .save()
        .then(menuitems => res.json(menuitems))
        }
      });

});
  

//delete fuction
router.delete('/deletemenu', function(req, res){
    console.log(req.body)
    menu.findByIdAndRemove({
        _id: req.body._id
    }, function(err, result){
        res.send(result);
    })
});
      
module.exports = router;
