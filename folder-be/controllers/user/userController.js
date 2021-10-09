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
const changePassword = require("./Pram/changePassword")
//---------------------
//Taksu

//---------------------
//Feny

//----------------

module.exports = {
  getUsername: getUsername,
  getData: getData,
  login: login,
  register: register,
  forgetPassword: forgetPassword,
  resetPassword: resetPassword,
  changePassword: changePassword,
};
