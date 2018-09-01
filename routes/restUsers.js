const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser=require('body-parser');
const gravatar = require('gravatar');
const restUser = require('../models/restUser');
const keys = require('../config/key');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/test', (req,res) =>
 res.json({msg:"this is a test"}));

 router.post('/register', (req, res) => {

  console.log(req.body)

    restUser.findOne({ userName: req.body.userName }).then(restuser => {
    if (restuser) {
        return res.status(400).json({email:"Username already exists"});
   
    }else{

        const newUser = new restUser({
          userName: req.body.userName,        
          password: req.body.password,
          acclvl:req.body.acclvl

        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password || '', salt, (err, hash) => {
            if (err) throw err 
            newUser.password = hash;
            newUser
              .save()
              .then(restuser => res.json(restuser))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });



  router.post('/login', (req,res)=> {

    const userName= req.body.userName;
    const password= req.body.password;

    restUser.findOne({userName}).then(restuser => {
        if(!restuser)
        {
            return res.status(400).json({userName:"User account does not exist"});

        }

        else{
            bcrypt.compare(password,restuser.password).then(isMatch=> {
                if(isMatch)
                {
                   const payload ={id:restuser.id, name:restuser.userName};

                   // Sign Token
        jwt.sign(
            payload,
            keys.secret,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                userName: restuser.userName
              });
            }
          );


                }

                else{
                    return res.status(400).json({userName:"Passwords is invalid"});
                }
            })
        }
    })

  });

//delete fuction
router.delete('/deleterestuser', function(req, res){
  console.log(req.body)
  restUser.findByIdAndRemove({
      _id: req.body._id
  }, function(err, result){
      res.send(result);
  })
});

module.exports = router;