var tls = require('tls');
var settings = require('./settings');
var fs = require('fs');

var server = tls.createServer({
  key: fs.readFileSync('ssl/server-key.pem'),
  cert: fs.readFileSync('ssl/server-cert.pem'),
  requestCert: true,
  ca: [ fs.readFileSync('ssl/client-cert.pem') ],
  rejectUnauthorized: false
}, function (cleartextStream) {
  if (!cleartextStream.authorized) {
    cleartextStream.close();
  }

  cleartextStream.on('data', function (data) {
    console.log(data.toString());
  });

  cleartextStream.write('welcome!\n');
});

server.listen(settings.get('port'), function () {
  console.log('Server has been bound to', settings.get('port'));
});