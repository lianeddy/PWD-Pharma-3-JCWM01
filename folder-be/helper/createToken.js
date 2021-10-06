// Middleware to make token, to make/translate data into token. It's called as encoding proses.
// Have to use the same private KEY
const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        return jwt.sign(payload, "private123", {
            expiresIn: '12h'
        })
    }
}