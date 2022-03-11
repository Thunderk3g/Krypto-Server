const mongoose = require('mongoose');

const updatecred = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
   },
   photo:{
    data: Buffer,
    contentType: String
}
  },
  {
    timestamps: true,
  }
);

const updateCred = mongoose.model('updateCred', updatecred);

module.exports = updateCred;
