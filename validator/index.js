// const validator = require('express-validator');
const express = require('express')
exports.createPostValidator = (req,res,next)=>{

    // title validation
    req.check("title","Title can not be empty").notEmpty();
    req.check("title","Title must be 4 to 150 character long").isLength({
        min:4,
        max:150
    });


    // body validation 
    req.check("body","Body can not be empty ").notEmpty();
    req.check("body","BODY must be 4 to 2000 character long" ).isLength({
        min:4,
        max:2000
    });


    // displaying errors 
    const errors = req.validationErrors();

    if(errors){
        const firstErr = errors.map((err)=>err.msg)[0];

        return res.status(400).json({error:firstErr});
    }

    console.log(errors)

   

    //next middleware
    next();
}