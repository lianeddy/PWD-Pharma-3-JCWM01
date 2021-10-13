const { db } = require("../../../database");
const Crypto = require('crypto')
const { createToken } = require("../../../helper/createToken");



module.exports = (req, res) => {
  req.body.password = Crypto.createHmac("sha1", "hash123").update(req.body.password).digest("hex");


  let scriptQuery = `Select * from users where username=${db.escape(req.body.username)} and password =${db.escape(req.body.password)};`;
  console.log(req.body)
  db.query(scriptQuery, (err, results) => {
    console.log(results)
    if (err) {
      res.status(500).send({ errMessage: "internal server error" });
    }
    // IF SUCCESS
    if (results[0]) {
      // Token Material
      let { username, role_id, user_id, email } = results[0];

      // Create Token
      let token = createToken({ username, role_id, user_id, email });

      res.status(200).send({ dataLogin: results[0], token, message: "Login Success" })
      console.log(results[0], "ini resutls.data")
    } else {
      // IF ERROR 
      console.log(results[0])
      return res.status(400).send({ message: "Incorrect username / password" });
    }
  });
};
