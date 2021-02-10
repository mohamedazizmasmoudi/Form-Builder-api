const express = require('express');
const {
    getPosts,
    createPost,
    postById,
    updatePost,
    deletePost,
    photo,
    singlePost,
    getpostsnotassign,
    assign
} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../validator');

const router = express.Router();

router.get('/posts', getPosts);
router.get('/postsnotassign', getpostsnotassign);
router.post('/post/assign/:form&:pageid',  assign);





// post routes
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get('/post/:postId', singlePost);
router.put('/post/:postId', requireSignin,  updatePost);
router.delete('/post/:postId', requireSignin, deletePost);
// photo
router.get('/post/photo/:postId', photo);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);
// any route containing :postId, our app will first execute postById()
router.param('postId', postById);

module.exports = router;
