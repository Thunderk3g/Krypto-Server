const mongoose = require('mongoose');

const favourite = mongoose.Schema(
  {
    iconUrl: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    change: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    marketcap: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
   },
   isFav:{
    type: Boolean,
    default:false
   }
  },
  {
    timestamps: true,
  }
);

const Favourite = mongoose.model('Favourite', favourite);

module.exports = Favourite;
