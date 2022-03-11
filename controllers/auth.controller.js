const config = require("../config/auth.config");
const db = require("../models/");
const User = db.user;
const Role = db.role;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const axios = require('axios');
const upload = require("../middlewares/image");

const Favourite = require("../models/favourite.model");
const Credentials = require("../models/updateCred.model")
const NFT = require("../models/nft.model");
const image = require("../middlewares/image");
const headers = {
  "x-access-token":process.env.COIN_ACCESS_TOKEN ,
};

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    password: bcrypt.hashSync(req.body.password)
  });

  user.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};

exports.signin =  (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid =  bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        id: user._id,
        email: user.email,
        accessToken: token
      });
    });
};

exports.getdata = async function (req, res, next) {
  axios
    .get("https://api.coinranking.com/v2/coins", { headers })
    .then(async function (response) {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.getcoinData = async function (req, res, next) {
  var uuid = req.body.uuid
   axios
    .get("https://api.coinranking.com/v2/coin/"+uuid, { headers })
    .then(async function (response) {
      await res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

/*Add to Favourites*/
exports.fav = (req, res) => {
  const fav = new Favourite({
    iconUrl: req.body.iconUrl,
    name: req.body.name,
    change: req.body.change,
    price: req.body.price,
    marketcap: req.body.marketcap,
    userId: req.body.userId,
    isFav: true,
  });

  fav.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Added to favourite successfully!" });
  });
};

/*View Favourites*/
exports.getfav = async function(req, res, next) {
  const getfav = await Favourite.find({isFav:true,userId:req.body.userId}).sort({createdAt: -1});
  res.send(JSON.stringify(getfav));
}

/*Delete Favourites*/
exports.delfav = async function(req, res, next) {
  const getfav = await Favourite.findOneAndDelete({isFav:true,userId:req.body.userId,name:req.body.name}).sort({createdAt: -1});
  res.send(JSON.stringify(getfav));
}

/*Add NFT */
exports.addnft = (req, res) => {
  const nft = new NFT({
    name: req.body.name,
    price: req.body.price,
    iconUrl: req.body.iconUrl,
    userId: req.body.userId,
  });
  nft.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Added to NFT successfully!" });
  });
};
 /*Retrieve NFT */
 exports.getnft = async function(req, res, next) {
  const getnft = await NFT.find({userId:req.body.userId}).sort({createdAt: -1});
  res.send(JSON.stringify(getnft));
}

 /*Delete NFT */
 exports.delnft = async function(req, res, next) {
  const delnft = await NFT.findOneAndDelete({userId:req.body.userId,name:req.body.name}).sort({createdAt: -1});
  res.send(JSON.stringify(delnft));
}

/*Update Personal Credentials*/
exports.updateCred(image.single("file"), async (req, res) => {
 
  const file = req.body.image
  console.log(req);
  if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
  }
  res.status(200).send({
      statusCode: 200,
      status: 'success',
      uploadedFile: file
  })

}, (error, req, res, next) => {
  res.status(400).send({
      error: error.message
  })
});


