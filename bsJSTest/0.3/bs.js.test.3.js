function _jsTestFn(){
	bs.js(function(){
		_jsFlg[2] = true;
		_jsTestFn();
	}, "./bs.js.test.4.js");
};
