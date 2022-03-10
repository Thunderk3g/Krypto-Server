const mongoose = require("mongoose");

const updateCred = mongoose.model(
  "updateCred",
  new mongoose.Schema({
    name: String,
    address: String,
    userId: String,
    photo:{
        data: Buffer,
        contentType: String
    }
  })
);

module.exports = updateCred;