var d;
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(d+'\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var serialPort = require("serialport")
var SerialPort = require("serialport").SerialPort
var sp = new SerialPort("/dev/tty.usbmodem411", {
  baudrate: 115200,
  parser: serialPort.parsers.readline("\n")
});
sp.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    sp.on('data', function(data) {
      console.log('data received: ' + data);
      d = data;
    });
  }
});