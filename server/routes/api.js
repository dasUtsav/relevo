const express = require('express');

const router = express.Router();

const {User} = require('./../db/models/user');
const {Counter} = require('./../db/models/counter');
const {authenticate} = require('./../middleware/authenticate');
const _ = require('lodash');
const {labapi} = require('./labapi');


router.get('/', (req, res)=>{
  res.send('Default api path');
});

router.use('/lab',labapi);

router.post('/adduser', (req, res)=>{
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: true
  });
  user.save().then((doc)=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });;
});

router.post('/addCounter', (req, res)=>{
  var counter = new Counter({
    labNo: req.body.labNo
  });

  counter.save().then(()=>{
  res.status(200).send("successfully added counter"); 
  }).catch((e)=>{
    res.status(400).send("Couldnt update counter"); 
  });
})

router.post('/login', (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);

  User.findByCredentials(body.username, body.password).then((user)=>{
      var retObj = {};
      user.generateAuthToken().then((token)=>{
          retObj = _.pick(user, ['_id', 'username']);
          retObj.token = token;
          return user.getLabFromId();

      }).then((lab)=>{
        retObj.labNo = lab.labNo;
        res.send(retObj);
      });

  }).catch((err)=>{
    res.status(400).send();
  });
})


router.get('/getusers', (req, res)=>{
  User.find({})
      .then(users=>{
        if(!users || users.length === 0)
          res.status(404).send();
        res.send({users});
      }, (err)=>{
        res.status(400).send();
      });
});

router.delete('/logout', authenticate, (req, res)=>{
    req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }).catch((err)=>{
    res.status(400).send();
  });
})

module.exports = router;
