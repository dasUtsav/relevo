var {User} = require('./../db/models/user');

var authenticate = (req, res, next) => {
  var token = req.header('auth');


  User.findByToken(token).then((user) => {
    if(!user){
      console.log("User not found");
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send("User not authenticated");
  })
}

module.exports = {authenticate}
