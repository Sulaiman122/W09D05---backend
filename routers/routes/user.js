const express = require("express");
const {
  register,
  login,
  getUsers,
  removeUser, activate, logout, resetPassword, gotoReset, forgotPassword, googleLogin
} = require("./../controllers/user");
const {authentication} = require("../../config/checkAuth");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/login/err", (req,res)=>res.json({err: 'Incorrect Email/Password'}));
userRouter.get("/login/success", (req,res)=>res.json({success: 'success'}));
userRouter.get("/users", authentication, getUsers);
userRouter.delete("/users/:id", authentication, removeUser);
userRouter.get('/activate/:token', activate);
userRouter.post('/forgot', forgotPassword);
userRouter.post('/reset/:id', resetPassword);
userRouter.get('/forgot/:token', gotoReset);
userRouter.get('/logout', logout);
userRouter.post('/google_login', googleLogin, login);
userRouter.get('/user_available',(req, res)=>{
  if(req.user){
    res.json({user:req.user})
  }else{
    res.json("no user")
  }
})
module.exports = userRouter;
