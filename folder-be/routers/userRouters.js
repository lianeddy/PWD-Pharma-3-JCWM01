const { Router } = require("express");
const express = require("express");
const { userControllers } = require("../controllers/");
const routers = express.Router();

// routers.post('login', userControllers.getData)
routers.get('/username', userControllers.getUsername) 
routers.get('/users', userControllers.getData) 
routers.post('/login', userControllers.login)
routers.post('/register', userControllers.register)

// from taksu
// routers.post("login", userControllers.getData);
// routers.post("/testVerify", userControllers.testMail);

module.exports = routers;
