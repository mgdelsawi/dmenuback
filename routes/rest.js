const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser=require('body-parser');
const rest = require('../models/rest');
const keys = require('../config/key');
const passport = require('passport');
const jwt = require('jsonwebtoken');
router.get('/test', (req,res) =>
res.json({msg:"this is a test"}));

router.post('/addrestaurant', (req, res) => {
console.log(req.body)
rest.findOne({ restname: req.body.restname }).then(restaurant => {
    if (restaurant) {
        return res.status(400).json({restname:"Restaurant already exists"});
    }
    else
    {
        const newUser = new rest({
         restname: req.body.restname,        
         location: req.body.location,
         resttype:req.body.resttype
        }); 
        newUser
        .save()
        .then(restaurant => res.json(restaurant))
        }
      });

});

//delete fuction
router.delete('/deleterestaurant', function(req, res){
    console.log(req.body)
    rest.findByIdAndRemove({
        _id: req.body._id
    }, function(err, result){
        res.send(result);
    })
});
      
module.exports = router;
