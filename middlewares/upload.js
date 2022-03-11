const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
var storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = buf.toString('hex') + path.extname(file.originalname);
      return filename;
    }
    return {
      bucketName: images,
      filename: buf.toString('hex') + path.extname(file.originalname)
    };
  }
});
var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
