const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/userModel');
const expressJwt = require('express-jwt');

// sign up 


exports.signup =async (req,res)=>{
    // checking fisrt

    if(await User.findOne({email:req.body.email}))
        return res.status(403).json({error:"Email is taken"});
    
     const  user = await new User(req.body);
    await user.save();
    res.status(200).json({
        data:user,
        message:'User crated'
    });
}

// User signin/login 

exports.signin = (req,res)=>{
    const {email,password} = req.body;

    User.findOne({email},(err,user)=>{

        if(err || !user)
        {
            return res.status(401).json({error:"User not found"});
        }

        // checking password for the user
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:'Incorrect email / password'
            });
        }
        // generating token 
    
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);  

        // pushing the token to cookie
        res.cookie("t",token,{expire: new Date()+9999});

        // responsing back to frontend 
        const {_id,name,emali} = user;

        res.status(200).json({
            token:token,
            user:{_id,name,email}
        })

    })
}


// user signout 
exports.signout = (req,res)=>{
    res.clearCookie("t");
    return res.status(200).json({message:"Successfully logged out"});
}


// signin require

exports.signinRequired = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms:['sha1', 'RS256', 'HS256'] ,
    userProperty:"auth"
});




// exports.signin = (req,res)=>{
//     const {email, password} = req.body;

//     // checking whether the user exsits 
//     User.findOne({email},(err,user)=>{

//         if(err || !user)
//         {
//             res.status(401).json({
//                 error: 'User does not exist'
//             });
//         }

//         // if the user exists then check the email

//         if(!user.authenticate(password)){
//             return res.status(401).json({
//                 error:"Incorrect password"
//             });
//         }

//         // if the password is correct then generate a token 
//         const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);

//         // then push the token to the cookie 
//         res.cookie("t",token,{expire: new Date()+9999});

//         // responsing back the user data and to token to the frontend
        
//         const {_id,name,email} = user;

//         res.status(200).json({
//             token:token,
//             user:{_id,name,email}
//         });



//     })
// }



// user signin
/////////////////////////////////////////////////////////////////////////////////////////,,..
// exports.signin = (req,res)=>{
//     // find the user based on email 
//     const {email,password} = req.body;
    
//     User.findOne({email}, (err,user)=>{

//         if(err || !user ){
//             return res.status(401).json({
//                 error:"User doesn't exist."
//             })
//         }

//          // if user found then check password
//     if(!user.authenticate(password)){
//         return res.status(401).json({
//             error:"Incorrect Password, please try again with corret one"
//         })
//     }
    
//     // generate a token with user id and secret 

//     const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)

//     // persist the token as 't' in cookie with expiry date 
//     res.cookie("t",token,{expire: new Date()+9999});

//     // return response with user and token to frontend client
//     const {_id,name,email} = user;
//     return  res.json({token,user:{_id,name,email}})

//     });
   
// }



// exports.signup = async (req,res)=>{
//     if(await User.findOne({email:req.body.email}))
//         return res.status(403).json({error:"Email is taken"});

//     const user = await new User(req.body);
//     await user.save();
//     res.status(200).json({
//         data:user,
//         messsage:"User is successfully created"
//     });
// }





// exports.signup = async (req,res)=>{
//     console.log('signup initialize');

//     // step:1 check whether the user already exist or not
//     const userExists = await User.findOne({email:req.body.email});

//     if(userExists) return res.status(403).json({error:"Email is taken"});

//     const user = await new User(req.body);

//     await user.save();

//     res.status(200).json({user});


// }




// user sign up
///////////////////////////////////////////////////
// exports.signup = async (req,res) =>{

//     // step 1: check whether the user exist or not 
//     const userExists = await User.findOne({email:req.body.email});

//     // if exists send then send error message 
//     if(userExists) return res.status(403).json({
//         error: "Email is taken"
//     });

//     // if the user doesn't exist then create a new one
//     const user = await new User(req.body);
//     await user.save();

//     res.status(200).json({user});

// }