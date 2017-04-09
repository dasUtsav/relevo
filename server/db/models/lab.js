const mongoose = require('mongoose');


var LabSchema = new mongoose.Schema({
    labNo:{
      type: Number,
      required: true,
      unique: true
    },
    incharge:{
      type: String,
      required: true
    }
});

var Lab = mongoose.model('Lab', LabSchema);

module.exports = {Lab};
