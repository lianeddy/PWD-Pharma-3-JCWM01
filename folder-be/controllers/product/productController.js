const { db } = require("../../database");
const getData = require("./Feny/getData");


// Pram
const getProducts = require("./Pram/getProducts")
const inputProducts = require("./Pram/inputProducts")
const getCategories = require("./Pram/getCategories")


module.exports = {
  getData: getData,

  // Pram
  getProducts: getProducts,
  inputProducts: inputProducts,
  getCategories: getCategories,


};
