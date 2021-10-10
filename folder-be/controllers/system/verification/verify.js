const NODEMAILER_CONFIG = require("../../../helper/constants/nodemailer_config");
const transporter = require("../../../helper/nodemailer");
const { db } = require("../../../database");

module.exports = {
  sendVerify: (userEmail, token) => {
    let mail = {
      from: `Admin <${NODEMAILER_CONFIG.user}>`,
      to: `${userEmail}`,
      subject: "Account verification",
      html: `<div
      style="
        text-align: center;
        margin: 20px 30% 0px 30%;
        border: 1px solid black;
        height: 1000px;
        background-color: azure;
      "
    >
      <h2>Halo ayo verifikasi!</h2>
      <a href="http://localhost:3000/authentication/${token}">Authentication</a>`,
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
  verification: (req, res) => {
    let { user_id, username, email, role_id, auth, iat, exp } = req.user;
    let checkVerify = `select auth from users where user_id =${db.escape(
      user_id
    )} && auth = 'verified'`;
    let updateVerify = `update users set auth = 'verified', modified_date = NOW() where user_id = ${db.escape(
      user_id
    )}`;

    db.query(checkVerify, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return false;
      }
      console.log(result, "test");
      if (result.length > 0) {
        res
          .status(200)
          .send({ message: "User already verified!", success: false });
        return false;
      } else {
        db.query(updateVerify, (err, result) => {
          if (err) {
            res.status(500).send(err);
            return false;
          }
          console.log(result, "test2");
          res
            .status(200)
            .send({ message: "User have been verified!", success: true });
        });
      }
    });
  },
};
