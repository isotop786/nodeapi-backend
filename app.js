const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const expressValidator = require('express-validator');

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('combined'));
app.use(expressValidator());


// imports 
const Routes = require('./routes/Routes')


// database 
const db = require('./db');
db.connectDB();




// routes
app.use('/',Routes);

// handlling UnauthorizedError
app.use(function(err,req,res,next){
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({
            error:'Invalid Token / Token Not found'
        });
    }
});



app.listen(process.env.PORT || 80)