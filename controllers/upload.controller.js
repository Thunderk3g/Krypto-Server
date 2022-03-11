var multer = require("multer");
var fs = require("fs");
var upload = multer({ dest: 'uploads/' })
var Image = require('../models/updateCred.model');

// GET for image form
exports.create = function(req, res, next) {
  res.render("create_image", {title: "Create Image"});
};

// Uploading image to mongoDB Atlas
 exports.upload = upload.single("image"), function(req, res, next) {
  var image = new Image({
      name: req.body.image_name
  });
  image.img.data = fs.readFileSync(req.file.path);
  image.img.contentType = "image/jpg";
  image.save(function(err) {
      if (err) { return next(err); }
      res.redirect("/");
  });
};

// Show some random image
router.get("/image", function(req, res, next) {
  Image.findOne({}, function(err, image) {
      if (err) { return next(err); }
      res.contentType(image.img.contentType)
      res.send(image.img.data);
  });
});
