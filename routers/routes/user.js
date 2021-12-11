const express = require("express");
const {
  register,
  login,
  getUsers,
  removeUser, activate, logout, resetPassword, gotoReset, forgotPassword
} = require("./../controllers/user");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/login/err", (req,res)=>res.json({err: 'Incorrect Email/Password'}));
userRouter.get("/login/success", (req,res)=>res.json({success: 'success'}));
userRouter.get("/users", authentication, authorization, getUsers);
userRouter.delete("/users/:id", authentication, authorization, removeUser);
userRouter.get('/activate/:token', activate);
userRouter.post('/forgot', forgotPassword);
userRouter.post('/reset/:id', resetPassword);
userRouter.get('/forgot/:token', gotoReset);
userRouter.get('/logout', logout);

module.exports = userRouter;
