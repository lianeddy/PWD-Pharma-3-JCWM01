// MIddleware to translate sended token from Client, it's called as decoding proccess
const jwt = require("jsonwebtoken");
const TOKEN_KEY = require("./constants/token_config");

module.exports = {
  auth: (req, res, next) => {
    console.log(req.token," ini ress")
    jwt.verify(req.token, TOKEN_KEY.privateString, (err, decode) => {
      if (err) {
        return res.status(401).send("User not auth!");
      }
      req.user = decode;

      next();
    });
  },
};

// How do we get the req.token? from Client that sending the token through headers with express bearer token
