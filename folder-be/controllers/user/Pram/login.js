const { db } = require("../../../database");
const Crypto = require('crypto')
const {createToken} = require("../../../helper/createToken");



module.exports = (req, res) => {
  let { username, password, email } = req.body
  req.body.password = Crypto.createHmac("sha1", "hash123")
  .update(password)
  .digest("hex")
  let scriptQuery = `Select users.full_name, users.email, users.gender, users.role_id, users.address, users.username, users.role_id, users.user_id from users where username = ${db.escape(username
  )} or ${db.escape(email)} and password = ${db.escape(password)};`;
  console.log(req.body);
  db.query(scriptQuery, [username, password], (err, results) => {
    // IF SUCCESS
    if (results.length > 0) {
      // Token Material
      let {username, role_id, user_id, email} = results[0];
 
      // Create Token
      let token = createToken({username, role_id, user_id, email});

      res.status(200).send({ dataLogin: results[0], token, message: "Login Success" })
      console.log(results[0], "ini resutls.data")
    } else {
      // IF ERROR 
      return res.status(400).send({ message: "Incorrect username / password" });      
    }
  });
};
