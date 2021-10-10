const { Router } = require("express");
const express = require("express");
const { productControllers } = require("../controllers/");

const routers = express.Router();
routers.get("/getData", productControllers.getData);

module.exports = routers;
