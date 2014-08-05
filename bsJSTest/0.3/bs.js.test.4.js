function _jsTestFn(){
	bs.js(function(){
		_jsFlg[3] = true;
		_jsTestFn();
	}, "./bs.js.test.5.js");
};
