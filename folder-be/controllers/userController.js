const { db } = require("../database");
const Crypto = require("crypto");
const { sendVerify } = require("./system/verification/verificationController");
const { createToken } = require("../helper/createToken")
const transporter = require('../helper/nodemailer/index')
const NODEMAILER_CONFIG = require("../helper/constants/nodemailer_config");

module.exports = {
    getUsername: (req, res) => {
        let scriptQuery = 'Select * from users;'
        console.log(req.body)
        if(req.body.username) {
            scriptQuery = `Select * from users where username = ${db.escape(req.body.username)} and password = ${db.escape(req.body.password)} ;`
        }
        db.query(scriptQuery, (err, results) => {
          if (err) res.status(500).send(err)
          res.status(200).send(results)
        })
      },

      getData: (req, res) => {
        let scriptQuery = 'Select * from users;'
        db.query(scriptQuery, (err, results) => {
          if (err) res.status(500).send(err)
          res.status(200).send(results)
        })
      },

      login: (req, res) => {
        let scriptQuery = `Select users.full_name, users.birthdate from users where username = ${db.escape(req.body.username)} and password = ${db.escape(req.body.password)};`
          console.log(req.body)
          db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            console.log(`=====`, results)
            const data = results[0]
            res.status(200).send(data);
           
          })
        //   let insertQuery = `Insert into users values ()`
      },

      register: (req, res) => {
        console.log(req.body)
        let {full_name, username, email, password} = req.body
        password = Crypto.createHmac("sha1", "hash123").update(password).digest("hex")
        let insertQuery = `Insert into users values (null, ${db.escape(full_name)}, ${db.escape(email)}, ${db.escape(username)}, ${db.escape(password)},
        null, null, null, null, 'unverified', 2, 'system', NOW(), 'system', NOW());`
        db.query(insertQuery, (err, results) => {
          if (err) {
              console.log(err)
              res.status(500).send(err)
          }
          // res.status(200).send(results);

          if (results.insertId) {
            let sqlGet = `Select * from users where user_id = ${results.insertId};`
            db.query(sqlGet, (err2, results2) => {
                if (err2) {
                    console.log(err2)
                    res.status(500).send(err2)
                }

                // bahan data untuk membuat token
                let { user_id, username, email, role_id, auth } = results2[0]
                // membuat token
                let token = createToken({ user_id, username, email, role_id, auth })
                
                let checkVerify = sendVerify(email, token);
                if (checkVerify === false){
                  res.status(500).send({message: "gagal mengirim", status: false})
                }
                res.status(200).send({ message: "Registration Success, Check Your Email!", success: true })

                // let mail = {
                //   from: `Admin <${NODEMAILER_CONFIG.user}>`,
                //   to: `${userEmail}`,
                //   subject: "Account verification",
                //   html: `<h2>Halo ayo verifikasi!</h2> <a href='http://localhost:3000/authentication/${token}'>Authentication</a> `,
                // };
                // console.log(userEmail);
                // transporter.sendMail(mail, (err, res) => {
                //   if (err) {
                //     console.log(err);
                //     return false;
                //   }
                //   return true;
                // });

                // let mail = {
                //     from: `Admin <leadwear01@gmail.com>`,
                //     to: `${email}`,
                //     subject: 'Account Verification',
                //     html: `<a href='http://localhost:3000/authentication/${token}'>Click here for verification your account</a>`
                // }

                // transporter.sendMail(mail, (errMail, resMail) => {
                //     if (errMail) {
                //         console.log(errMail)
                //         res.status(500).send({ message: "Registration Failed!", success: false, err: errMail })
                //     }
                //     res.status(200).send({ message: "Registration Success, Check Your Email!", success: true })
                // })
            })
        }

      })
  }
}



//From taksu
//   getData: (req, res) => {
//     let scriptQuery = `Select * from users where username=${db.escape(
//       req.body.username
//     )} and password=${db.escape(req.body.password)};`;
//     console.log(req.body, scriptQuery);
//     db.query(scriptQuery, (err, results) => {
//       if (err) res.status(500).send(err);
//       if (results[0]) {
//         res
//           .status(200)
//           .send({ dataLogin: results[0], message: "Login Success" });
//       }
//     });
//   },
//   testMail: (req, res) => {
//     let verify = sendVerify(req.query.email, "lalalalala");
//     if (verify) {
//       res.status(500).send({ message: "Fail", success: false });
//     }
//     res.status(200).send({ message: "Success", success: true });
//   },
// };
