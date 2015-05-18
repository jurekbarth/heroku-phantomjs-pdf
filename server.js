var server = require('webserver').create(),
  system = require('system'),
  fs     = require('fs'),
  port   = system.env.PORT || 8080;

var service = server.listen(port, function(request, response) {
  var url = request.url;
  var n = url.indexOf("/?url=http");
  if(n==0) {
    var cwd = fs.absolute(".");
    console.log(cwd);
    var length = url.length;
    n = url.indexOf("=") + 1;
    url = url.substr(n, length);
    request_page(url, function(pdf){
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.write(fs.read('indexnew.html'));
      console.log("Finished response");
      response.close();
    })
  } else {
    response.statusCode = 400;
    response.close();
  }
});

if(service) console.log("server started - http://localhost:" + server.port);

function request_page(url, callback){
    var page = require('webpage').create();
    var address = url;
    console.log("Adress: " + address);
    page.viewportSize = { width: 1200, height: 1697 };
    page.paperSize = {
      width: '1200px',
      height: '1697px',
      margin: '0px'
    };
    page.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit(1);
        } else {
            window.setTimeout(function () {
                page.render('./pdf/rendered.pdf');
                var path = 'output.txt';
                var content = 'Hello World!';
                fs.write(path, content, 'w');
                //phantom.exit();
                callback();
            }, 2000);
        }
    });
  };
