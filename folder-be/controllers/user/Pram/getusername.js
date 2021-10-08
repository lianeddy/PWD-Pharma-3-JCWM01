const { db } = require("../../../database");

module.exports = (req, res) => {
  let scriptQuery = "Select * from users;";
  console.log(req.body);
  if (req.body.username) {
    scriptQuery = `Select * from users where username = ${db.escape(
      req.body.username
    )} and password = ${db.escape(req.body.password)} ;`;
  }
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
};
