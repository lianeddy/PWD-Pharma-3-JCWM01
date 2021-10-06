const { Router } = require("express");
const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();

routers.post("login", userControllers.getData);
routers.post("/testVerify", userControllers.testMail);

module.exports = routers;
