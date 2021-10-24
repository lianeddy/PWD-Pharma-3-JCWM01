const { db } = require("../../database");

//Taksu
const {
  getTransaction,
  getTransactionDetail,
  getStatus,
  changeStatus,
  getRawMedicine,
  insertItems,
  changeTotal,
} = require("./Taksu/adminTransaction");

const adminRevenue = require("./Pram/adminRevenue");
//----
module.exports = {
  //Taksu
  getTransaction: getTransaction,
  getTransactionDetail,
  getStatus,
  changeStatus,
  getRawMedicine,
  insertItems,
  changeTotal,

  //Pram
  adminRevenue,
};
