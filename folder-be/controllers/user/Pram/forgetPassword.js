const { db } = require("../../../database");
// const Crypto = require("crypto");
const { sendVerifyForget } = require("../../system/verification/verifyForgetPass");
const { createToken } = require("../../../helper/createToken");


module.exports = (req, res) => {
  let { email } = req.body;
  let insertQuery = `Select * from users where email = ${db.escape(email)};`;
  db.query(insertQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    // res.status(200).send(results);

    if (results.length > 0) {
      let { user_id } = results[0];
      let token = createToken({ user_id });

      let checkVerify = sendVerifyForget(email, token, user_id);
      if (checkVerify === false) {
        res.status(500).send({ message: "gagal mengirim email", status: false });
      }
      res.status(200).send({
        message: "Check Your Email!",
        success: true,
      },
      );
    }
  });
}
