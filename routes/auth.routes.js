const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const uploadController = require("../controllers/upload.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  /*Admin Signup*/
  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    controller.signup
  );
  /*Admin Signin*/
  app.post("/signin", controller.signin);

  /*Add to Favourite*/
  app.post("/fav", controller.fav);

  /*Display Favourites*/
  app.post("/getfav", controller.getfav);

  /*Delete Favourite*/
  app.post("/delfav", controller.delfav);

  /*Add NFT*/
  app.post("/addnft", controller.addnft);

  /*Display NFT*/
  app.post("/getnft", controller.getnft);

  /*Del NFT*/
  app.post("/delnft", controller.delnft);

  /*Update Details*/
  app.post("/updateCred", controller.updateCred);

  /*Upload Picutre*/
  app.post("/upload", uploadController.uploadFiles);
  app.get("/files", uploadController.getListFiles);
  app.get("/files/:name", uploadController.download);
};
