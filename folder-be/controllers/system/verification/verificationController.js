const NODEMAILER_CONFIG = require("../../../helper/constants/nodemailer_config");
const transporter = require("../../../helper/nodemailer");

module.exports = {
  sendVerify: (userEmail, token) => {
    let mail = {
      from: `Admin <${NODEMAILER_CONFIG.user}>`,
      to: `${userEmail}`,
      subject: "Account verification",
      html: `<h2>Halo ayo verifikasi!</h2> <a href='http://localhost:3000/authentication/${token}'>Authentication</a> `,
    };
    console.log(userEmail);
    transporter.sendMail(mail, (err, res) => {
      if (err) {
        console.log(err);
        return false;
      }
      return true;
    });
  },
};
