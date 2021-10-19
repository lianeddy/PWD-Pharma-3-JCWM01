const { db } = require("../../database");

//Taksu
const {
  getTransaction,
  getTransactionDetail,
  getStatus,
  changeStatus,
  getRawMedicine,
} = require("./Taksu/adminTransaction");

//----
module.exports = {
  //Taksu
  getTransaction: getTransaction,
  getTransactionDetail,
  getStatus,
  changeStatus,
  getRawMedicine,
};
