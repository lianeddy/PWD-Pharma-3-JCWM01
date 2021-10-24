const { Router } = require("express");
const express = require("express");
const { auth } = require("../helper/authToken");
const { adminControllers } = require("../controllers/");
const routers = express.Router();

routers.get("/transaction/:id", auth, adminControllers.getTransaction);
routers.get("/transaction", auth, adminControllers.getTransaction);
routers.get("/status", auth, adminControllers.getStatus);
routers.post("/status", auth, adminControllers.changeStatus);
routers.get(
  "/transactionDetail/:id",
  auth,
  adminControllers.getTransactionDetail
);
routers.get("/getRawMedicine", auth, adminControllers.getRawMedicine);
routers.post("/insertItems", auth, adminControllers.insertItems);
routers.post("/changeTotal", auth, adminControllers.changeTotal);

routers.get("/admin/revenue", adminControllers.adminRevenue);
module.exports = routers;
