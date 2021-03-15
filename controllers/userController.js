const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.index = (req,res)=>{
    User.find().select('name email')
    .then((users)=>{
        res.json({
            data:users
        })
    })

    .catch((err)=>{
        res.json({
            error:err
        })
    });
}

exports.create = (req,res)=>{

}

exports.show = (req,res)=>{

}

