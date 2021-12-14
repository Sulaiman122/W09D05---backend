const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: "https://w09d05.herokuapp.com", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());



const userRouter = require("./routers/routes/user");
const postRouter = require("./routers/routes/post");
const commentRouter = require("./routers/routes/comment");


app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

const PORT = process.env.PORT || 4600;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
