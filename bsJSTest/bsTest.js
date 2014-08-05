var bsTest = (function(){
	var f2s, compare, js,
		id, isOK, title2id,
		printer, result, test, 
		isNode, con;
	f2s = (function(){
		var r0 = /</g, r1 = /\t/g;
		return function(f){
			var t0, t1, i, j;
			t0 = f.toString().split('\n'), t1 = t0[t0.length - 1], t1 = t1.substr( 0, t1.length - 1 );
			for( i = 0, j = t0.length ; i < j ; i++ ) if( t0[i].substr( 0, t1.length ) == t1 ) t0[i] = t0[i].substr(t1.length);
			return t0.join('\n').replace( r0, '&lt;' ).replace( r1, '  ' );
		};
	})(),
	compare = (function(){
		var t0 = [], deepCompare = function( a, b ){
			var t0, i, j;
			if( (t0 = typeof a) != typeof b ) return false;
			switch( t0 ){
			case'number':case'boolean':
			case'undefined':
			case'string': return a === b;
			case'object':
				if( a === null ) return a === b;
				else if( a.splice ){
					if( a.length != b.length ) return false;
					for( i = 0, j = a.length ; i < j ; i++ ) if( !deepCompare( a[i], b[i] ) ) return false;
					return true;
				}else{
					j = 0;
					for( i in b ) j++;
					for( i in a ){
						if( !deepCompare( a[i], b[i] ) ) return false;
						j--;
					}
					return !j;
				}
			}
		};
		return function( t, o ){
			switch( t.bsTestType ){
			case'reg':return t0[0] = 'regEx(' + t[0].toString() + ')', t0[1] = t[0].test(o) ? 1 : 0, t0;
			case'in':return t0[0] = 'of [' + t.join(',') +']', t0[1] = t.indexOf(o) > -1 ? 1 : 0, t0;
			case'not':return t0[0] = '!= ' + t[0], t0[1] = o !== t[0] ? 1 : 0, t0;
			case'item':return t0[0] = '== ' + t, t0[1] = deepCompare( t, o ), t0;
			case'range':return t0[0] = '( ' + t[0] + ' ~ ' + t[1] + ' ) ', t0[1] = ( t[0] < t[1] ? t[0] : t[1] ) <= o && o <= ( t[0] < t[1] ? t[1] : t[0] ), t0;
			default:return t0[0] = t, t0[1] = o, t0;
			}
		};
	})(),
	js = (function(doc){
		var h = doc.getElementsByTagName('head')[0];
		return function( id, title, fail ){
			var t0, i, c;
			title2id[title] = id, 
			c = test.__callback, t0 = doc.createElement('script'), t0.type = 'text/javascript', t0.charset = 'utf-8', h.appendChild(t0);
			t0.src = 'http://www.bsplugin.com/test/index.php?f=' + encodeURIComponent(location.href) + '&id=' + encodeURIComponent(title) + '&r=' + (fail ? 0 : 1) + '&rand='+Math.random();
		};
	})(document),
	title2id = {}, id = 0, isOK = 1,
	test = function(title){
		var r, expected, val, txt, ok, fail, t0, i, j;
		id++,
		r = isNode ? [['[test#'+id+'] '+title+'\n========================', 'white']] :
			'<div style="border:1px dashed #999;padding:10px;margin:10px">'+
				'<div id="bsTestOn'+id+'" style="display:none;cursor:pointer" onclick="bsTest.on(this)">'+
					'<div style="float:left">'+
						'<b>'+title+'</b><hr>'+
							'<ol>';
		//test
		ok = fail = 0, i = 1, j = arguments.length;
		while( i < j ){
			t0 = arguments[i++], expected = arguments[i++];
			//value
			txt = typeof t0 == 'function' ? ( val = t0(), f2s(t0) ) : ( val = arguments[i++], t0 );
			//compare
			if( val && val.bsTestType ) t0 = compare( val, expected );
			else if( expected && expected.bsTestType ) t0 = compare( expected, val );
			else t0 = compare( ' == ' + expected, val === expected );
			//result
			t0[1] ? ok++ : fail++;
			txt = ( isNode ? txt + ' :: ' :
					'<li><pre style="display:inline;">' + txt + '</pre> <b>' + val + '</b> :: <b>'
				) + 
				t0[0] +
				( isNode ? t0[1] ? ' OK' : ' FAIL' :
					'</b> <b style="color:#' + ( t0[1] ? '0a0">OK' : 'a00">NO') + '</b></li>'
				);
			isNode ? r[r.length] = con( txt, t0[1] ? 'green' : 'red' ) : r += txt;
		}
		//total result
		if( fail ) isOK = 0;
		//print
		if( isNode ){
			console.log( t0 = 'RESULT[#' + id + '] : ' + ( fail ? con("FAIL", 'red') : con( 'OK', 'green') ) + '[' + con( "OK: " + s, 'green' ) + ' ' + con( "FAIL: " + f, 'red' ) + ']' );
			for( i = 0, j = r.length ; i < j ; i++) console.log(r[i]);
			console.log(t0);
		}else{
			printer( r = r + '</ol></div>'+
				'<div id="bsTestResult'+id+'" style="padding:5px;float:right;border:1px dashed #999;text-align:center"><b style="font-size:30px;color:#' + ( fail ? 'a00">FAIL' : '0a0">OK' ) + '</b><br>ok:<b style="color:#0a0">' + ok + '</b> fail:<b style="color:#a00">' + fail + '</b></div><br clear="both"></div>'+
				'<div id="bsTestOff'+id+'" style="display:block;cursor:pointer" onclick="bsTest.off(this)"><b>'+title+'</b> : <b style="color:#' + ( fail ? 'a00">FAIL' : '0a0">OK' ) + '</b></div></div>'
			);
			if( ( t0 = window.top ) != window.self && t0.bsTest && t0.bsTest.suite.urls && fail ) t0.bsTest.suiteResult(location.pathname);
			if( result ) result( '<hr><div style="font-weight:bold;font-size:30px;padding:10px;color:#' + ( isOK ? '0a0">OK' : 'a00">FAIL'  ) + '</div>' );
			//js( id, title, fail );
		}
	},
	test.on = function(dom){dom.style.display = 'none', document.getElementById('bsTestOff'+dom.id.substr(8)).style.display = 'block';},
	test.off = function(dom){dom.style.display = 'none', document.getElementById('bsTestOn'+dom.id.substr(9)).style.display = 'block';},
	//callback
	( test.CALLBACK = function( f ){
		test.callback = function(data){
			var t0, t1, i, j, k;
			if( t0 = data.rs ){
				for( i = 0, j = t0.length ; i < j ; i++ ){
					//[id, agent, sum(ok), sum(fail)] -> [dom, id, agent, sum(ok), sum(fail)]
					t0[i].unshift( t1 = document.getElementById( 'bsTestStat' + ( t0[i][0] = title2id[t0[i][0]] ) ) );
					if( t1 ) t1.innerHTML = '';
					if( t0[i][4] !='0' && ( t1 = document.getElementById( 'bsTestResult' + t0[i][1] ) ) ) t1.style.background = '#fdd';
				}
				f(t0);
			}	
		};
	} )( function(data){
		var i, j;
		for( i = 0, j = data.length ; i < j ; i++ ){
			//[dom, id, agent, sum(ok), sum(fail)]
			if( data[i][0] ){
				data[i][0].innerHTML += 
				'<div style="float:left;font-size:10px;margin-bottom:10px;background:#' + (data[i][4]=='0'?'dfd':'fdd') + '">' + data[i][2].split(')').join(')<br>') + '</div>'+
				'<div style="float:left;margin-left:5px;margin-bottom:10px">ok:<b style="color:#0a0">' + data[i][3] + '</b> fail:<b style="color:#a00">' + data[i][4] + '</b></div>'+
				'<br style="clear:both">';
			}
		}
	} ),
	//assert option
	test.NOT = function(){return arguments.bsTestType = 'not', arguments;},
	test.ITEM = function(a){return a.bsTestType = 'item', a;},
	test.IN = function(){
		var t0 = Array.prototype.slice.call( arguments, 0 );
		return t0.bsTestType = 'in', t0;
	},
	test.RANGE = function( a, b ){
		var t0 = [a, b];
		return t0.bsTestType = 'range', t0;
	},
	test.REG = function( a ){return arguments.bsTestType = 'reg', arguments;},
	//tear
	test.tear = function( title, func ){
		id++, func();
		if( isNode ) console.log( '[tear#'+id + '] '+ title + '\n======================' + f2s(func) + '\n' );
		else printer(
			'<div style="border:1px solid #999;background:#eee;padding:10px;margin:10px">'+
				'<div id="bsTestOn'+id+'" style="display:none;cursor:pointer" onclick="bsTest.on(this)"><b>'+title+'</b><hr><pre>'+f2s(func)+'</pre></div>'+
				'<div id="bsTestOff'+id+'" style="display:block;cursor:pointer" onclick="bsTest.off(this)"><b>'+title+'</b></div>'+
			'</div>' );
	};
	if( typeof process !== 'undefined' && process.version ){
		isNode = 1,
		conStyle = {
			'bold':['\x1B[1m','\x1B[22m'],'italic':['\x1B[3m','\x1B[23m'],'underline':['\x1B[4m','\x1B[24m'],'inverse':['\x1B[7m','\x1B[27m'],'strikethrough':['\x1B[9m','\x1B[29m'],
			'white':['\x1B[37m','\x1B[39m'],'grey':['\x1B[90m','\x1B[39m'],'black':['\x1B[30m','\x1B[39m'],'blue':['\x1B[34m','\x1B[39m'],'yellow':['\x1B[33m','\x1B[39m'],
			'cyan':['\x1B[36m','\x1B[39m'],'green':['\x1B[32m','\x1B[39m'],'magenta':['\x1B[35m','\x1B[39m'],'red':['\x1B[31m','\x1B[39m'],
			'whiteBG':['\x1B[47m','\x1B[49m'],'greyBG':['\x1B[49;5;8m','\x1B[49m'],'blackBG':['\x1B[40m','\x1B[49m'],'blueBG':['\x1B[44m','\x1B[49m'],'yellowBG':['\x1B[43m','\x1B[49m'],
			'cyanBG':['\x1B[46m','\x1B[49m'],'greenBG':['\x1B[42m','\x1B[49m'],'magentaBG':['\x1B[45m','\x1B[49m'],'redBG':['\x1B[41m','\x1B[49m']
		},
		con = function( str, style ){return style = conStyle[style] || conStyle['white'], style[0] + str + style[1];},
		module.exports = test;
	}else{
		test.printer = function(f){printer = f;},
		test.result = function(f){result = f;},
		test.suite = function(){
			var i = arguments.length, url;
			test.suite.urls = arguments;
			while( i-- ) url = arguments[i], printer(
				'<div style="width:250px;float:left;border:1px dashed #999;background:#eee;padding:10px;margin:10px">'+
					'<div>'+
						'<a href="'+url+'" target="_blank">'+url+'</a> ' +
						'<span id="'+url+'"><b style="font-size:20px;color:#0a0">OK</b></span>'+
					'</div>'+
					'<iframe src="'+url+'" scrolling="no" style="margin-top:10px;border:0;width:100%;height:200px"></iframe>'+
				'</div>'
			);
			result( '<div style="font-weight:bold;font-size:30px;padding:10px;color:#0a0">OK</div><hr>' );
		},
		test.suiteResult = function(v){
			document.getElementById(v.split("/").pop()).innerHTML = '<b style="font-size:20px;color:#a00">FAIL</b>',
			result('<div style="font-weight:bold;font-size:30px;padding:10px;color:#a00">FAIL</div><hr>');
		};
	}
	return test;
})();