function _jsTestFn(){
	bs.js(function(){
		_jsFlg[1] = true;
		_jsTestFn();
	}, "./bs.js.test.3.js");
};
