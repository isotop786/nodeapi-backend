const mongoose = require('mongoose');

exports.connectDB = ()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log('DB is connected')});     
    
    mongoose.connection.on('error',(err)=>console.log('Connection failed due to '+err))
}