const mongoose = require('mongoose');
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
.set(function(password){
    this._password = password;

    // salt 
    this.salt = uuidv1();

    // encryption method 
    this.hashed_password = this.encryptedPassword(password);
})
.get(function(){
    return this._password;
});

// authenticate users 
userSchema.methods.authenticate = function(plaintext){
    
    return this.encryptedPassword(plaintext) === this.hashed_password
}



userSchema.methods.encryptedPassword = function(password){
        // first check whether the password is set 
        if(!password) return "";
        try{
            return crypto.createHmac('sha256',this.salt)
                    .update(password)
                    .digest('hex');
        }catch(err){
            return "";
        }
    }


module.exports = mongoose.model("User",userSchema);