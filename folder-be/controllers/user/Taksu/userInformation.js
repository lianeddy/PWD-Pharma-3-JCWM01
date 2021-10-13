const { db } = require("../../../database");
const { uploader } = require("../../../helper/upload/upload");
const fs = require("fs");

module.exports = {
  getUserInfomation: (req, res) => {
    let { user_id, username, email, role_id, auth, iat, exp } = req.user;
    console.log(user_id);
    let getInformation = `SELECT username, full_name, email, birthdate, address, gender, phone_no from users where user_id = ${db.escape(
      user_id
    )}`;
    db.query(getInformation, (err, qRes) => {
      if (err) {
        console.log(err);
        res.status(500).send({ ...err, success: false });
        return false;
      }
      res.status(200).send({ ...qRes, success: true });
    });
  },
  updateUserInformation: (req, res) => {
    let { user_id, username, email, role_id, auth, iat, exp } = req.user;
    dataUpdate = [];
    for (let val in req.body) {
      if (req.body[val]) {
        dataUpdate.push(`${val} = ${db.escape(req.body[val])}`);
      }
    }
    console.log(dataUpdate);
    if (dataUpdate) {
      let updateInformation = `update users set ${dataUpdate} where user_id = ${db.escape(
        user_id
      )}`;
      console.log("Test");
      db.query(updateInformation, (err, qRes) => {
        if (err) {
          console.log(err);
          res.status(500).send({ ...err, success: false });
          return false;
        }
        res.status(200).send({ message: "Success!", success: true });
        return true;
      });
    } else {
      res.status(500).send({ message: "Data update error", success: false });
    }
  },
  uploadPicture: (req, res) => {
    try {
      let path = "/users/picture";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }
        const { file } = req.files;
        const filePath = file ? path + "/" + file[0].filename : null;
        let data = JSON.parse(req.body.data);
        data.image = filePath;
        /* 
        query
        */
        res.status(200).send({ message: "Berhasil upload" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};