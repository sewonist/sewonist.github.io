var message;
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(message+'\n');
}).listen(1337, '127.0.0.1');
//console.log('Server running at http://127.0.0.1:1337/');

var SerialPort = require("serialport")
var serialport = new SerialPort.SerialPort("/dev/tty.usbmodem411", {
  baudrate: 9600,
  parser: SerialPort.parsers.readline("\n")
});
serialport.open(function (error) {
  if ( error ) {
    //console.log('failed to open: '+error);
  } else {
    //console.log('open');
    serialport.on('data', function(data) {
      //console.log('data received: ' + data);
      message = data;
    });
  }
});