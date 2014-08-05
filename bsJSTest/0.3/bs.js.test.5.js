function _jsTestFn(){
	_jsFlg[4] = true;
	bsTest( 'bs.js( callback, jsFile )',
		"bs.js( cbfn, './bs.js.test.1.js' )", true, _jsFlg[0],
		"bs.js( cbfn, './bs.js.test.2.js' )", true, _jsFlg[1],
		"bs.js( cbfn, './bs.js.test.3.js' )", true, _jsFlg[2],
		"bs.js( cbfn, './bs.js.test.4.js' )", true, _jsFlg[3],
		"bs.js( cbfn, './bs.js.test.5.js' )", true, _jsFlg[4]
	);
};
