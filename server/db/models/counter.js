const mongoose = require('mongoose');


var CounterSchema = new mongoose.Schema({
    count:{
        type: Number,
        default:0
    },
    labNo:{
        type: Number
    }
});

var Counter = mongoose.model('Counter', CounterSchema);

module.exports = {Counter};
