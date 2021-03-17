const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const {index, createPost} = require('../controllers/postController');
const userController = require('../controllers/userController');

const validator = require('../validator');

const auth = require('../controllers/auth');



// post routes
router.get('/',index);
router.post('/create',validator.createPostValidator,createPost);
// router.post('/create',postCotroller.createPost);

// user routes

// router.get('/users', userController.index);


// Auth routes

router.post('/signup',auth.signup);




module.exports = router