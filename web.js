var express = require('express');
var bodyParser = require('body-parser');
var childProcess = require('child_process');
var fs = require('fs');


var app = express();
app.use(express.static('public'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', urlencodedParser, function(req, res){
  res.send('<html><head><title>Screenshots!</title></head><body><h1>Screenshots!</h1></body></html>');
});

app.get('/pdf', urlencodedParser, function(req, res) {
  var url = req.query.url
  var n = url.indexOf("http://");
  if(n != 0) {
    res.send('<html><head><title>Screenshots Error!</title></head><body><h1>Error!</h1></body></html>');
  } else {
    var childArgs = [
      'rasterize.js',
      url
    ];
    //grap the screen
    childProcess.execFile('phantomjs', childArgs, function(error, stdout, stderr){
      console.log("Grabbing screen for: " + url);
      if(error !== null) {
        console.log("Error capturing page: " + error.message + "\n for address: " + childArgs[1]);
        return res.send('<html><head><title>Screenshots Error!</title></head><body><h1>Error!</h1></body></html>');
      } else {
        return res.redirect('/rendered.pdf');
      }
    });
  }

});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
