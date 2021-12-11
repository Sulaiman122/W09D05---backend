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
//------------ Forgot Password Route ------------//
// router.get('/forgot', (req, res) => res.render('forgot'));

// //------------ Reset Password Route ------------//
// router.get('/reset/:id', (req, res) => {
//   // console.log(id)
//   res.render('reset', { id: req.params.id })
// });

// //------------ Email ACTIVATE Handle ------------//
userRouter.get('/activate/:token', activate);

// //------------ Forgot Password Handle ------------//
userRouter.post('/forgot', forgotPassword);

// //------------ Reset Password Handle ------------//
userRouter.post('/reset/:id', resetPassword);

// //------------ Reset Password Handle ------------//
userRouter.get('/forgot/:token', gotoReset);

// //------------ Logout GET Handle ------------//
userRouter.get('/logout', logout);
module.exports = userRouter;
