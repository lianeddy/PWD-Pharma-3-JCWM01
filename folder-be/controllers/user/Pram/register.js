const { db } = require("../../../database");

const Crypto = require("crypto");

const { sendVerify } = require("../../system/verification/verify");
const { createToken } = require("../../../helper/createToken");
const { nextTick } = require("process");

module.exports = (req, res) => {
  console.log(req.body);
  let { full_name, username, email, password } = req.body;
  password = Crypto.createHmac("sha1", "hash123")
    .update(password)
    .digest("hex");
  let insertQuery = `Insert into users values (null, ${db.escape(
    full_name
  )}, ${db.escape(email)}, ${db.escape(username)}, ${db.escape(password)},
    null, null, null, null, 'unverified', 2, 'system', NOW(), 'system', NOW());`;
  db.query(insertQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if(results.length > 0) {
      let getQueryEmail = `Select * from ${db.escape(email)};`
      db.query(getQueryEmail, (err, results) => {
        if(email === results[0].email ) {
          res.status(400).send(err, "Email exist")
        }
  
        next()
      })
    }


    if (results.insertId) {
      let sqlGet = `Select * from users where user_id = ${results.insertId};`;
      db.query(sqlGet, (err2, results2) => {
        if (err2) {
          console.log(err2);
          res.status(500).send(err2);
        }

        let { user_id, username, email, role_id, auth } = results2[0];
        let token = createToken({ user_id, username, email, role_id, auth });
        let checkVerify = sendVerify(email, token);
          if (checkVerify === false) {
            res.status(500).send({ message: "gagal mengirim", status: false });
        }
            res.status(200).send({
             message: "Registration Success, Check Your Email!",
             success: true,
            });
            console.log('====================')
            console.log(results)
          });
        }
      });
    };
