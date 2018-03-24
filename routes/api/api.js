var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Greenhouse = require('../models/greenhouse');
var Dailyreport = require('../models/report');
var User = require('../models/users');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//exclude sigin and signup routes ?token=+token
router.use('/',function(req,res,next){
  jwt.verify(req.query.token,'secret',function(err,decoded){
    if(err){
      return res.status(500).json({
        title:'an error occured'
      }) 
    }
    next();

  });

})




router.get('/view', function (req, res, next) {
  Greenhouse.find().exec().then((data) => { res.json(data) }).catch((err) => { console.log(err) });


});

// router.get('/view/:id', function(req, res, next) {
//   let  id= req.params.id;
//    Report.findById(id).exec().then((data) => { res.json(data) }).catch((err) => { console.log(err)});


//  });


router.post('/add', function (req, res) {
  var person = new Greenhouse({
    name: req.body.name,
    _id: new mongoose.Types.ObjectId()

  });
  person.save((data) => { res.end("sucess news" + req.body.name) });

});


router.post('/addreport', function (req, res) {

  var report = new Dailyreport({
    _id: new mongoose.Types.ObjectId(),
    date: req.body.date,
    Greenhouse: req.body.Greenhouse,
    itemRows: req.body.itemRows,


  })

  report.save((data) => { res.end("sucess") });


});

router.get('/addreport', function (req, res, next) {

  Dailyreport.find().exec().then((data) => { res.json(data) }).catch((err) => { console.log(err) });
});



router.get('/reportofid/:id', function (req, res, next) {

  let id = req.params.id;

  Dailyreport.findById(id).exec().then((data) => { res.json(data) }).catch((err) => { console.log(err) });

});

router.post('/updatereport/:id', function (req, res) {
  let ids = req.params.id;
  console.log(ids)
  console.log(req.body)

  Dailyreport.findOneAndUpdate({ _id: ids }, req.body, function (err, place) {
    res.send(place);

  });



});


module.exports = router;
