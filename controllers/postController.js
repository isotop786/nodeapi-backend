const express = require('express');
const Post = require('../models/postModel')

exports.index = (req,res)=>{

    Post.find().select('title body')
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


    // Post.find().select('title body')
    // .then((posts)=>{
    //     res.json({
    //         data:posts
    //     })
    // })
    // .catch((error)=>{
    //     res.json({
    //         error:error
    //     })
    // })

}


exports.createPost = (req,res)=>{

    console.log(req.body);

    const post = new Post(req.body);

    post.save((error,result)=>{
        if(error) return res.status(500).json(error);

        res.status(200).json({
            post:result
        })
    });
}

// single post 

exports.show = (req,res)=>{
    console.log('ok')
}
