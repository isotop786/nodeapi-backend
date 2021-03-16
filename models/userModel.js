const mongoose = require('mongoose');
// const uuidvi = require('uuid/v1');
const {v4: uuidv1} = require('uuid'); 
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required:true
    },
    email:{
        type: String,
        trim:true,
        required:true,
    },
    hashed_password:{
        type: String,
        required: true,
    },

    salt: String,
    created:{
        type: Date,
        default: Date.now
    },
    updated: Date
});

// virtual method 

userSchema.virtual('password')
.set(password=>{
    this._password = password;

    // salt 
    this.salt = uuidv1();

    // encryption method 
    this.hashed_password = this.encryptedPassword(password);
})
.get(()=>{
    return this.password
});


// encryptedPassword mehtod declararion 

userSchema.methods = {
    encryptedPassword: function(password){
        // first check whether the password is set 
        if(!password) return "";
        try{
            return crypto.createHmac('sha256',this.salt)
                    .update(password)
                    .digest('hex');
        }catch(err){
            return err;
        }
    }
}



// userSchema.virtual('password')
// .set(password=>{
//     this._password = password;

//     this.salt = uuidv1();

//     this.hashed_password = this.encryptedPassword(password);

// })
// .get(()=>{
//     return this._password;
// });


// userSchema.methods = {
//     encryptedPassword : function(password){
//        if(!password) return "";
//        try{
//         return crypto.createHmac('sha256',this.salt)
//         .update(password)
//         .digest('hex')
//        }catch(err){
//            return err;
//        }
//     }
// }

// vitual fields 
// password hashing process
// step:1 creating virtual method
// userSchema.virtual('password')
// .set(password=>{
//     // storing password in a temporay vairable
//     this._password = password;

//     // genrating a timestamp for salt
//     this.salt = uuidvi();

//     // encrypting password using our own method 

//     this.hashed_password = this.encryptPassword(password);
// })
// .get()




///////////////////////////////////////////////////////////////////
///// password hassing method

// userSchema.virtual('password')
// .set(function(password){
//     this._password = password;
//     // generate a timestamp
//     this.salt = uuidvi();

//     // encryptpassword
//     this.hashed_password = this.encryptPassword(password);


// })
// .get(function(){
//     return this._password;
// });


// // method 
// userSchema.methods = {
//     encryptPassword : function(password){
//         if(!password) return "";
//         try{

//          return crypto.createHmac('sha256',this.salt)
//             .update(password)
//             .digest('hex');

//         }catch(err){
//             return err
//         }
//     }
// }





module.exports = mongoose.model("User",userSchema);