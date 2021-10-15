const multer = require("multer");
const fs = require("fs");

module.exports = {
  uploader: (dir, prefix) => {
    let _defaultDir = "./public";

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = _defaultDir + dir;
        if (fs.existsSync(pathDir)) {
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, (err) => cb(err, pathDir));
        }
      },
      filename: (req, file, cb) => {
        let ext = file.originalname.split(".");
        let filename = `${prefix}.${ext[ext.length - 1]}`;
        cb(null, filename);
      },
    });
    const fileFilter = (req, file, cb) => {
      const ext = /\.(jpg|jpeg|png|gif|pdf|txt|JPG|PNG|JPEG)/;
      if (!file.originalname.match(ext)) {
        return cb(new Error("Extension denied"), false);
      }
      cb(null, true);
    };
    return multer({
      storage,
      fileFilter,
    });
  },
};
