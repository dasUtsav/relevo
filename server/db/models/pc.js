const mongoose = require('mongoose');


var PcSchema = new mongoose.Schema({
    pcNo: {
      type: String,
      required: true
    },
    labNo:{
      type: Number,
      required: true
    },
    currentConfig:{
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    history: [{
      date: {
        type: Date
      },
      config: {
        type: Object,
        default: {}
      }
    }],
    issues: [{
      date: {
        type: Date
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }]



});

var Pc = mongoose.model('Pc', PcSchema);

module.exports = {Pc};
