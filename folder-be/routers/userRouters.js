const { Router } = require("express");
const express = require("express");
const { userControllers } = require("../controllers/");
const routers = express.Router();
const { auth } = require("../helper/authToken");

// routers.post('login', userControllers.getData)
routers.get("/username", userControllers.getUsername);
routers.get("/users", userControllers.getData);
routers.post("/login", userControllers.login);
routers.post("/register", userControllers.register);
routers.patch("/authentication", auth, userControllers.authentication);
module.exports = routers;
