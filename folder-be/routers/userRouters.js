const { Router } = require("express");
const express = require("express");
const { userControllers } = require("../controllers/");
const routers = express.Router();
// const {auth} = require("../helper/authToken")
const { auth } = require("../helper/authToken");
const multer = require("multer");
const upload = multer();
// Pram
// routers.post('login', userControllers.getData)
routers.get("/username", userControllers.getUsername);
routers.get("/users", userControllers.getData);

routers.post("/login", userControllers.login);
routers.post("/register", userControllers.register);
routers.post("/forgetpassword", userControllers.forgetPassword);
routers.patch("/resetpassword", auth, userControllers.resetPassword);
routers.patch("/changepassword", auth, userControllers.changePassword);
routers.post("/getuserdata", auth, userControllers.getUserProfile);

// Taksu
routers.patch("/authentication", auth, userControllers.authentication);
routers.post("/getUserInfomation", auth, userControllers.getUserInfomation);
routers.patch(
  "/updateUserInformation",
  auth,
  userControllers.updateUserInformation
);
routers.post("/uploadProfilePic", auth, userControllers.uploadPicture);
routers.post("/cart", auth, userControllers.addCart);
routers.patch("/cart", auth, userControllers.editCart);
routers.get("/cart", auth, userControllers.getCart);
routers.post("/checkOut", auth, userControllers.checkOut);
routers.post("/recipeUpload/:id", auth, userControllers.recipeUpload);
routers.get("/transaction/:id", auth, userControllers.getTransaction);
routers.get("/transaction", auth, userControllers.getTransaction);
routers.get(
  "/transactionDetail/:id",
  auth,
  userControllers.getTransactionDetail
);
routers.patch("/payment/:id", auth, userControllers.uploadPaymentProof);
module.exports = routers;
