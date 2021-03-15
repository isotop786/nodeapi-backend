const mongoose = require('mongoose')

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
    }
});

module.exports = mongoose.model("Post",postSchema);