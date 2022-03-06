const mongoose = require('mongoose');

const nft = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    iconUrl: {
        type: String,
        required: true,
        trim: true,
      },
    userId: {
      type: String,
      required: true,
      trim: true,
   }
  },
  {
    timestamps: true,
  }
);

const NFT = mongoose.model('NFT', nft);

module.exports = NFT;
