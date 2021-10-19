const { Router } = require("express");
const express = require("express");
const { productControllers } = require("../controllers/");
const routers = express.Router();

routers.get("/getData", productControllers.getData);


// Pram
routers.get("/getproducts", productControllers.getProducts);
routers.post("/inputproducts", productControllers.inputProducts);
routers.get("/getcategories", productControllers.getCategories);
routers.patch("/editproducts", productControllers.editProducts);
routers.delete("/deleteproducts", productControllers.deleteProducts);

module.exports = routers;
