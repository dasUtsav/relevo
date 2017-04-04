const express = require('express');

const router = express.Router();

const {User} = require('./../db/models/user');


router.get('/', (req, res)=>{
  res.send('Default api path');
});

router.post('/adduser', (req, res)=>{
  var user = new User({
    name: req.body.name
  });
  user.save().then((doc)=>{
    res.send(doc);
  }, (err)=>{
    res.status(400).send();
  });
});

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

module.exports = router;
