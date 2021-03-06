const express = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} = require("./../controllers/comment");
const commentRouter = express.Router();
const {authentication} = require("../../config/checkAuth");

commentRouter.post("/comments", authentication, getComments);
commentRouter.post("/comment/:id", authentication, createComment);
commentRouter.put("/comment/:id", authentication, updateComment);
commentRouter.delete("/comment/:id", authentication, deleteComment);

module.exports = commentRouter;
