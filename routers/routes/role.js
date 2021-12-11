const express = require("express");
const { createRole, roles } = require("./../controllers/role");

const {authentication} = require("../../config/checkAuth");

const roleRouter = express.Router();


roleRouter.post("/createrole",authentication, createRole);
roleRouter.get("/roles",authentication, roles);


module.exports = roleRouter;