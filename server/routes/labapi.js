const express = require('express');

const labapi = express.Router();
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const {Lab} = require('./../db/models/lab');
const {Pc} = require('./../db/models/pc');
const {adminAuthenticate} = require('./../middleware/adminAuthenticate');
const {Counter} = require('./../db/models/counter');

labapi.post('/addLab', adminAuthenticate, (req, res)=>{
  var body = _.pick(req.body, ['labNo', 'incharge']);
  var lab = new Lab(body);
  lab.save().then(()=>{
    res.send(lab);
  }).catch((e)=>{
    res.status(400).send('Coundnt save lab successfully');
  })
});

labapi.delete('/removeLab', adminAuthenticate, (req, res)=>{
  var body = _.pick(req.body, ['labNo']);
  Lab.findOneAndRemove({labNo: body.labNo}).then((lab)=>{
    if(!lab){
      return Promise.reject();
    }
    res.send(lab);
  }).catch((e) => {
    res.status(400).send("Could not find the desired labno");
  });
});

labapi.post('/addpc', (req, res)=>{
  var body = _.pick(req.body, ['labNo', 'currentConfig']);
  var pc = new Pc(body);
  pc.history = [];
  console.log("Current config is ", pc);
  pc.history.push({
    date: new Date(),
    config: pc.currentConfig
  });
  console.log(pc);
  Counter.findOneAndUpdate({labNo: body.labNo},{$inc: {count: 1}}).then((counter)=>{
    // console.log(pc.pcNo);
    pc.pcNo = body.labNo + "-" + counter.count;
    // console.log(pc);
    return pc.save();
  }).then(()=>{
    res.send(pc);
  }).catch((e)=>{
    res.status(400).send('Coundnt save the PC');
  });
});

labapi.post('/updateconfig', (req, res)=>{
  console.log(req.body);
  var reqConfig = _.pick(req.body, ['pcNo', 'labNo']),
      updateConfig = _.pick(req.body, 'config');
  Pc.findOne(reqConfig).then((pc)=>{

    currentConfig = pc.currentConfig;
    pc['currentConfig'] = updateConfig.config;
    console.log(pc);
    pc.history.push({
      date: new Date(),
      config: updateConfig.config
    });
    return pc.save();
  }).then(()=>{
    res.status(200).send('PC updated successfully');
  }).catch(()=>{
    res.status(400).send('Couldnt update pc');
  });
});

labapi.get('/gethistory', (req, res)=>{
    var labNo = req.query.labNo;
    var pcNo = req.query.pcNo;
    Pc.findOne({labNo, pcNo}).then((pc)=>{
      if(!pc)
        return Promise.reject();
      res.send(pc);
    }).catch((err)=>{
      res.status(404).send('could not find pc');
    });
});

labapi.get('/getallpcs', (req, res)=>{
    if(!req.query.labNo){
      Pc.find().then((pcs)=>{
      if(pcs.length === 0){
        res.status(404).send();
      }
      res.send(pcs);
    }).catch((err)=>{
      res.status(404).send('could not find pcs for this particular lab');
    });
    }
    var labNo = req.query.labNo;
    Pc.find({labNo}).then((pcs)=>{
      if(pcs.length === 0){
        res.status(404).send();
      }
      res.send(pcs);
    }).catch((err)=>{
      res.status(404).send('could not find pcs for this particular lab');
    });
});

labapi.get('/getlabs', (req, res)=>{
    Lab.find().then((labs)=>{
      if(labs.length === 0){
        res.status(404).send();
      }
      res.send(labs);
    }).catch((err)=>{
      res.status(404).send('could not find pcs for this particular lab');
    });
});

labapi.delete('/removefromhistory', (req, res)=>{
    var id = req.body._id;
    if(!ObjectID.isValid(id)){
      res.status(404).send();
    }
    Pc.update({
      $pull: {
        history:{
          _id:id
        }
      }
    }).then(()=> {
      res.send('Deleted successfully');
    }).catch((err)=>{
      res.status(400).send('Couldnt delete commit');
    })
});

labapi.post('/addIssue', (req, res)=>{
    console.log(req.body);
    Pc.findOne({
              labNo: req.body.labNo, 
              pcNo: req.body.pcNo
            }).then((pc)=>{
              if(!pc){
                return Promise.reject();
              }
              pc.issues.push({
                date: new Date(),
                title: req.body.title,
                description: req.body.description
              });
              return pc.save();
            }).then(()=>{
              res.send('Issue saved successfully');
            }).catch((err)=>{
              res.status(400).send('could not find pc');
            })
});



module.exports = {
  labapi
}
