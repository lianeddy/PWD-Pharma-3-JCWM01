const { db } = require("../../../database");

module.exports = (req, res) => {
  let scriptQuery = `Select users.full_name, users.birthdate from users where username = ${db.escape(
    req.body.username
  )} and password = ${db.escape(req.body.password)};`;
  console.log(req.body);
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    console.log(`=====`, results);
    const data = results[0];
    res.status(200).send(data);
  });
  //   let insertQuery = `Insert into users values ()`
};
