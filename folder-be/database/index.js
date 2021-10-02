const mysql = require("mysql");

const db = mysql.createConnection({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b8bece75271122",
  password: "7bfeb2aa",
  database: "heroku_16bc33d7e5ed710",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.error("error:" + err);
  }
  console.log("Connected sql");
});

module.exports = { db };
