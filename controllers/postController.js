const express = require('express');
const Post = require('../models/postModel')
const formiable = require('formidable');
const fs = require('fs')


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

// single post 

exports.show = (req,res)=>{
    console.log('ok')
}
