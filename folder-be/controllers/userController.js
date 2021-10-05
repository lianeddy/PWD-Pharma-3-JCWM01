const { db } = require("../database");
const Crypto = require("crypto");

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

      addData: (req, res) => {
          console.log(req.body)
        //   let insertQuery = `Insert into users values ()`
      }
}
