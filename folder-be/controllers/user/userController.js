const { db } = require("../../database");
const Crypto = require("crypto");
const { sendVerify } = require("../system/verification/verify");
const { createToken } = require("../../helper/createToken");
const transporter = require("../../helper/nodemailer/index");
const NODEMAILER_CONFIG = require("../../helper/constants/nodemailer_config");

//Import functions
//Pram
const register = require("./Pram/register");
const login = require("./Pram/login");
const getData = require("./Pram/getdata");
const getUsername = require("./Pram/getusername");
const forgetPassword = require("./Pram/forgetPassword");
const resetPassword = require("./Pram/resetPassword");
const changePassword = require("./Pram/changePassword");
const getUserProfile = require("./Pram/getUserProfile")
//---------------------
//Taksu
const verification = require("./Taksu/verification");
const {
  getUserInfomation,
  updateUserInformation,
} = require("./Taksu/userInformation");
//---------------------
//Feny

//----------------

module.exports = {
  getUsername,
  getData,
  login,
  register,
  forgetPassword,
  resetPassword,
  changePassword,
  getUserProfile,

  //Taksu
  authentication: verification,
  getUserInfomation,
  updateUserInformation,

  //
};
