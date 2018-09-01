const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser=require('body-parser');
const table = require('../models/table');
const keys = require('../config/key');
const passport = require('passport');
const jwt = require('jsonwebtoken');
router.get('/test', (req,res) =>
res.json({msg:"this is a test"}));

router.post('/addtable', (req, res) => {
console.log(req.body)
table.findOne({ barcode: req.body.barcode }).then(ntable => {
    if (ntable) {
        return res.status(400).json({barcode:"barcode already exists"});
    }
    else
    {
        const newUser = new table({
         tablenum: req.body.tablenum,        
         barcode: req.body.barcode,
         numperson:req.body.numperson,
        restref:req.body.restref
        });   
        newUser
        .save()
        .then(ntable => res.json(ntable))
        }
      });

});


//delete fuction
router.delete('/deletetable', function(req, res){
    console.log(req.body)
    table.findByIdAndRemove({
        _id: req.body._id
    }, function(err, result){
        res.send(result);
    })
});
module.exports = router;
