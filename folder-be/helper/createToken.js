// Middleware to make token, to make/translate data into token. It's called as encoding proses.
// Have to use the same private KEY
const jwt = require("jsonwebtoken");
const TOKEN_KEY = require("./constants/token_config");
module.exports = {
  createToken: (payload) => {
    console.log()
    return jwt.sign(payload, TOKEN_KEY.privateString, {
      expiresIn: "12h",
    });
  },
};
