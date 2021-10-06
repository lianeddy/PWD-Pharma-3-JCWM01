const { db } = require("../database");
const Crypto = require("crypto");
const { sendVerify } = require("./verification/verificationController");

module.exports = {
    // getData: (req, res) => {
    //     let scriptQuery = `Select * from users where username=${db.escape(req.body.username)} and password=${db.escape(req.body.password)};`
    //     console.log(req.body, scriptQuery)
    //     db.query(scriptQuery, (err, results) => {
    //         if (err) res.status(500).send(err)
    //         if (results[0]) {
    //             res.status(200).send({dataLogin: results[0], message: "Login Success" })
    //         }
    //     })
    // }

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
        let created = 'user';
        let insertQuery = `Insert into users values (null, ${db.escape(full_name)}, ${db.escape(email)}, ${db.escape(username)}, ${db.escape(password)},
        null, null, null, null, null, 2, ${db.escape(created)}, NOW(), ${db.escape(created)}, NOW());`
        db.query(insertQuery, (err, results) => {
          if (err) {
              console.log(err)
              res.status(500).send(err)
          }
          res.status(200).send(results);

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
