const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const {index, createPost} = require('../controllers/postController');
const userController = require('../controllers/userController');

const validator = require('../validator');


// post routes
router.get('/',index);
router.post('/create',validator.createPostValidator,createPost);
// router.post('/create',postCotroller.createPost);

// user routes

router.get('/users', userController.index);


module.exports = router