const { Router } = require("express");
const express = require("express");
const { userControllers } = require("../controllers/");
const routers = express.Router();
// const {auth} = require("../helper/authToken")
const { auth } = require("../helper/authToken");

// routers.post('login', userControllers.getData)
routers.get("/username", userControllers.getUsername);
routers.get("/users", userControllers.getData);

routers.post("/login", userControllers.login);
routers.post("/register", userControllers.register);
routers.post("/forgetpassword", userControllers.forgetPassword);
routers.patch("/resetpassword", userControllers.resetPassword);
routers.patch("/changepassword", userControllers.changePassword)

routers.patch("/authentication", auth, userControllers.authentication);
routers.post("/getUserInfomation", auth, userControllers.getUserInfomation);
routers.patch(
  "/updateUserInformation",
  auth,
  userControllers.updateUserInformation
);
module.exports = routers;
