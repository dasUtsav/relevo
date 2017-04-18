const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://arvind:123@ds163020.mlab.com:63020/relevo');

module.exports = {
  mongoose
};
