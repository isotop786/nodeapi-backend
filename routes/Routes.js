const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const {index, createPost} = require('../controllers/postController');
const userController = require('../controllers/userController');

const validator = require('../validator');
const {signupValidator} = require('../validator/authValidator');

const auth = require('../controllers/auth');


// post routes
router.get('/',auth.signinRequired ,index);
router.post('/create',validator.createPostValidator,createPost);
// router.post('/create',postCotroller.createPost);

// user routese

// router.get('/users', userController.index);


// Auth routes

router.post('/signup',signupValidator,auth.signup);
router.post('/signin',auth.signin);
router.get('/signout',auth.signout);




module.exports = router