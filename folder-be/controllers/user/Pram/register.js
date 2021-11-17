const { db } = require("../../../database");

const Crypto = require("crypto");

const { sendVerify } = require("../../system/verification/verify");
const { createToken } = require("../../../helper/createToken");

module.exports = (req, res, next) => {
  let { full_name, username, email, password } = req.body;
  let emailChecker = `Select email from users where email Like ${db.escape(email)};`;
  // let usernameChecker = `Select username from users where username Like ${db.escape(username)};`;

  db.query(emailChecker, (err, ress) => {
    if (err) {
      return res.status(500).send(err);
    } else if (ress.length > 0) {
      res.status(200).send({
        message: "Email sudah terdaftar!",
        success: false,
      });
    } else {
      console.log(email, full_name, username, "<<<<< ini data")
      let usernameChecker = `Select username from users where username Like ${db.escape(username)};`;
      db.query(usernameChecker, (error, resultss) => {
        if(resultss.length > 0) {
         return res.status(200).send({
            message: "Username sudah terdaftar!",
            success: false,
          });
        } else {
          password = Crypto.createHmac("sha1", "hash123")
          .update(password)
          .digest("hex");
  
        // test email and username checker
  
  
        let insertQuery = `Insert into users values (null, ${db.escape(full_name)},
     ${db.escape(email)}, ${db.escape(username)}, ${db.escape(password)},
      null, null, null, null, 'unverified', 2, 'system', NOW(), 'system', NOW(), null);`;
        db.query(insertQuery, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
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
                message: "Berhasil Mendaftar",
                success: true,
              });
            });
          }
        });
      }
    })
  
        }
      })

     

};
