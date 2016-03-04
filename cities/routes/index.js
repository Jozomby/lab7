var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('weather.html', { root: 'public' });
});

router.get('/getcity', function(req,res,next) {
  var myRe = new RegExp("^" + req.query.q);
  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var cities = data.toString().split("\n");
    var jsonresult = [];
    for(var i = 0; i < cities.length; i++) {
      var result = cities[i].search(myRe);
      if(result != -1) {
        jsonresult.push({city:cities[i]});
      }
    }
    res.status(200).json(jsonresult);
  })
});

router.get("/getnews", function(req,res,next) {
  console.log("IN NEWS");
  fs.readFile(__dirname + '/'+req.query.q+".txt",function(err,data) {
    if(err) throw err;
    console.log(req.query.q);
    var news = data.toString();
    console.log(news);
    res.status(200).send(news);
  })
});

module.exports = router;
