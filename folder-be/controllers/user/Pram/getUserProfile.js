const { db } = require("../../../database");


module.exports = (req, res) => {
    let {user_id: userId} = req.user;
    let selectQuery = `Select * from users where user_id = ${db.escape(userId)};`;
    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log(results)
      res.status(200).send({
        data: results[0],
        message: "accout found",
        success: true,
      })
    })}