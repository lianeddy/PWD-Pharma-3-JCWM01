const { Router } = require("express");
const express = require("express");
const { userControllers } = require("../controllers/");
const routers = express.Router();
// const {auth} = require("../helper/authToken")

// routers.post('login', userControllers.getData)
routers.get("/username", userControllers.getUsername);
routers.get("/users", userControllers.getData);
routers.post("/login", userControllers.login);
routers.post("/register", userControllers.register);
routers.post("/forgetpassword", userControllers.forgetPassword);
routers.patch("/resetpassword", userControllers.resetPassword);
routers.patch("/changepassword", userControllers.changePassword)

module.exports = routers;
