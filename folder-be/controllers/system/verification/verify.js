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
        height: 700px;
        background-color: ghostwhite;
      "
    >
      <h1 style="color: green; padding-top: 200px">
        Thank you for registering!
      </h1>
      <h2 style="color: goldenrod">
        Click on the buttom below to verify your account
      </h2>
      <a href="http://localhost:3000/authentication/${token}">
        <button
          style="
            font-size: 20px;
            background-color: white;
            color: yellowgreen;
            border: 1px solid green;
            border-radius: 8px;
            margin: auto;
            padding: 12px;
            width: 200px;
          "
        >
          Verify
        </button></a
      >
    </div>`,
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
          .send({ message: "Account is already verified!", success: false });
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
            .send({ message: "Account have been verified!", success: true });
        });
      }
    });
  },
};
