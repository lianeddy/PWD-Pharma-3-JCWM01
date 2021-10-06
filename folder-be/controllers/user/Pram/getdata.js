const { db } = require("../../../database");

module.exports = (req, res) => {
  let scriptQuery = "Select * from users;";
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
};
