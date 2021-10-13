const NODEMAILER_CONFIG = require("../../../helper/constants/nodemailer_config");
const transporter = require("../../../helper/nodemailer");

module.exports = {
  sendVerifyForget: (userEmail, token, user_id) => {
    let mail = {
      from: `Admin <${NODEMAILER_CONFIG.user}>`,
      to: `${userEmail}`,
      subject: "Verifikasi untuk lupa sandi",
      html: `<h2>Halo sobat sehat! klik link di bawah ini untuk me-reset sandi.
      Jangan berikan link ini kepada pihak lainnya
      </h2> <a href='http://localhost:3000/resetpassword?token=${token}'>Ubah sandi mu di sini!</a> `,
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
