const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser=require('body-parser');
const order = require('../models/order');
const keys = require('../config/key');
const passport = require('passport');
const jwt = require('jsonwebtoken');
router.get('/test', (req,res) =>
res.json({msg:"this is a test"}));

router.post('/addorder', (req, res) => {
console.log(req.body)

        const newUser = new order({
        item: req.body.item,        
        tablenum: req.body.tablenum,
        restref:req.body.restref
        });   
        newUser
        .save()
        .then(orderadd => res.json(orderadd))
        }
      

);
  
module.exports = router;
