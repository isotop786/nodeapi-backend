const mongoose = require('mongoose');
const User = require('../models/userModel');
const _ = require('lodash')


// getting all users

exports.index = (req,res)=>{
    User.find().select("name email created")
    .then(user=>{
        return res.status(200)
                .json({
                    data:user
                })
    })
    .catch(err=>{
        return res.status(500)
                .json({
                    error:err
                })
    })
}

// single user
exports.singleUser = (req,res,id)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
}

// finding users by id
exports.userById = (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user)
        {
            return res.status(404)
            .json({
                error:"User not found"
            })
        }

        // adding profile object in req with user info
        req.profile = user
        next();
    });//User.findById() ends here
}


// update user info 
exports.updateUser = async (req,res,next)=>{
    
    let user = await req.profile

   if(await User.findOne({email:req.body.email})){
       return res.status(400)
       .json({error:"This email already taken choose other one"});
   }
    

     user =await  _.extend(user,req.body);

    await user.save((err)=>{
        if(err){
            return res.status(400)
            .json({
                error:err
            })
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.status(200)
        .json({
            data:user
        })
    })
}

// delete user
exports.deleteUser = (req,res,next)=>{
    const user = req.profile ;
    
    user.remove((err,user)=>{
        if(err || !user){
            return res.status(400)
            .json({
                error: err
            });
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.status(400)
        .json({
            message:'User has been deleted',
            data:user
        })

    })
}


/// user authoriazation 
exports.hasAuthorization = (req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;

    if(!authorized)
    {
        return res.status(403)
        .json({
            error:"User is not authorized to perform this action"
        });
    }
}


//