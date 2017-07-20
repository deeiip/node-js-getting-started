var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/message/:text/:uuid', function(request, response) {
  // response.render('pages/index');
  var http = require("https");

  var options = {
    "method": "POST",
    "hostname": "hqn6l7zcjk.execute-api.us-east-1.amazonaws.com",
    "port": null,
    "path": "/dev/message",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      // console.log(body.toString());
      response.setHeader('Content-Type', 'application/json');
      response.send(body);
    });
  });
  console.log(request.params.text)
  req.write(JSON.stringify({ message: request.params.text, uuid: request.params.uuid }));
  req.end();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
