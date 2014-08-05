var TEST, RESULT;
TEST = document.getElementById('test');
RESULT = document.getElementById('result');
RESULT.style.fontFamily = TEST.style.fontFamily = 'Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif';
function printer(r){TEST.innerHTML += r;}
bsTest.printer(printer),
bsTest.result(function(r){console.log(r);RESULT.innerHTML = r;});