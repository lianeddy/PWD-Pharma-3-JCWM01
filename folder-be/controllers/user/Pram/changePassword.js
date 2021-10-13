const { db } = require("../../../database");
const Crypto = require("crypto");
// const { sendVerifyForget } = require("../../system/verification/verifyForgetPass");
// const { createToken } = require("../../../helper/createToken");


module.exports = (req, res) => {
    let { user_id, newPassword, password } = req.body;
  password = Crypto.createHmac("sha1", "hash123")
  .update(password)
  .digest("hex");

  newPassword = Crypto.createHmac("sha1", "hash123")
  .update(newPassword)
  .digest("hex");
    let selectQuery = `SELECT users.password FROM users WHERE user_id = ${db.escape(user_id)}`
    
    db.query(selectQuery, (err, results) => {
        if (err) {
          console.log(err);
            res.status(500).send(err);
        }
        

        if (results.length > 0) {
            console.log(results[0].password, password, "ini passwordd >>>>,", newPassword)
            if (results[0].password !== password) {
                console.log(results[0].password, password, "ini passwordd >>>>", newPassword)
                return res.status(400).send({message: "Sandi lama tidak cocok"})
            }

            let updateQuery = `UPDATE users SET password = ${db.escape(newPassword)} where user_id = ${db.escape(user_id)};`
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
    })


}
