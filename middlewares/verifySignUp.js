const db = require("../models");

const ROLES = db.ROLES;

const User = db.user;


checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Username

  User.findOne({

    phonenumber: req.body.phonenumber

  }).exec((err, user) => {

    if (err) {

      res.status(500).send({ message: err });

      return;

    }


    if (user) {

      res.status(409).send({ message: "Failed! Phone Number is already in use!" });

      return;

    }


    // Email

    User.findOne({

      email: req.body.email

    }).exec((err, user) => {

      if (err) {

        res.status(500).send({ message: err });

        return;

      }


      if (user) {

        res.status(400).send({ message: "Failed! Email is already in use!" });

        return;

      }


      next();

    });

  });

};


const verifySignUp = {

  checkDuplicateUsernameOrEmail,


};


module.exports = verifySignUp;