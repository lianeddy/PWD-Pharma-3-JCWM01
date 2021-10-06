const { db } = require("../database");
const Crypto = require("crypto");
const { sendVerify } = require("./verification/verificationController");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = `Select * from users where username=${db.escape(
      req.body.username
    )} and password=${db.escape(req.body.password)};`;
    console.log(req.body, scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      if (results[0]) {
        res
          .status(200)
          .send({ dataLogin: results[0], message: "Login Success" });
      }
    });
  },
  testMail: (req, res) => {
    let verify = sendVerify(req.query.email, "lalalalala");
    if (verify) {
      res.status(500).send({ message: "Fail", success: false });
    }
    res.status(200).send({ message: "Success", success: true });
  },
};
