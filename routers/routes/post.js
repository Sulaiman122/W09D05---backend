const express = require('express')
const  {getPosts ,getPostById, createPost, deletePost, giveLikeOrRemove} = require('./../controllers/post')
const postRouter = express.Router()
const {authentication} = require("../../config/checkAuth");


postRouter.get("/posts",authentication, getPosts);
postRouter.get("/post/:id",authentication, getPostById);
postRouter.post("/post",authentication, createPost);
postRouter.delete("/post/:id",authentication, deletePost);
postRouter.get("/likePost/:id",authentication, giveLikeOrRemove);


module.exports = postRouter;