const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const {index, createPost} = require('../controllers/postController');
const userController = require('../controllers/userController');

const validator = require('../validator');
const {signupValidator} = require('../validator/authValidator');

const auth = require('../controllers/auth');
const {signinRequired} = require('../controllers/auth')



// post routes
router.get('/',index);
router.post('/create',signinRequired ,validator.createPostValidator,createPost);
// router.post('/create',postCotroller.createPost);

// user routese

router.param("userId",userController.userById)
router.get('/users',signinRequired, userController.index);
router.get('/users/:userId',signinRequired,userController.singleUser);
router.put('/users/:userId',signinRequired,userController.updateUser);
router.delete('/users/:userId',signinRequired,userController.deleteUser);


// Auth routes

router.post('/signup',signupValidator,auth.signup);
router.post('/signin',auth.signin);
router.get('/signout',auth.signout);


// User Profile routes





module.exports = router