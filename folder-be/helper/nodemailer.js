const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pramptrbgs@gmail.com',
        pass: 'xdymlxczvzhmfzni'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter