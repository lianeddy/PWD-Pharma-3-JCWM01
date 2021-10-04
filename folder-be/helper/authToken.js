// MIddleware to translate sended token from Client, it's called as decoding proccess 

const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        jwt.verify(req.token, "private123", (err, decode) => {
            if (err) {
                return res.status(401).send("User not auth!")
            }
            req.user = decode

            next()
        })
    }
}

// How do we get the req.token? from Client that sending the token through headers with express bearer token