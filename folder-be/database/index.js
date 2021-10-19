const mysql = require("mysql");

const dbConfig = {
  host: "us-cdbr-east-04.cleardb.com",
  user: "b8bece75271122",
  password: "7bfeb2aa",
  database: "heroku_16bc33d7e5ed710",
  multipleStatements: true,
};

const db = mysql.createPool(dbConfig);

db.getConnection((err) => {
  if (err) {
    return console.error("error:" + err);
  }
  console.log("Connected sql");
});

module.exports = { db, dbConfig };
