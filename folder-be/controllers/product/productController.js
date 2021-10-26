const { db } = require("../../database");
const getData = require("./Feny/getData");


// Pram
const getProducts = require("./Pram/getProducts");
const inputProducts = require("./Pram/inputProducts");
const getCategories = require("./Pram/getCategories");
const editProducts = require("./Pram/editProducts");
const deleteProducts = require("./Pram/deleteProducts");
const rawMaterialUsage = require("./Pram/rawMaterialUsage");
const getBottleStock = require("./Pram/bottleStock")


module.exports = {
  getData: getData,

  // Pram
  getProducts,
  inputProducts,
  getCategories,
  editProducts,
  deleteProducts,
  rawMaterialUsage,
  getBottleStock,


};
