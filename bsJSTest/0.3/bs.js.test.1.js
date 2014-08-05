function _jsTestFn(){
	bs.js(function(){
		_jsFlg[0] = true;
		_jsTestFn();
	}, "./bs.js.test.2.js");
};
