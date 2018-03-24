var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


router.post('/user', function (req, res) {
    var user = new User({
      name:req.body.name,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password,10),
    });

    user.save((err,result) =>{
        if(err){
        return res.status(500).json({
            title:'an error occured'
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

        }
        res.status(200).json({
        message:'user created',
        obj:result
        })

    }) ;

  });
  
  router.post('/signin', function (req, res) {
    User.findOne({ email:req.body.email},(err,user) =>{
        
        if(err){
            return res.status(500).json({
            title:'an error occured'
            })  
        }

        if(!user){
            return res.status(500).json({
            title:'no user'
            })  
        }

        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.status(500).json({
            title:'login failed'
            })  
        }

        var token = jwt.sign({user:user},'secret',7200);
        res.status(200).json({
            message:'user loged in',
            token:token,
            userid:user._id
        })
    })
  
  
  });