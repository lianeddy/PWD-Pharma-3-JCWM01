const mysql = require("mysql");

const db = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b8bece75271122",
  password: "7bfeb2aa",
  multipleStatements: true,
});

db.getConnection((err) => {
  if (err) {
    return console.error("error:" + err);
  }
  console.log("Connected sql");
});

module.exports = { db };






