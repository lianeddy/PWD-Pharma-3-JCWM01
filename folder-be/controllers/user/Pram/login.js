const { db } = require("../../../database");
const Crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {createToken} = require("../../../helper/createToken");



module.exports = (req, res) => {
  let { username, password } = req.body
  req.body.password = Crypto.createHmac("sha1", "hash123").update(password).digest("hex")
  let scriptQuery = `Select users.full_name, users.email, users.gender, users.role_id, users.address, users.username, users.role_id, users.user_id from users where username = ${db.escape(username
  )} and password = ${db.escape(password)};`;
  console.log(req.body);
  db.query(scriptQuery, [username, password], (err, results) => {
    // IF SUCCESS
    if (results.length > 0) {
      // Token Material
      let {username, role_id} = results[0];
      // const token = jwt.sign({username}, "private123", {
      //   expiresIn: "12h",
      // });
      
      // console.log(token, "testtttt")
      // Create Token
      let token = createToken({username, role_id});

      res.status(200).send({ dataLogin: results[0], token, message: "Login Success" })
      // res.status(200).send({data:results[0]});
      // console.log(results[0].username)
    } else {
      // IF ERROR 
      return res.status(400).send({ message: "Incorrect username / password" });      
    }
  });
};
