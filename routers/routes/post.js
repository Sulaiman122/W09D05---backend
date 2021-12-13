const express = require('express')
const  {getPosts ,getPostById, createPost, updatePost, deletePost, giveLikeOrRemove} = require('./../controllers/post')
const postRouter = express.Router()
const {authentication} = require("../../config/checkAuth");


postRouter.get("/posts",authentication, getPosts);
postRouter.get("/post/:id",authentication, getPostById);
postRouter.post("/post",authentication, createPost);
postRouter.put("/post/:id", authentication, updatePost);
postRouter.delete("/post/:id",authentication, deletePost);
postRouter.post("/likePost/:id",authentication, giveLikeOrRemove);


module.exports = postRouter;