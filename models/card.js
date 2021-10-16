const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 200,
  },
  description: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 5000,
  },
  image: {
    type: [String],
    // required: true,
    validate: {
      validator(v) {
        const regexp = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w\W.-]*)#?$/g;
        return regexp.test(v);
      },
      message: 'Ссылка не верна',
    },
  },
  investPrice: {
    type: Number,
    // required: true,
    //   validate: {
    //     validator: function(v) {
    //         return /d{10}/.test(v);
    //     },
    //     message: '{VALUE} is not a valid 10 digit number!'
    // },
    minlength: 2,
    maxlength: 10,
  },
  sellPrice: {
    type: Number,
    // required: true,
    //   validate: {
    //     validator: function(v) {
    //         return /d{10}/.test(v);
    //     },
    //     message: '{VALUE} is not a valid 10 digit number!'
    // },
    minlength: 2,
    maxlength: 10,
  },
  revenueFromLot: {
    type: Number,
    // required: true,
    //   validate: {
    //     validator: function(v) {
    //         return /d{10}/.test(v);
    //     },
    //     message: '{VALUE} is not a valid 10 digit number!'
    // },
    minlength: 2,
    maxlength: 10,
  },
  investorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // type: Number,
    // required: true,
    //   validate: {
    //     validator: function(v) {
    //         return /d{10}/.test(v);
    //     },
    //     message: '{VALUE} is not a valid 10 digit number!'
    // },
    // minlength: 2,
    // maxlength: 10,
  },
  status: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 50,
  },
  lotId: {
    type: Number,
    // required: true,
    //   validate: {
    //     validator: function(v) {
    //         return /d{10}/.test(v);
    //     },
    //     message: '{VALUE} is not a valid 10 digit number!'
    // },
    minlength: 2,
    maxlength: 10,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
});

module.exports = mongoose.model('card', cardSchema);
