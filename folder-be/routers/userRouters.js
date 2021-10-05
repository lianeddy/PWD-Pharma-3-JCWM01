const { Router } = require("express");
const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();

// routers.post('login', userControllers.getData)
routers.get('/username', userControllers.getUsername) 
routers.get('/users', userControllers.getData) 
routers.post('/add-user', userControllers.addData)

module.exports = routers;
