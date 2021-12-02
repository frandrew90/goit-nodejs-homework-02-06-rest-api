const multer = require("multer");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "../../", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
