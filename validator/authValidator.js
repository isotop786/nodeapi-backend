exports.signupValidator = (req,res,next)=>{

    console.log('reporting from auth validator');
    //name
    req.check("name","Name can not empty").notEmpty();
    req.check("name","Name must be 4 to 15 character long")
                .isLength({
                    min:4,
                    max:15
                });
    
    // email
    req.check("email","Email can not be empty").notEmpty();
    req.check("email","Email must 3 to 32 charcter long").isLength({
        min:3,
        max:32
    });
    req.check("email","Email must be a valid email address")
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);            

    // password
    req.check("password","Password can not be empty").notEmpty()
    req.check("password")
        .isLength({min:6})
        .withMessage("Password must contain 6 charaters")
        .matches(/\d/)
        .withMessage("Password must contain at least one digit");


    // displaying errors
    const errors = req.validationErrors();
    
    if(errors){
        const firstErr = errors.map(err=>err.msg)[0];

        return res.status(400).json({error:firstErr});
    }

    // console.log(errors)



    next();
}


