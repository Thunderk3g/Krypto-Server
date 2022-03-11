const mongoose = require('mongoose');

const updatecred = mongoose.Schema(
  {
    name: {type: String, required: true, max: 100},
    img: {data: Buffer, contentType: String}
  },
  {
    timestamps: true,
  }
);

const updateCred = mongoose.model('updateCred', updatecred);

module.exports = updateCred;
