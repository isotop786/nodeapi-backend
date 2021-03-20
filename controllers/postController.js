const express = require('express');
const Post = require('../models/postModel')
const formiable = require('formidable');
const fs = require('fs')
const _ = require('lodash');


exports.index = (req,res)=>{

    Post.find().select('title body')
    .populate('postedBy','_id name')
    .then((posts)=>{
        res.json({
           data:posts
        })
    })
    .catch((err)=>{
        res.json({
            error:err
        })
    })

}


exports.createPost = (req,res)=>{

    let form = new formiable.IncomingForm();

    form.keepExtensions = true;

    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400)
            .json({
                error:"Image could not be uploaded "
            });
        }

        let post = new Post(fields);
        post.postedBy = req.profile;

        if(files.photo){
            post.photo.data =fs.readFileSync(files.photo.path) 
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result)=>{
            if(err){
                return res.status(400)
                .json({
                     error:err
                });
            }

            result.postedBy.hashed_password = undefined;
            result.postedBy.salt = undefined;
            res.json(result);
        } );
    });
}

////// find post by user id 

exports.postByUser = (req,res)=>{
    Post.find({postedBy:req.profile._id})
        .populate("postedBy","_id name")
        .sort('_created')
        .exec((err,post)=>{
            if(err){
                return res.status(400)
                .json({
                    error:err
                })
            }

            res.json({post})
        })
}


// post by id 
exports.postById = (req,res,next,id)=>{
    Post.findById(id)
    .populate("postedBy","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400)
            .json({
                error:err
            })
        }

        req.post = post 
        next();
    })
}

exports.isPoster = (req,res,next)=>{
    const isPoster = req.post.postedBy._id === req.auth._id;
   
    // console.log("req.post",req.post);
    // console.log("req.post.postedBy._id",req.post.postedBy._id);
    // console.log("req.auth",req.auth);
    // console.log("req.auth._id",req.auth._id);

    if(!isPoster){
        return res.status(400)
        .json({
            error:"You are not authorized to delete the post"
        });
    }

    next();
}

// update post 
exports.updatePost = (req,res)=>{
    let post = req.post 

    post = _.extend(post,req.body);
    post.update = Date.now 
    post.save(err=>{
        if(err){
            return res.status(400)
            .json({error:err})
        }
    })

    res.json({
        post
    })

}


// delete post
exports.deletePost = async (req,res)=>{
    let post = req.post;

    await console.log("auth is "+req.auth)

    post.remove((err,post)=>{
        if(err){
            return res.status(400)
            .json({error:err})
        }

        res.json({
            message:"post has been deleted successfully"
        });
    })
}



