const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        min:4,
        max:140
      
    },

    body:{
        type:String,
        required:true,
        min:4,
        max:3000
    },
    photo:{
        data:Buffer,
        contenType: String
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    created:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post",postSchema);