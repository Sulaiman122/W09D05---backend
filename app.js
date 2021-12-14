const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
var cookieParser = require('cookie-parser')

const app = express();
app.use(express.json());
app.use(
    cors({credentials: true, origin: true, methods: "GET,POST,PUT,DELETE",}) 
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.set("trust proxy", 1);
// app.use(
//     session({
//         secret: 'secret',
//         resave: true,
//         saveUninitialized: true,
//         cookie: {
//             sameSite: 'none',
//             secure: true,
//         }
//     })
// );

app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
        // secure: true,
        maxAge: 8 * 180 * 60 * 1000,

    },
}));

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
