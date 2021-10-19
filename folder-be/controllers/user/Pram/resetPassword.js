const { db } = require("../../../database");
const Crypto = require("crypto");
const { sendVerifyForget } = require("../../system/verification/verifyForgetPass");
const { createToken } = require("../../../helper/createToken");


module.exports = (req, res) => {
  console.log(req.user)
  let { password } = req.body;
  password = Crypto.createHmac("sha1", "hash123")
  .update(password)
  .digest("hex");
  let {user_id: userId} = req.user;
  let selectQuery = `Select * from users where user_id = ${db.escape(userId)};`;
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    
    // res.status(200).send(results);

    if (results.length > 0) {
        let updateQuery = `UPDATE users SET password = ${db.escape(password)} where user_id = ${db.escape(userId)};`
        console.log(results[0])
        db.query(updateQuery, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
              }

                res.status(200).send({
                message: "Password successfuly updated",
                success: true,
              })
        }



      );
    }
  });
}
