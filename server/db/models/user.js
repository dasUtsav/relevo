const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  tokens: [{
    token:{
      type: String,
      required: true
    }
  }
  ]
});

UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt)=> {
      if(err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    });
  }else{
    next();
  }
});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'username']);
}

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var token = jwt.sign({
    _id: user._id.toHexString(),
  }, 'abc123').toString();
  user.tokens.push({
    token
  });
  return user.save().then(() => {
    return token;
  });
}

UserSchema.statics.findByCredentials = function(username, password){
  var User = this;

  return User.findOne({username}).then((user)=>{
    if(!user){
      return Promise.reject();
    }

    return new Promise((resolve, reject)=>{
      bcrypt.compare(password, user.password, (err, res) => {
        if(res){
          resolve(user);
        }else{
          reject();
        }
      })
    });
  })
};


UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;
  try{
    decoded = jwt.verify(token, 'abc123');
  } catch(e){
    // return new Promise((resolve, reject) => {
    //   reject();
    // })
    return Promise.reject();
  }
  console.log(decoded._id);
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token
  })
}

UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
}

var User = mongoose.model('User', UserSchema);

module.exports = {User};
