/* bsJS - OpenSource JavaScript library version 0.3.0 / 2013.12.25 by projectBS committee
 * Copyright 2013.10 projectBS committee.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * GitHub-http://goo.gl/FLI7te Facebook group-http://goo.gl/8s5qmQ
 */
( function( W, N ){
'use strict';
var VERSION = 0.3, REPOSITORY = 'http://www.bsplugin.com/plugin/',
	slice = Array.prototype.slice, none = function(){}, trim = /^\s*|\s*$/g,
	bs, doc, fn;
if( doc = W['document'] ){//browser
	W[N = N || 'bs'] = bs = function(f){
		var t0 = bs._bsQue;
		t0 ? ( t0[t0.length] = f ) : f();
	},
	bs.err = function( num, msg ){throw new Error( num, msg );},
	bs._bsQue = [];
}else if( process && process.version )(function(){//node.js
	var root;
	module.exports = bs = function(f){f();},
	bs.err = function( num, msg ){console.log( num, msg );throw new Error( num, msg );},
	root = require.main.filename.lastIndexOf( '\\' ) > -1 ? '\\' : '/',
	root = require.main.filename.substring( 0, require.main.filename.lastIndexOf( root ) ),
	bs.root = function(){return root;};
})();
else throw new Error( 0, 'not supported platform' );
(function(){//core
	var timeout = 5000, register = {}, depends = {};
	bs.fn = fn = function( name, f ){bs[name.replace( trim, '' ).toLowerCase()] = f;},
	fn( 'obj', function( name, o ){bs[name.replace( trim, '' ).toUpperCase()] = o;} ),
	fn( 'cls', function( name, f ){
		var cls, pr, t0, t1, k;
		pr = ( cls = function( sel, arg ){return this.__k = sel, this.NEW.apply( this, arg );} ).prototype,
		pr.NEW = none, pr.END = function(){delete cls[this.__k];},
		t0 = name.replace( trim, '' ).toLowerCase(),
		t0 = t0.charAt(0).toUpperCase() + t0.substr(1),
		t1 = bs[t0] = pr.instanceOf = function(sel){
			var t0;
			if( typeof sel == 'string' ){
				if( ( t0 = sel.charAt(0) ) == '@' ) return sel = arguments[0] = sel.substr(1), cls[sel] = new cls( sel, arguments );
				else if( t0 != '<' ) return cls[sel] || ( cls[sel] = new cls( sel, arguments ) );
			}
			return new cls( sel, arguments );
		},
		f( t0 = {}, bs );
		for( k in t0 ) if( t0.hasOwnProperty(k) ) k.charAt(0) == '@' ? t1[k.substr(1)] = t0[k] : pr[k] = t0[k];
	} ),
	fn( 'timeout', function(){return arguments.length ? ( timeout = parseInt( arguments[0] * 1000 ) ) : timeout;} ),
	fn( 'repository', function(){return arguments.length ? ( REPOSITORY = arguments[0] ) : REPOSITORY;} ),
	fn( 'plugin', function(end){
		var list, loader, isLoaded, i, j;
		if( typeof end == 'function' ){
			list = arguments, i = 1, j = list.length,
			( loader = function(){
				var k ,v;
				if( i == j ) return end();
				k = list[i++].toLowerCase(), v = list[i++];
				if( ( v != 'last' && typeof v != 'number' ) || v <= 0 ) return bs.err(4);
				if( depends[k] == v || depends[k] > v ) return loader();
				depends[k] = v;
				register[k] = function( type, name, obj, ver/*,dependency*/ ){
					var add, t0, t1, i, j, k, v;
					clearTimeout( isLoaded ), isLoaded = -1,
					add = function(){
						var t0, t1, i, k;
						if( ( ver != 'last' && typeof ver != 'number' ) || ver <= 0 ) return bs.err(4);
						switch( type ){
						case'class':case'method':case'static':
							bs[type == 'method' ? 'fn' : type == 'class' ? 'cls' : 'obj']( name, obj );
							break;
						case'style':
							if( bs.STYLE ){
								obj( t0 = {} );
								for( k in t0 ) if( t0.hasOwnProperty(k) ) bs.STYLE[k] = t0[k];
							}
							break;
						case'site':bs.site( name, obj ); break;
						case'db':bs.db( name, obj ); break;
						default:return bs.err(9);
						}
						loader();
					};
					if( ( j = arguments.length ) > 4 ){
						t0 = [add], i = 4;
						while( i < j ){
							t1 = depends[k = arguments[i++]], v = arguments[i++];
							if( ( v != 'last' && typeof v != 'number' ) || v <= 0 ) return bs.err(4);
							if( t1 == v || t1 > v ) continue; else t0[t0.length] = k, t0[t0.length] = v;
						}
						if( t0.length > 1 ) bs.plugin.apply( null, t0 );
					}else add();
				},
				isLoaded = setTimeout( function(){if( isLoaded > -1 ) bs.err(10);}, timeout ),
				bs.js( none, REPOSITORY + k + ( v == 'last' ? '' : v ) + '.js' );
			} )();
		}else if( doc && bs._pluginQue ) for( i = 0, j = arguments.length ; i < j ; i++ ) bs._pluginQue[bs._pluginQue.length] = arguments[i];
	} ),
	fn( 'plugin+', function( t, name ){
		if( !register[name] ) return bs.err(3);
		register[name].apply( null, arguments ), delete register[name];
	} );
	if( doc ) bs._pluginQue = [];
})();
(function(){//base
	fn( 'tmpl', (function(){
		var r, re, arg;
		r = /@[^@]+@/g,
		re = function(_0){
			var t0, t1, t2, i, j, k, l, cnt;
			_0 = _0.substring( 1, _0.length - 1 ), t0 = _0.split('.'), i = 1, j = arg.length, l = t0.length, cnt = 0;
			while( i < j ){
				t1 = arg[i++], k = 0;
				while( k < l && t1 !== undefined ) t1 = t1[t0[k++]];
				if( t1 !== undefined ) cnt++, t2 = t1;
			}
			if( cnt == 0 ) return _0;
			if( cnt > 1 ) return '@ERROR matchs '+cnt+'times@';
			if( t2 ){
				if( typeof t2 == 'function' ) return t2(_0);
				if( t2.splice ) return t2.join('');
			}
			return t2;
		}
		return function(v){
			if( v.substr(0,2) == '#T' ) v = bs.Dom(v).S('@text');
			else if( v.substr( v.length - 5 ) == '.html' ) v = bs.get( null, v );
			return arg = arguments, bs.trim( v.replace( r, re ) );
		};
	})() ),
	fn( 'trim', (function(trim){
		var t = String.prototype.trim ? 1 : 0,
		f = function(v){
			var t0, i;
			if( !v ) return v;
			t0 = typeof v;
			if( t0 == 'string' ) return t ? v.trim() : v.replace( trim, '' );
			if( t0 == 'object' ){
				if( v.splice ){t0 = [], i = v.length; while( i-- ) t0[i] = f(v[i]);}
				else{t0 = {}; for( i in v ) if( v.hasOwnProperty(i) ) t0[i] = f(v[i]);}
				return t0;
			}
			return v;
		};
		return f;
	})(trim) ),
	(function(){
		var rc = 0, rand = function(){return rc = ( rc + 1 ) % 1000, rand[rc] || ( rand[rc] = Math.random() );}, sin = {}, cos = {}, tan = {}, atan = {};
		fn( 'rand', function( a, b ){return parseInt( rand() * ( b - a + 1 ) ) + a;} ),
		fn( 'randf', function( a, b ){return rand() * ( b - a ) + a;} ),
		fn( 'sin', function(r){return sin[r] || sin[r] == 0 ? 0 : Math.sin(r);} ),
		fn( 'cos', function(r){return cos[r] || cos[r] == 0 ? 0 : Math.cos(r);} ),
		fn( 'tan', function(r){return tan[r] || tan[r] == 0 ? 0 : Math.tan(r);} ),
		fn( 'atan', function(r){return atan[r] || atan[r] == 0 ? 0 : Math.atan(r);} );
	})(),		
	fn( 'reverse', function(o){
		var t0, i;
		i = o.length;
		if( o.splice ){
			t0 = []; while( i-- ) t0[t0.length] = o[i];
		}else{
			t0 = {length:0}; while( i-- ) t0[t0.length++] = o[i];
		}
		return t0;
	} );
})();
if( !doc ) return require('./node/core.js')(bs);//branch node
//es5
if( !Date.now ) Date.now = function(){return +new Date;};
if( !Array.prototype.indexOf ) Array.prototype.indexOf = function( v, I ){
	var i, j, k, l;
	if( j = this.length ) for( I = I || 0, i = I, k = parseInt( ( j - i ) * .5 ) + i + 1, j-- ; i < k ; i++ )
		if( this[l = i] === v || this[l = j - i + I] === v ) return l; 
	return -1;
};
if( !W['JSON'] ) W['JSON'] = {
	parse:function(v){return ( 0, eval )( '(' + v + ')' );},
	stringify:(function(){
		var r = /["]/g, f = function(o){//"
			var t0, i, j;
			switch( t0 = typeof o ){
			case'string':return '"' + o.replace( r, '\\"' ) + '"';
			case'number':case'boolean':return o.toString();
			case'undefined':return t0;
			case'object':
				if( !o ) return 'null';
				t0 = '';
				if( o.splice ){
					for( i = 0, j = o.length ; i < j ; i++ ) t0 += ',' + f(o[i]);
					return '[' + t0.substr(1) + ']';
				}else{
					for( i in o ) if( o.hasOwnProperty( i ) && o[i] !== undefined && typeof o[i] != 'function' )
						t0 += ',"'+i+'":' + f(o[i]);
					return '{' + t0.substr(1) + '}';
				}
			}
		};
		return f;
	})()
};
if( !W['console'] ) (function(){
	var log = [], t0;
	W['console'] = {
		log:function(){log.push( Array.prototype.join( arguments, ', ' ) );},
		flush:function(){return t0 = log.slice(0), log.length = 0, t0;}
	};
})();
//network
(function(bs){
	var H = {'Content-Type':1,'Cache-Control':1}, h = [], hi = {}, p = [],
	rq = (function(){
		var xhr = W['XMLHttpRequest'] ? function(){return new XMLHttpRequest;} : (function(){
				var t0, i, j;
				t0 = 'MSXML2.XMLHTTP', t0 = ['Microsoft.XMLHTTP',t0,t0+'.3.0',t0+'.4.0',t0+'.5.0'], i = t0.length;
				while( i-- ){try{new ActiveXObject( j = t0[i] );}catch(e){continue;}break;}
				return function(){return new ActiveXObject(j);};
			})(),
			pool = {length:0};
		return function(x){
			if( x ){
				if( x.readyState != 4 ) x.abort();
				x.onreadystatechange = null, pool[pool.length++] = x;
			}else return pool.length ? pool[--pool.length] : xhr();
		};
	})(),
	http = function( type, end, url, arg ){
		var t0, t1, t2, i, j, k;
		t0 = rq();
		if( end ) t0.onreadystatechange = function(){
			var b, h;
			if( t0.readyState != 4 || t1 < 0 ) return;
			clearTimeout(t1), t1 = -1,
			h = t0.status == 200 || t0.status == 0 ? t0.responseText : null,
			rq(t0), end( h, h ? t0.getAllResponseHeaders() : t0.status );
		}, t1 = setTimeout( function(){
			if( t1 > -1 ) t1 = -1, rq(t0),	end( null, 'timeout' );
		}, bs.timeout() );
		t0.open( type, url, end ? true : false ),
		t2 = bs.param(arg) || '', i = 0, j = h.length;
		while( i < j ){
			if( H[k = h[i++]] ) hi[k] = 1;
			t0.setRequestHeader( k, h[i++] );
		}
		if( !hi['Content-Type'] ) hi['Content-Type'] = 0, t0.setRequestHeader( 'Content-Type', ( type == 'GET' ? 'text/plain' : 'application/x-www-form-urlencoded' ) + '; charset=UTF-8' );
		if( !hi['Cache-Control'] ) hi['Cache-Control'] = 0, t0.setRequestHeader( 'Cache-Control', 'no-cache' ),
		t0.send(t2);
		if( !end ) return t1 = t0.responseText, rq(t0), t1;
	},
	mk = function(m){return function( end, url ){return http( m, end, bs.url(url), arguments );};};
	fn( 'get', function( end, url ){return http( 'GET', end, bs.url( url, arguments ) );} ),
	fn( 'post', mk('POST') ), fn( 'put', mk('PUT') ), fn( 'delete', mk('DELETE') ),
	fn( 'param', function(arg){
		var i, j, k;
		if( !arg || ( j = arg.length ) < 4 ) return '';
		h.length = p.length = 0, i = 2;
		while( i < j )
			if ( arg[i].charAt(0) == '@' ) h[h.length] = arg[i++].substr(1), h[h.length] = arg[i++];
			else if( i < j - 1 ) p[p.length] = encodeURIComponent( arg[i++] ) + '=' + encodeURIComponent( arg[i++] );
			else k = encodeURIComponent( arg[i++] );
		return k || p.join('&');
	} ),
	fn( 'url', function( url, arg ){
		var t0 = url.split( '#' );
		return t0[0] + ( t0[0].indexOf('?') > -1 ? '&' : '?' ) + 'bsNC=' + bs.rand( 1000, 9999 ) + '&' + bs.param(arg) + ( t0[1] ? '#' + t0[1] : '' );
	} );
})(bs);
fn( 'js', (function(doc){
	var h = doc.getElementsByTagName('head')[0], e = W['addEventListener'], id = 0, c = bs.__callback = {},	js = function( data, load, end ){
		var t0, i;
		t0 = doc.createElement('script'), t0.type = 'text/javascript', t0.charset = 'utf-8', h.appendChild(t0);
		if( load ){
			if(e) t0.onload = function(){t0.onload = null, load();};
			else t0.onreadystatechange = function(){
				if( t0.readyState == 'loaded' || t0.readyState == 'complete' ) t0.onreadystatechange=null, load();
			};
			if( data.charAt( data.length - 1 ) == '=' ) data += 'bs.__callback.' + ( i = 'c' + (id++) ), c[i] = function(){delete c[i], end.apply( null, arguments );};
			t0.src = data;
		}else t0.text = data;
	};
	return function(end){
		var i, j, arg, load;
		arg = arguments, i = 1, j = arg.length;
		if( end ) ( load = function(){i < j ? js( arg[i++], load, end ) : end();} )();
		else while( i < j ) js( bs.get( null, arg[i++] ) );
	};
})(doc)),
fn( 'img', (function(){
	var c = window['HTMLCanvasElement'];
	return function(end){
		var progress, arg, t0, f, i, j;
		t0 = [], arg = arguments, i = 1, j = arg.length;
		if( end.progress ) progress = end.progress;
		f = function(){
			var img, id;
			if( i == j ) return end(t0);
			if( progress ) progress(t0, i - 2, j - 1);
			t0[t0.length] = img = new Image;
			if( c ) img.onload = f;
			else id = setInterval( function(){
				if( img.complete ) clearInterval(id), f();
			}, 10 );
			img.src = arg[i++];
		}, f();
	};
})() ),
fn( 'go', function(url){location.href = url;} ),
fn( 'open', function(url){W.open(url);} ),
fn( 'back', function(){history.back();} ),
fn( 'reload', function(){location.reload();} ),
fn( 'ck', function ck( key/*, val, expire, path*/ ){
	var t0, t1, t2, i, v;
	t0 = document.cookie.split(';'), i = t0.length;
	if( arguments.length == 1 ){
		while( i-- ) if( ( t1 = bs.trim(t0[i].split('=')), t1[0] ) == key ) return decodeURIComponent( t1[1] );
		return null;
	}else{
		v = arguments[1], t1 = key + '=' + encodeURIComponent( v ) + ';domain='+document.domain+';path='+ (arguments[3] || '/');
		if( v === null ) t0 = new Date, t0.setTime( t0.getTime() - 86400000 ), t1 += ';expires=' + t0.toUTCString();
		else if( arguments[2] ) t0 = new Date, t0.setTime( t0.getTime() + arguments[2] * 86400000 ), t1 += ';expires=' + t0.toUTCString();
		return document.cookie = t1, v;
	}
} );
function DETECT( W, doc ){
	var platform, app, agent, device,
		flash, browser, bVersion, os, osVersion, cssPrefix, stylePrefix, transform3D,
		b, bStyle, div, keyframe,
		v, a, c;
	agent = navigator.userAgent.toLowerCase(),
	platform = navigator.platform.toLowerCase(),
	app = navigator.appVersion.toLowerCase(),
	flash = 0, device = 'pc',
	(function(){
		var i;
		function ie(){
			if( agent.indexOf( 'msie' ) < 0 && agent.indexOf( 'trident' ) < 0 ) return;
			if( agent.indexOf( 'iemobile' ) > -1 ) os = 'winMobile';
			return browser = 'ie', bVersion = agent.indexOf( 'msie' ) < 0 ? 11 : parseFloat( /msie ([\d]+)/.exec( agent )[1] );
		}
		function chrome(){
			var i;
			if( agent.indexOf( i = 'chrome' ) < 0 && agent.indexOf( i = 'crios' ) < 0 ) return;
			return browser = 'chrome', bVersion = parseFloat( ( i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/ ).exec( agent )[1] );
		}
		function firefox(){
			if( agent.indexOf( 'firefox' ) < 0 ) return;
			return browser = 'firefox', bVersion = parseFloat( /firefox\/([\d]+)/.exec( agent )[1] );
		}
		function safari(){
			if( agent.indexOf( 'safari' ) < 0 ) return;
			return browser = 'safari', bVersion = parseFloat( /safari\/([\d]+)/.exec( agent )[1] );
		}
		function opera(){
			if( agent.indexOf( 'opera' ) < 0 ) return;
			return browser = 'opera', bVersion = parseFloat( /version\/([\d]+)/.exec( agent )[1] );
		}
		function naver(){if( agent.indexOf( 'naver' ) > -1 ) return browser = 'naver';}
		if( agent.indexOf( 'android' ) > -1 ){
			browser = os = 'android';
			if( agent.indexOf( 'mobile' ) == -1 ) browser += 'Tablet', device = 'tablet';
			else device = 'mobile';
			i = /android ([\d.]+)/.exec( agent );
			if( i ) i = i[1].split('.'), osVersion = parseFloat( i[0] + '.' + i[1] );
			else osVersion = 0;
			i = /safari\/([\d.]+)/.exec( agent );
			if( i ) bVersion = parseFloat( i[1] );
			naver() || chrome() || firefox() || opera();
		}else if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
			device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i;
			if( i = /os ([\d_]+)/.exec( agent ) ) i = i[1].split('_'), osVersion = parseFloat( i[0] + '.' + i[1] );
			else osVersion = 0;
			if( i = /mobile\/([\S]+)/.exec( agent ) ) bVersion = parseFloat( i[1] );
			naver() || chrome() || firefox() || opera();
		}else{
			(function(){
				var plug, t0, e;
				plug = navigator.plugins;
				if( browser == 'ie' ) try{t0 = new ActiveXObject( 'ShockwaveFlash.ShockwaveFlash' ).GetVariable( 'version' ).substr( 4 ).split( ',' ), flash = parseFloat( t0[0] + '.' + t0[1] );}catch( e ){}
				else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ) t0 = t0.description.split( ' ' )[2].split( '.' ), flash = parseFloat( t0[0] + '.' + t0[1] );
				else if( agent.indexOf( 'webtv' ) > -1 ) flash = agent.indexOf( 'webtv/2.6' ) > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
			})();
			if( platform.indexOf( 'win' ) > -1 ){
				os = 'win', i = 'windows nt ';
				if( agent.indexOf( i + '5.1' ) > -1 ) osVersion = 'xp';
				else if( agent.indexOf( i + '6.0' ) > -1 ) osVersion = 'vista';
				else if( agent.indexOf( i + '6.1' ) > -1 ) osVersion = '7';
				else if( agent.indexOf( i + '6.2' ) > -1 ) osVersion = '8';
				else if( agent.indexOf( i + '6.3' ) > -1 ) osVersion = '8.1';
				ie() || chrome() || firefox() || safari() || opera();
			}else if( platform.indexOf( 'mac' ) > -1 ){      
				os = 'mac';
				i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.');
				osVersion = parseFloat( i[0] + '.' + i[1] );
				chrome() || firefox() || safari() || opera();
			}else{
				os = app.indexOf( 'x11' ) > -1 ? 'unix' : app.indexOf( 'linux' ) > -1 ? 'linux' : 0;
				chrome() || firefox();
			}
		}
	})(),
	b = doc.body, bStyle = b.style, div = doc.createElement( 'div' ),
	div.innerHTML = '<div style="opacity:.55;position:fixed;top:100px;visibility:hidden;-webkit-overflow-scrolling:touch">a</div>',
	div = div.getElementsByTagName( 'div' )[0],
	c = doc.createElement( 'canvas' ), c = 'getContext' in c ? c : null,
	a = doc.createElement( 'audio' ), a = 'canPlayType' in a ? a : null,
	v = doc.createElement( 'video' ), v = 'canPlayType' in v ? v : null;
	switch( browser ){
	case'ie': cssPrefix = '-ms-', stylePrefix = 'ms'; transform3D = bVersion > 9 ? 1 : 0;
		if( bVersion == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), b.style.position = 'relative';
		break;
	case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz'; transform3D = 1; break;
	case'opera': cssPrefix = '-o-', stylePrefix = 'O'; transform3D = 1; break;
	default: cssPrefix = '-webkit-', stylePrefix = 'webkit'; transform3D = os == 'android' ? ( osVersion < 4 ? 0 : 1 ) : 1;
	}
	if( keyframe = W['CSSRule'] ){
		if( keyframe.WEBKIT_KEYFRAME_RULE ) keyframe = '-webkit-keyframes';
		else if( keyframe.MOZ_KEYFRAME_RULE ) keyframe = '-moz-keyframes';
		else if( keyframe.KEYFRAME_RULE ) keyframe = 'keyframes';
		else keyframe = null;
	}
	return {
		'device':device, 'browser':browser, 'browserVer':bVersion, 'os':os, 'osVer':osVersion, 'flash':flash, 'sony':agent.indexOf( 'sony' ) > -1,
		//dom
		root:b.scrollHeight ? b : doc.documentElement,
		scroll:doc.documentElement && typeof doc.documentElement.scrollLeft == 'number' ? 'scroll' : 'page',
		insertBefore:div.insertBefore, png:browser == 'ie' && bVersion > 7, 
		opacity:div.style.opacity == '0.55' ? 1 : 0, text:div.textContent ? 'textContent' : div.innerText ? 'innerText' : 'innerHTML',
		cstyle:doc.defaultView && doc.defaultView.getComputedStyle,
		//css3
		cssPrefix:cssPrefix, stylePrefix:stylePrefix, filterFix:browser == 'ie' && bVersion == 8 ? ';-ms-' : ';',
		transition:stylePrefix + 'Transition' in bStyle || 'transition' in bStyle, transform3D:transform3D, keyframe:keyframe,
		transform:stylePrefix + 'Transform' in bStyle || 'transform' in bStyle,
		//html5
		canvas:c, canvasText:c && c.getContext('2d').fillText,
		audio:a,
		audioMp3:a && a.canPlayType('audio/mpeg;').indexOf('no') < 0 ? 1 : 0,
		audioOgg:a && a.canPlayType('audio/ogg;').indexOf('no') < 0 ? 1 : 0,
		audioWav:a && a.canPlayType('audio/wav;').indexOf('no') < 0 ? 1 : 0,
		audioMp4:a && a.canPlayType('audio/mp4;').indexOf('no') < 0 ? 1 : 0,
		video:v,
		videoCaption:'track' in doc.createElement('track') ? 1 : 0,
		videoPoster:v && 'poster' in v ? 1 : 0,
		videoWebm:v && v.canPlayType( 'video/webm; codecs="vp8,mp4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
		videH264:v && v.canPlayType( 'video/mp4; codecs="avc1.42E01E,m4a.40.2"' ).indexOf( 'no' ) == -1 ? 1 : 0,
		videoTeora:v && v.canPlayType( 'video/ogg; codecs="theora,vorbis"' ).indexOf( 'no' ) == -1 ? 1 : 0,
		local:W.localStorage && 'setItem' in localStorage,
		geo:navigator.geolocation, worker:W.Worker, file:W.FileReader, message:W.postMessage,
		history:'pushState' in history, offline:W.applicationCache,
		db:W.openDatabase, socket:W.WebSocket
	};
}
function DOM(){
	var style;
	bs.STYLE = style = (function(){
		var style = function(s){this.s = s, this.u = {};}, fn = style.prototype, value = {},
			r = /-[a-z]/g, re = function(_0){return _0.charAt(1).toUpperCase();},
			b = doc.body.style, pf = bs.DETECT.stylePrefix, nopx = {'opacity':1,'zIndex':1},
			key = style.key = function(v){
				var k = v.replace( r, re );
				if( k in b ) style[v] = k;
				else{
					k = pf+k.charAt(0).toUpperCase()+k.substr(1);
					if( k in b ) style[v] = k;
					else return 0;
				}
				return k;
			};
		fn.S = function( arg, i ){
			var s, u, t0, j, k, v, v0;
			s = this.s, u = this.u, i = i || 0, j = arg.length;
			while( i < j ){
				k = style[t0 = arg[i++]], v = arg[i++];
				if( !k ){
					if( !( k = key(t0) ) ) continue;
				}else if( typeof k == 'function' ){
					v = k( this, v );
					continue;
				}
				if( v || v === 0 ){ 
					if( this[k] === undefined ){ //add
						if( ( t0 = typeof v ) == 'number' ) this[k] = v, u[k] = nopx[k] ? '' : 'px';
						else if( t0 == 'string' ){
							if( v0 = value[v.substr(0,4)] && typeof v0 == 'function' ) this[k] = v = v0(v), u[k]='';
							else if( ( v0 = v.indexOf( ':' ) ) == -1 ) this[k] = v, u[k] = '';
							else this[k] = parseFloat( v.substr( 0, v0 ) ), u[k] = v.substr( v0 + 1 ), v = this[k];
						}
					}else this[k] = ( typeof v == 'string' && (v0 = value[v.substr( 0, 4 )] ) && typeof v0 == 'function' ) ? v0(v) : v; //set
					s[k] = v + u[k];
				}else if( v === null ) delete this[k], delete u[k], s[k] = '';//del
				else return this[k]; //get
			}
			return v;
		},
		fn.g = function( t0 ){
			var k = style[t0];
			if( !k ){
				if( !( k = key(t0) ) ) return 0;
			}else if( typeof k == 'function' ) return k( this );
			return this[k];
		},
		fn.s = function( t0, v ){
			var k = style[t0];
			if( !k ){
				if( !( k = key(t0) ) ) return 0;
			}else if( typeof k == 'function' ) return k( this, v );
			return this[k] = v;
		},
		style['float'] = 'styleFloat' in b ? 'styleFloat' : 'cssFloat' in b ? 'cssFloat' : 'float';
		if( !( 'opacity' in b ) ){
			style.opacity = function( s, v ){
				if( v === undefined ) return s.opacity;
				else if( v === null ) return delete s.opacity, s.s.filter = '', v;
				else return s.s.filter = 'alpha(opacity=' + parseInt( v * 100 ) + ')', s.opacity = v;
			},
			value['rgba'] = function(v){
				var t0 = v.substring( 5, v.length - 1 ).split(',');
				t0[3] = parseFloat(t0[3]);
				return 'rgb('+parseInt((255+t0[0]*t0[3])*.5)+','+parseInt((255+t0[1]*t0[3])*.5)+','+parseInt((255+t0[2]*t0[3])*.5)+')';
			};
		}
		(function(){
			var gra, rgb, mk0, mk1, b;
			b = '#000000', gra = bs.DETECT.browser == 'ie' && bs.DETECT.browserVer < 10 ? function( s, d, b, e ){
				s.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + b + "',endColorstr='" + e + "',GradientType=" + ( d == 'h' ? 1 : 0 ) + ")";
			} : function( s, d, b, e ){s.background = 'linear-gradient(to ' + ( d == 'h' ? 'right,' : 'bottom,' ) + b + ',' + e + ')';},
			( rgb = function(){this[0] = this[1] = this[2] = 0;} ).prototype.toString = function(){
				var t0 = '#', t1;
				return t1 = parseInt(this[0]).toString(16), t0 += t1.length == 1 ? '0' + t1 : t1, 
					t1 = parseInt(this[1]).toString(16), t0 += t1.length == 1 ? '0' + t1 : t1, 
					t1 = parseInt(this[2]).toString(16), t0 += t1 == '0' ? '00' : t1, t0;
			},
			mk0 = function(i){return function( self, v ){
				return v === undefined ? self.grB[i] : ( ( self.grB || ( self.grB = new rgb ) )[i] = v, gra( self.s, self.grD, self.grB, self.grE||b ), v );};
			},
			mk1 = function(i){return function( self, v ){
				return v === undefined ? self.grE[i] : ( ( self.grE || ( self.grE = new rgb ) )[i] = v, gra( self.s, self.grD, self.grB||b, self.grE ), v );};
			},
			style.gradientBeginR = mk0(0), style.gradientBeginG = mk0(1), style.gradientBeginB = mk0(2),
			style.gradientEndR = mk1(0), style.gradientEndG = mk1(1), style.gradientEndB = mk1(2),
			style.gradientBegin = function( self, v ){return v === undefined ? self.grB:( gra( self.s, self.grD, self.grB = v, self.grE || b ), v);},
			style.gradientEnd = function( self, v ){return v === undefined ? self.grE:( gra( self.s, self.grD, self.grB || b, self.grE = v ), v);},
			style.gradientDirection = function( self, v ){return v === undefined ? self.grD:(gra( self.s, self.grD = v, self.grB || b, self.grE || b ), v);};
		})();
		return style;
	})(),
	bs.cls( 'Css', function( fn, bs ){
		var sheet, rule, ruleSet, idx, add, del, ruleKey, keyframe, r, parser;
		doc.getElementsByTagName('head')[0].appendChild( sheet = doc.createElement('style') ),
		sheet = sheet.styleSheet || sheet.sheet, ruleSet = sheet.cssRules || sheet.rules,
		ruleKey = {'keyframes':bs.DETECT.keyframe}, keyframe = bs.DETECT.keyframe,
		idx = function(rule){
			var i, j, k, l;
			for( i = 0, j = ruleSet.length, k = parseInt( j * .5 ) + 1, j-- ; i < k ; i++ )
				if( ruleSet[l = i] === rule || ruleSet[l = j - i] === rule ) return l;
		};
		if( sheet.insertRule ){
			add = function( k, v ){return sheet.insertRule( k + ( v ? '{' + v + '}' : '{}' ), ruleSet.length ), ruleSet[ruleSet.length - 1];},
			del = function(v){sheet.deleteRule(idx(v));};
		}else{
			add = function( k, v ){sheet.addRule( k, v||' ' );return ruleSet[ruleSet.length - 1];},
			del = function(v){sheet.removeRule(idx(v));};
		}
		rule = function(rule){this.r = rule, this.s = new style(rule);},
		fn.NEW = function(sel){
			var t0, v;
			if( sel.indexOf('@') > -1 ){
				t0 = sel.split('@');
				if( t0[0] == 'font-face' ){
					v = t0[1].split(' '), v = 'font-family:'+v[0]+";src:url('"+v[1]+".eot');src:"+
						"url('"+v[1]+".eot?#iefix') format('embedded-opentype'),url('"+v[1]+".woff') format('woff'),"+
						"url('"+v[1]+".ttf') format('truetype'),url('"+v[1]+".svg') format('svg');",
					t0 = '@font-face', this.type = 5;
					try{this.r = add( t0, v );
					}catch(e){
						doc.getElementsByTagName('head')[0].appendChild( t0 = doc.createElement('style') ),
						( t0.styleSheet || t0.sheet ).cssText = t0 + '{' + v + '}';
					}
					return;
				}else if( t0[0] == 'keyframes' ){
					if( !keyframe )return this.type = -1;
					else t0 = '@' + ( ruleKey[t0[0]] || t0[0] )+ ' ' + t0[1], this.type = 7;
				}
			}else t0 = sel, this.type = 1;
			this.r = add( t0, v );
			if( this.type == 1 ) this.s = new style( this.r.style );
		},
		fn.S = function(){
			var type, t0, r;
			t0 = arguments[0], type = this.type;
			if( t0 === null ) return del( type < 0 ? 0 : this.END(), this.r );
			else if( type == 1 ) return this.s.S( arguments );
			else if( type == 7 ){
				if( !this[t0] ){
					if( this.r.appendRule ) this.r.appendRule( t0+'{}' );
					else this.r.insertRule( t0+'{}' );
					r = this.r.cssRules[this.r.cssRules.length - 1], this[t0] = {r:r, s:new style( r.style )};
				}
				arguments[1] == null ? this[t0].s.init() : this[t0].s.S( arguments, 1 );
			}
			return this;
		},
		r = /^[0-9.-]+$/,
		parser = function(data){
			var t0, t1, t2, c, i, j, k, v;
			t2 = [], t0 = data.split('}');
			for( i = 0, j = t0.length ; i < j ; i++ ){
				if( t0[i] ){
					t0[i] = bs.trim(t0[i].split('{'));
					if( t0[i][0].indexOf('@') == -1 ){
						c = bs.Css(t0[i][0]), t1 = bs.trim(t0[i][1].split(';')), k = t1.length, t2.length = 0;
						while( k-- ) v = bs.trim(t1[k].split(':')), t2[t2.length] = v[0], t2[t2.length] = r.test(v[1]) ? parseFloat(v[1]) : v[1];
						c.S.apply( c, t2 );
					}else if( t0[i][0].substr( 0, 9 ) == 'font-face' ) console.log(t0[i].join(' ')),bs.Css(t0[i].join(' '));
				}
			}
		}, 
		bs.fn( 'css', function(v){v.substr( v.length - 4 ) == '.css' ? bs.get( parser, v ) : parser(v);} );
	} ),
	bs.cls( 'Dom', function( fn, bs ){
		var query, html, dom, t = trim, x, y, ds, ds0, nodes, drill, childNodes, ev;
		query = (function(doc){
			var c;
			if( doc.querySelectorAll ) return function(sel){return doc.querySelectorAll(sel);};
			else return c = {}, function(sel){
				var t0, i;
				if( ( t0 = sel.charAt(0) ) == '#' ){
					if( c[0] = doc.getElementById(sel.substr(1)) ) return c.length = 1, c;
					return null;
				}
				if( t0 == '.' ){
					sel = sel.substr(1), t0 = doc.getElementsByTagName('*'), c.length = 0, i = t0.length;
					while( i-- ) if( t0[i].className.indexOf(sel) > -1 ) c[c.length++] = t0[i];
					return c.length ? c : null;
				}
				return doc.getElementsByTagName(sel);
			};
		})(doc),
		html = (function(doc){
			var t0, i, div, tbody, tags;
			div = doc.createElement('div'),
			tbody = doc.createElement('tbody'),
			tags = {
				tr:[1, '<table><tbody>', '</tbody></table>'],
				col:[1, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
				th:[2, '<table><tbody><tr>', '</tr></tbody></table>'],
				option:[0, '<select>', '</select>']
			},
			tags.td = tags.th, tags.optgroup = tags.option,
			t0 = 'thead,tfoot,tbody,caption,colgroup'.split(','), i = t0.length;
			while( i-- ) tags[t0[i]] = [0,'<table>','</table>'];
			return function( str, target, mode ){
				var t0, t1, t2, t3, i, j, n0, n1, n2, parent, tbodyStr;
				str = ''+str;
				tbodyStr = str.toLowerCase().indexOf('tbody') > -1 ? true : false;
				t0 = str.replace( trim, '' ), n0 = t0.indexOf(' '), n1 = t0.indexOf('>'), n2 = t0.indexOf('/'),
				t1 = ( n0 != -1 && n0 < n1 ) ? t0.substring( 1, n0 ) : ( n2 != -1 && n2 < n1 ) ? t0.substring( 1, n2 ) : t0.substring( 1, n1 ),
				t1 = t1.toLowerCase();
				if( mode == 'html' && target.nodeName.toLowerCase() == 'table' && t1 == 'tr' ) tbodyStr = true, t1 = 'tbody';
				if( mode == '>' || 'html+' && t1 == 'tr' && target ) target = target.getElementsByTagName('tbody')[0] || ( target.appendChild(tbody), target.getElementsByTagName('tbody')[0] );
				if( tags[t1] ){
					if( div.innerHTML ) fn._.call(div.childNodes);
					div.innerHTML = tags[t1][1] + str + tags[t1][2], t2 = div.childNodes[0];
					if( tags[t1][0] ) for( i = 0 ; i < tags[t1][0] ; i++ ) t2 = t2.childNodes[0];
					parent = t2;
				}else div.innerHTML = str, parent = div;
				i = parent.childNodes.length;
				if( !target ) return parent.childNodes;
				else if( mode == 'html' ){
					if( target.innerHTML ) fn._.call(target.childNodes);
					while( i-- ) target.appendChild(parent.childNodes[0]);
				}else if( mode == 'html+' ) while( i-- ) target.appendChild(parent.childNodes[0]);
				else if( mode == '+html' ) {
					i = target.childNodes.length, t0 = {length:i};
					while(i--) t0[i] = target.childNodes[i];
					for( i = 0, j = parent.childNodes.length ; i < j ; i++) target.appendChild(parent.childNodes[0]);
					for( i = 0, j = t0.length ; i < j ; i++) target.appendChild(t0[i]);
				}
				else while( i-- ) target.appendChild(parent.childNodes[0]);
				j = target.childNodes.length;
				while( j-- ) if( target.childNodes[j].nodeType == 1 && target.childNodes[j].nodeName == 'TBODY' && !target.childNodes[j].childNodes.length && !tbodyStr ) target.removeChild(target.childNodes[j]);
				return target.innerHTML || target;
			};
		})(doc),
		dom = (function( query, html ){
			var nodes = {}, dom = function( sel, isSub ){
				var r, t0, i, j, k;
				t0 = typeof sel;
				if( t0 == 'function' ) return sel();
				if( t0 == 'string' ) return sel.charAt(0) == '<' ? html(sel) : query(sel);
				if( sel['instanceOf'] == bs.Dom ) return sel;
				t0 = sel['nodeType'];
				if( t0 == 1 ) return isSub ? sel : ( nodes[0] = sel, nodes.length = 1, nodes );
				if( t0 !== undefined ) return 0;
				if( j = sel.length ){
					r = isSub ? {} : nodes, r.length = 0;
					for( i = 0 ; i < j ; i++ ){
						t0 = dom( sel[i], 1 );
						if( t0.nodeType == 1 ) r[r.length++] = t0;
						else if( k = t0.length ) while( k-- ) r[r.length++] = t0[k];
					}
					return r;
				}
			};
			return dom;
		})( query, html ),
		fn.NEW = function(sel){
			var t0, i, j;
			t0 = dom(sel);
			if( t0['instanceOf'] == bs.Dom ) return t0;
			for( i = 0, this.length = j = t0.length ; i < j ; i++ ) this[i] = t0[i];
			t0 = dom(sel), this.length = i = j = t0.length;
			while(i--) this[j - i - 1] = t0[i];
		},
		fn._ = function(){
			var t0, i, j, k;
			i = this.length;
			while( i-- ){
				t0 = this[i],
				t0.parentNode.removeChild(t0);
				if( t0.nodeType == 3 ) continue;
				if( t0.bsE ) t0.bsE = t0.bsE._();
				if( t0.bsS ) t0.bsS = null;
				j = t0.attributes.length;
				while( j-- )
					switch( typeof t0.getAttribute( k = t0.attributes[j].nodeName ) ){
					case'object':case'function': t0.removeAttribute(k);
					}
				if( this[i] ) this[i] = null;
			}
			if( this.END ) this.END();
		},
		fn.S = function(){
			var d, target, t0, l, s, i, j, k, v, k0, v0;
			j = arguments.length, typeof arguments[0] == 'number' ? ( s = l = 1, target = this[arguments[0]] ) : ( l = this.length, s = 0 );
			while( l-- ){
				d = target || this[l], i = s, ds.length = 0;
				while( i < j ){
					k = arguments[i++];
					if( k === null ) return this._();
					if( ( v = arguments[i++] ) === undefined ){
						return ev[k] ? ev( d, k ) :
							( t0 = ds[k.charAt(0)] ) ? t0( d, k.substr(1) ) :
							k == 'this' ? ( ds.length ? ( d.bsS || ( d.bsS = new style(d.style) ) ).S(ds) : undefined, this ) :
							fn[k] ? fn[k](d) :
							d.bsS ? d.bsS.g(k) : d.style[style[k]];
					}else{
						if( ev[k] ) v = ev( d, k, v );
						else{
							if( ( v0 = typeof v ) == 'function' ) v = v( ( t0 = ds[k.charAt(0)] ) ? t0( d, k.substr(1) ) : fn[k] ? fn[k](d) : d.bsS ? d.bsS.g(k) : d.style[style[k]] );
							else if( v0 == 'string' && v.charAt(0) == '{' && v.charAt(v.length - 1) == '}' ){
								k0 = v.charAt(1), v0 = ( t0 = ds[k.charAt(0)] ) ? t0( d, k.substr(1) ) : fn[k] ? fn[k](d) : d.bsS ? d.bsS.g(k) : d.style[style[k]];
								v = k0 == '=' ? v0 : (
									v0 = parseFloat(v0), v = parseFloat(v.substring( 2, v.length - 1 )),
									k0 == '+' ? v0 + v : k0 == '-' ? v0 - v : k0 == '*' ? v0 * v : k0 == '/' ? v0 / v : 0
								);
							}
							v =  ( t0 = ds[k.charAt(0)] ) ? ( v = t0( d, k.substr(1), v ) ) :
								fn[k] ? fn[k]( d, v ) : ( ds[ds.length++] = k, ds[ds.length++] = v );
						}
					}
				}
				if( ds.length ) ( d.bsS || ( d.bsS = new style(d.style) ) ).S(ds);
			}
			return v;
		},
		fn.style = function(d){return d.bsS;},
		fn.isCapture = function(d){return arguments.length == 1 ? d.isCapture : ( d.isCapture = arguments[1] );},
		fn.x = x = function(d){var i = 0; do i += d.offsetLeft; while( d = d.offsetParent ) return i;},
		fn.y = y = function(d){var i = 0; do i += d.offsetTop; while( d = d.offsetParent ) return i;},
		fn.lx = function(d){return x(d) - x(d.parentNode);}, fn.ly = function(d){return y(d) - y(d.parentNode);},
		fn.w = function(d){return d.offsetWidth;}, fn.h = function(d){return d.offsetHeight;},
		fn.s = function(d){d.submit();}, fn.f = function(d){d.focus();}, fn.b = function(d){d.blur();},
		fn.bound = function( d, v ){
			
		},
		fn['<'] =function( d, v ){
			var t0;
			if( v ){
				if( d.parentNode ) d.parentNode.removeChild(d);
				return t0 = dom(v), t0[0].appendChild(d), t0;
			}else return d.parentNode;
		},		
		fn.html = function( d, v ){return v === undefined ? d.innerHTML : html( v, d, 'html' );},
		fn['html+'] = function( d, v ){return html( v, d, 'html+' );},
		fn['+html'] = function( d, v ){return html( v, d, '+html' );},
		(function(){
			var t = bs.DETECT.text;
			fn.text = function( d, v ){return v === undefined ? d[t] : ( d[t] = v );},
			fn['text+'] = function( d, v ){return d[t] += v;},
			fn['+text'] = function( d, v ){return d[t] = v + d[t];};
		})(),			
		fn['class'] = function( d, v ){return v === undefined ? d.className : ( d.className = v );},
		fn['class+'] = function( d, v ){
			var t0;
			return !( t0 = d.className.replace( t, '' ) ) ? ( d.className = v ) :
				t0.split(' ').indexOf(v) == -1 ? ( d.className = v + ' ' + t0 ) : t0;
		},
		fn['class-'] = function( d, v ){
			var t0, i;
			if( !( t0 = bs.trim(d.className) ) ) return t0;
			t0 = t0.split(' '); 
			if( ( i = t0.indexOf(v) ) > -1 ) t0.splice( i, 1 );
			return d.className = t0.join(' ');
		},
		(function(doc){
			var pos = {},
			g = function(d){
				var t0, t1, i;
				if( 'selectionStart' in d && doc.activeElement == d ) pos.start = d.selectionStart, pos.end = d.selectionEnd;
				else if( d.createTextRange ){
					t0 = doc.selection.createRange();
					if( t0.parentElement() === d ){
						for( ( t1 = d.createTextRange() ).moveToBookmark( t0.getBookmark() ), i = 0 ; t1.compareEndPoints( 'EndToStart', t1 ) > 0 ; t1.moveEnd( 'character', -1 ) ) i++;
						for( t1.setEndPoint( 'StartToStart', d.createTextRange() ), pos.start = 0, pos.end = i ; t1.compareEndPoints( 'EndToStart', t1) > 0 ; t1.moveEnd( 'character', -1 ) ) pos.start++, pos.end++;
					}
				}
			},
			s = function( d, v ){
				var t0;
				if( v.splice ) pos.start = v[0], pos.end = v[1]; else pos.start = pos.end = v;
				if( 'selectionStart' in d ) setTimeout( function(){d.selectionStart = pos.start, d.selectionEnd = pos.end;}, 1);
				else if( d.createTextRange ) ( t0 = d.createTextRange() ).moveStart( 'character', pos.start ), t0.collapse(),
					t0.moveEnd( 'character', pos.end - pos.start ), t0.select();
			}
			fn.cursorPos = function( d, v ){return ( v === undefined ? g(d) : s( d, v ) ), pos;};
		})(doc),
		nodes = [], ds0 = {},
		childNodes = function(n){
			var i, j;
			for( nodes.length = i = 0, j = n.length ; i < j ; i++ )
				if( n[i].nodeType == 1 ) nodes[nodes.length] = n[i];
			return nodes;
		},
		drill = function( d, k ){
			var i, j;
			if( k.indexOf('>') > -1 ){
				k = k.split('>'), i = 0, j = k.length;
				do d = childNodes(d.childNodes)[k[i++]]; while( i < j )
			}else d = childNodes(d.childNodes)[k];
			return d;
		},
		ds = {
			'@':function( d, k, v ){
				if( v === undefined ) return d[k] || d.getAttribute(k);
				else if( v === null ){
					d.removeAttribute(k);
					try{delete d[k];}catch(e){};
				}else d[k] = v, d.setAttribute( k, v );
				return v;
			},
			'_':( function( view, style ){
				return bs.DETECT.cstyle ? function( d, k ){
					var t0 = view.getComputedStyle(d,'').getPropertyValue(k);
					return t0.substr( t0.length - 2 ) == 'px' ? parseFloat( t0.substring( 0, t0.length - 2 ) ) : t0;
				} : function( d, k ){
					var t0 = d.currentStyle[style.key(k)];
					return t0.substr( t0.length - 2 ) == 'px' ? parseFloat( t0.substring( 0, t0.length - 2 ) ) : t0;
				};
			} )( doc.defaultView, style ),
			'>':function( d, k, v ){
				var t0, t1, i, j, m, n;
				if( v ){
					if( k ){
						if( typeof v == 'string' ){
							t0 = drill( d, k );
							//console.log( d.innerHTML, t0.innerHTML );
							if( ev[v] ) return ev( t0, v );
							if( t1 = ds[v.charAt(0)] ) return t1( t0, v.substr(1) );
							if( t1 = fn[v] ) return t1(t0);
							if( style[v] || style.key(v) ) return t0.bsS ? t0.bsS.g(v) : t0.style[style[v]];
						}
						t0 = dom(v), t1 = d.childNodes, k = parseInt( k, 10 );
						if( ds0.length = i = j = t1.length ){
							while( i-- ) ds0[i] = t1[i];
							if( j - 1 < k ) for( m = 0, n = t0.length ; m < n ; m++ ) d.appendChild(t0[m]);
							else for( i = 0, j = ds0.length ; i < j ; i++ ){
								if( i < k ) d.appendChild(ds0[i]);
								else if( i == k ) for( m = 0, n = t0.length ; m < n ; m++ ) d.appendChild(t0[m]);
								else d.appendChild(ds0[i+1]);
							}
						}else for( i = 0, j = t0.length ; i < j ; i++ ) d.appendChild(t0[i]);
					}else if( d.nodeName.toLowerCase() == 'table' ) html( v, d, '>' );
					else for( t0 = dom(v), i = 0, j = t0.length ; i < j ; i++ ) d.appendChild(t0[i]);
				}else if( v === null ){
					if( k ) fn._.call( childNodes(d.childNodes), nodes[0] = nodes[k], nodes.length = 1, nodes );
					else if( d.childNodes && childNodes(d.childNodes).length ) fn._.call(nodes);
				}else return childNodes(d.childNodes), k ? nodes[k] : nodes;
			}
		},
		ev = (function(){
			var EV, ev, isChild, i, k;
			EV = function( d, k, v ){
				var t0;
				if( k === undefined ) return d.bsE || ( d.bsE = new ev(d) );
				if( v ) return ( d.bsE || ( d.bsE = new ev(d) ) ).S( k, v );
				if( v === undefined ) return ( t0 = d.bsE ) ? t0[k] : d[k];
				if( v === null ) return ( t0 = d.bsE ) ? t0.S( k, null ) : ( d[k] = null );
			}
			for( k in doc ) k.substr( 0, 2 ) == 'on' ? ( i = 1, EV[k.substr(2).toLowerCase()] = 1 ) : 0;
			for( k in doc.createElement('input') ) k.substr( 0, 2 ) == 'on' ? ( i = 1, EV[k.substr(2).toLowerCase()] = 1 ) : 0;
			if( !i ){
				k = Object.getOwnPropertyNames(doc)
					.concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(doc))))
					.concat(Object.getOwnPropertyNames(Object.getPrototypeOf(W))), i = k.length;
				while( i-- ) k[i].substr(0,2) == 'on' ? ( EV[k[i].substr(2).toLowerCase()] = 1 ) : 0;
			}
			if( bs.DETECT.device =='tablet' || bs.DETECT.device=='mobile' ) EV.down = 'touchstart', EV.up = 'touchend', EV.move = 'touchmove';
			else{
				isChild = function( p, c ){
					if( c ) do if( c == p ) return 1; while( c = c.parentNode )
					return 0;
				},
				EV.down = 'mousedown', EV.up = 'mouseup', EV.move = 'mousemove',
				EV.rollover = function(e){if( !isChild( this, e.event.fromElement || e.event.relatedTarget ) ) e.type = 'rollover', e.RV.call( this, e );},
				EV.rollout = function(e){if( !isChild( this, e.event.toElement || e.event.explicitOriginalTarget ) ) e.type = 'rollout', e.RU.call( this, e );};
				if( W['TransitionEvent'] && !EV.transitionend ) EV.transitionend = 1;
			}
			ev = ( function( EV, x, y ){
				var ev, fn, page, evType, prevent, keycode, add, del, eventName, isChild, keyName, layerX, layerY;
				( bs.DETECT.browser == 'ie' && bs.DETECT.browserVer < 9 ) ? ( layerX = 'offsetX', layerY = 'offsetY' ) : ( page = 1, layerX = 'layerX', layerY = 'layerY' );
				if( W['addEventListener'] ) add = function( ev, k ){ev.target.addEventListener( k, ev.listener, ev.target.isCapture ? true : false );},
					del = function( ev, k ){ev.target.removeEventListener( k, ev.listener, ev.target.isCapture ? true : false );};
				else if( W['attachEvent'] ) add = function( ev, k ){ev.target.attachEvent( 'on' + k, ev.listener );},
					del = function( ev, k ){ev.target.detachEvent( 'on' + k, ev.listener );};
				else add = function( ev, k ){ev.target['on' + k] = ev.listener;},
					del = function( ev, k ){ev.target['on' + k] = null;};
				bs.obj( 'KEYCODE', keycode = (function(){
					var t0, t1, i, j, k, v;
					t0 = 'a,65,b,66,c,67,d,68,e,69,f,70,g,71,h,72,i,73,j,74,k,75,l,76,m,77,n,78,o,79,p,80,q,81,r,82,s,83,t,84,u,85,v,86,w,87,x,88,y,88,z,90,back,8,tab,9,enter,13,shift,16,control,17,alt,18,pause,19,caps,20,esc,27,space,32,pageup,33,pagedown,34,end,35,home,36,left,37,up,38,right,39,down,40,insert,45,delete,46,numlock,144,scrolllock,145,0,48,1,49,2,50,3,51,4,52,5,53,6,54,7,55,8,56,9,57'.split(','),
					t1 = {}, keyName = {},
					i = 0, j = t0.length;
					while( i < j ) k = t0[i++], v = parseInt(t0[i++]), t1[k] = v, t1[v] = k, keyName[v] = k;
					return t1;
				})() ),
				eventName = {webkitTransitionEnd:'transitionend'};
				fn = ( ev = function(d){
					var self, docel=document.documentElement;
					self = this, self.target = d, this.e = {}, self.listener = function(e){
						var type, start, dx, dy, t0, t1, t2, id, i, j, X, Y;
						self.event = e || ( e = event ), self.type = eventName[e.type] || e.type, self.keyName = keyName[self.keyCode = e.keyCode];
						if( d.value ) self.value = bs.trim(d.value);
						if( type = evType[self.type] ){
							if( type < 3 ){
								t0 = e.changedTouches, self.length = i = t0.length;
								while( i-- ) self[i] = t1 = t0[i], self['id'+i] = t1.identifier,
									self['cx'+i] = t1.clientX, self['cy'+i] = t1.clientY,
									self['x'+i] = X = t1.pageX, self['y'+i] = Y = t1.pageY,
									self['lx'+i] = t1[layerX], self['ly'+i] = t1[layerY],
									type == 2 ?
										( self['$x'+i] = self['_x'+i] = X, self['$y'+i] = self['_y'+i] = Y ) :
										( self['dx'+i] = X - self['_x'+i], self['dy'+i] = Y - self['_y'+i] );
									if( type == 1 ) self['mx'+i] = X - self['$x'+i], self['my'+i] = Y - self['$y'+i], self['$x'+i] = X, self['$y'+i] = Y;
								self.id = self.id0, self.mx = self.mx0, self.my = self.my0, self.x = self.x0, self.y = self.y0, self.lx = self.lx0, self.ly = self.ly0, self.dx = self.dx0, self.dy = self.dy0, self.cx = self.cx0, self.cy = self.cy0;
							}else{
								self.length = 0, self.cx = e.clientX, self.cy = e.clientY,
								self.x = X = page ? e.pageX : self.cx + docel.scrollLeft, self.y = Y = page ? e.pageY : self.cy + docel.scrollTop,
								self.lx = e[layerX], self.ly = e[layerY],
								type == 4 ? ( self.$x = self._x = X, self.$y = self._y = Y ) : ( self.dx = X - self._x, self.dy = Y - self._y );
								if( type == 3 ) self.mx = X - self.$x, self.my = Y - self.$y, self.$x = X, self.$y = Y;
							}
						}
						t0 = self.e[self.type], i = 0, j = t0.length;
						while( i < j ){
							this.stop = 0;
							if( t1 = t0[i++] ){
								if( !t1.disable ) t1.f.apply( t1.c, t1.a );
								if( this.stop ) break;
							}else return;
						}
					};
				} ).prototype,
				ev.type = evType = {'touchstart':2,'touchend':1,'touchmove':1,'mousedown':4,'mouseup':3,'mousemove':3,'click':3,'mouseover':3,'mouseout':3},
				fn.stop = function(){this.stop = 1;},
				fn.prevent = bs.DETECT.event ? function(){this.event.preventDefault(), this.event.stopPropagation();} :
					function(e){this.event.returnValue = false, this.event.cancelBubble = true;},
				fn.key = function(k){return this.keyCode == keycode[k];},
				fn.S = function( k, v ){
					var t0, t1, t2;
					t0 = k, t1 = typeof EV[k] == 'string' ? EV[k] : k;
					if( !t1 ) return;
					if( v === undefined ) return this.e[t1];
					if( v === null ) del( this, t1 ), this.e[t1].length = 0, delete this.RV, delete this.RU;
					else if( t1 == 'rollover' ) this.RV = v, this.S( 'mouseover', EV.rollover );
					else if( t1 == 'rollout' ) this.RU = v, this.S( 'mouseout', EV.rollout );
					else t2 = this.e[t1] || ( this.e[t1] = [] ),
						t2[t2.length] = typeof v == 'function' ? {c:this.target, f:v, a:[this]} :
							v.splice ? {c:v[0]||this.target, f:typeof v[1] == 'function' ? v[1] : (v[0]||this.target)[v[1]], a:( t0 = v.slice(2), t0[t0.length] = this, t0 )} :
							v[t0] ? {f:v[t0], c:v, a:[this]} : bs.err(11),
						add( this, t1 );
				},
				fn._ = function(){
					var k;
					for( k in this.e ) if( this.hasOwnProperty[k] ) del( this, k ), this.e[k].length = 0;
					return null;
				},
				fn.disable = function( k, v ){
					var t0 = this.e[typeof EV[k] == 'string' ? EV[k] : k];
					if( t0 && t0.length > v ) t0[v].disable = 1;
				},
				fn.enable = function( k, v ){
					var t0 = this.e[typeof EV[k] == 'string' ? EV[k] : k];
					if( t0 && t0.length > v ) t0[v].disable = 0;
				},
				fn.remove = function( k, v ){
					var t0 = this.e[typeof EV[k] == 'string' ? EV[k] : k], t1, i;
					if( t0 && ( i = t0.length ) ){
						t1 = typeof v;
						if( t1 == 'number' ) t0.splice( v, 1 );
						else if( t1 == 'function' ) while( i-- ) if( t0[i].f == v ){
							t0.splice( i, 1 );
							break;
						}else if( v && t1 == 'object' ) while( i-- ) if( t0[i].c == v ){
							t0.splice( i, 1 );
							break;
						}
					}
				};
				return ev;
			} )( EV, x, y, isChild );
			return EV;
		})(),
		bs.obj( 'WIN', (function(){
			var win, hash;
			hash = function(v){
				var t0, old, w, h;
				ev( W ), t0 = hash.listener;
				if( v ){
					t0[t0.length] = typeof v == 'function' ? {f:v, c:W, a:[W.bsE]} :
						v.splice ? {f:v[1], c:v[0], a:( t1 = v.slice(1), t1[0] = W.bsE, t1 )} :
						v[e] ? {f:v[e], c:v, a:[W.bsE]} : bs.err(11);
					if( !hash.id ){
						old = location.hash;
						hash.id = setInterval( function(){
							var e, t1, i, j;
							if( old != location.hash ){
								e = W.bsE, e.type = 'hashchange', old = location.hash, i = 0, j = t0.length;
								while( i < j ){
									e.stop = 0, t1 = t0[i++];
									if( !t1.disable ) t1.f.apply( t1.c, t1.a );
									if( e.stop ) break;
								}
							}
						}, 1 );
					}
				}else{
					t0.length = 0;
					clearInterval(hash.id), hash.id = null;
				}
			},
			hash.listener = [],
			win = {
				x:0, y:0, e:null,
				_pos:function(e){e.prevent(), win.x = e.x, win.y = e.y, win.e = e;},
				pos:function(){doc.isCapture = true, win.on( 'move', win._pos, 1 );},
				unpos:function(){doc.isCapture = false, win.on( 'move', null, 1 );},
				prevent:function(e){e.preventDefault();e.stopPropagation();},
				lock:doc['addEventListener'] ? function( isCapture ){
					var i, j;
					for( i = 1, j = arguments.length ; i < j ; i++ ) doc.addEventListener( arguments[i], win.prevent, isCapture );
				} : none,
				unlock:doc['removeEventListener'] ? function( isCapture ){
					var i, j;
					for( i = 1, j = arguments.length ; i < j ; i++ ) doc.removeEventListener( arguments[i], win.prevent, isCapture );
				} : none,
				on:function( k, v, isDoc ){
					if( k == 'hashchange' && !'onhashchange' in W ) return hash(v);
					if( k == 'orientationchange' && !'onorientationchange' in W ) k = 'resize';
					return ev( isDoc || k.substr(0,3) == 'key' ? doc : W, k, v );
				},
				is:function(sel){
					var t0 = query(sel);
					return t0 && t0.length;
				},
				dblselect:function(v){
					doc.ondblclick = v ? null : function(){ 
						if( W.getSelection ) W.getSelection().removeAllRanges(); 
						else if( doc.selection) doc.selection.empty();
					};
				},
				scroll:(function( W, doc, root ){
					return function scroll(){
						switch( arguments[0] ){
						case'w': return Math.max( root.scrollWidth, root.clientWidth );
						case'h': return Math.max( root.scrollHeight, root.clientHeight );
						case'l': return doc.documentElement.scrollLeft || W.pageXOffset || 0;
						case't': return doc.documentElement.scrollTop || W.pageYOffset || 0;
						}
						W.scrollTo( arguments[0], arguments[1] );
					};
				})( W, doc, bs.DETECT.root )
			},
			win.sizer = (function( W, doc ){
				var t0 = {w:0, h:0}, t1, size, docEl, docBody;
				win.size = size = W['innerHeight'] === undefined ? (
					docEl = doc.documentElement, docBody = doc.body, t1 = {w:'clientWidth', h:'clientHeight'}, t1.width = t1.w, t1.height = t1.h,
					function(k){return k = t1[k] ? docEl[k] || docBody[k] : ( t0.w = docEl[t1.w] || docBody[t1.w], t0.h = docEl[t1.h] || docBody[t1.h], t0 );}
				) : ( t1 = {w:'innerWidth', h:'innerHeight'}, t1.width = t1.w, t1.height = t1.h,
					function(k){return k = t1[k] ? W[k] : ( t0.w = W[t1.w], t0.h = W[t1.h], t0 );}
				);
				return function(end){
					var f = function(){win.size(), end( t0.w, t0.h );};
					win.on( 'resize', f );
					if( bs.DETECT.eventRotate ) win.on( 'orientationchange', f );
					f();
				};
			})( W, doc );
			return win;
		})() );
	} ),
	bs.obj( 'KEY', (function(){
		var buffer, keycode;
		return keycode = bs.KEYCODE,
			bs.WIN.on( 'keydown', function(e){buffer[keycode[e.keyCode]] = 1;}),
			bs.WIN.on( 'keyup', function(e){buffer[keycode[e.keyCode]] = 0;}),
			buffer = {};
	})() );
}
function ANI(){
	var style, timer, start, end, loop, ltype, ease, ani, time, isLive, isPause, tween, pool, ex, ANI, mk0, mk1,
		toRadian = Math.PI/180, cos = bs.cos, sin = bs.sin;
	style = bs.STYLE, ani = [], time = 0, timer = 'equestAnimationFrame';
	if( timer = W['r' + timer] || W[bs.DETECT.stylePrefix + 'R' + timer] )
		start = function(){if( !isLive ) isPause = 0, isLive = 1, loop();},
		end = function(){ani.length = isLive = 0;},
		timer( function(T){time = Date.now() - T;} ),
		ltype = 1;
	else
		start = function start(){if( !isLive ) isLive = setInterval( loop, 16 );},
		end = function end(){if( isLive ) clearInterval(isLive), ani.length = isLive = 0;};
	loop = function(T){
		var t, t0, i, j, k;
		if( isPause ) return;
		if( isLive ){
			t = ltype ? T + time || 0 : +new Date, 
			j = ( k = i = ani.length ) % 8;
			while( j-- ) if( ani[--k].ANI(t) ) ani.splice( k, 1 );
			j = ( i * 0.125 ) ^ 0;
			while(j--){
				if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
				if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
				if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
				if( ani[--k].ANI(t) ) ani.splice( k, 1 ); if( ani[--k].ANI(t) ) ani.splice( k, 1 );
			}
			ani.length ? ltype ? timer(loop) : 0 : end();
		}
	};
	ease = (function(){
		var PI, HPI;
		PI = Math.PI, HPI = PI * .5;
		return {//rate,start,term
			linear:function(a,c,b){return b*a+c},
			backIn:function(a,c,b){return b*a*a*(2.70158*a-1.70158)+c}, backOut:function(a,c,b){a-=1;return b*(a*a*(2.70158*a+1.70158)+1)+c},
			backInOut:function(a,c,b){a*=2;if(1>a)return 0.5*b*a*a*(3.5949095*a-2.5949095)+c;a-=2;return 0.5*b*(a*a*(3.70158*a+2.70158)+2)+c},
			bounceIn:function(a,c,b,d,e){return b-ease[3]((e-d)/e,0,b)+c},
			bounceOut:function(a,c,b){if(0.363636>a)return 7.5625*b*a*a+c;if(0.727272>a)return a-=0.545454,b*(7.5625*a*a+0.75)+c;if(0.90909>a)return a-=0.818181,b*(7.5625*a*a+0.9375)+c;a-=0.95454;return b*(7.5625*a*a+0.984375)+c},
			bounceInOut:function(a,c,b,d,e){if(d<0.5*e)return d*=2,0.5*ease[13](d/e,0,b,d,e)+c;d=2*d-e;return 0.5*ease[14](d/e,0,b,d,e)+0.5*b+c},
			sineIn:function(a,c,b){return -b*Math.cos(a*HPI)+b+c}, sineOut:function(a,c,b){return b*Math.sin(a*HPI)+c},
			sineInOut:function(a,c,b){return 0.5*-b*(Math.cos(PI*a)-1)+c},
			circleIn:function(a,c,b){return -b*(Math.sqrt(1-a*a)-1)+c}, circleOut:function(a,c,b){a-=1;return b*Math.sqrt(1-a*a)+c},
			circleInOut:function(a,c,b){a*=2;if(1>a)return 0.5*-b*(Math.sqrt(1-a*a)-1)+c;a-=2;return 0.5*b*(Math.sqrt(1-a*a)+1)+c},
			quadraticIn:function(a,c,b){return b*a*a+c},quadraticOut:function(a,c,b){return -b*a*(a-2)+c}
		};
	})(),
	pool = {length:0}, tween = function(){},
	(function(){
		var t0 = 'id,time,ease,delay,loop,end,update,yoyo,path,circle,bezier'.split(','), i = t0.length;
		while( i-- ) tween[t0[i]] = 1;
	})(),
	ex = function( v, v0 ){
		var t0;
		if( ( t0 = typeof v ) == 'number' ) return v;
		else if( t0 == 'string' ){
			if( v.charAt(0) == '{' ){ // && v.charAt(v.length - 1) == '}'
				v = ( t0 = v.charAt(1) ) == '=' ? v0 : (
					v = parseFloat(v.substring( 2, v.length - 1 )),
					t0 == '+' ? v0 + v : t0 == '-' ? v0 - v : t0 == '*' ? v0 * v : t0 == '/' ? v0 / v : 0
				);
			}else return parseFloat(v);
		}else if( t0 == 'function' ) return v( v, v0 );
		return v;
	},
	tween.prototype.S = function(arg){
		var t0, t1, l, i, j, k, v, v0, v1;
		this.t = t0 = bs.Dom(arg[0]),
		this.bezier = this.circle = this.delay = this.stop = this.yoyo = this.pause = 0, this.id = this.end = this.update = null, this.ease = ease.linear,
		this.time = 1000, this.timeR = .001, this.loop = this.loopC = 1, this.length = l = t0.length || 1;
		while(l--) this[l] ? this[l].length = 0 : this[l] = [], this[l][0] = t0[l].bsS;
		i = 1, j = arg.length;
		while( i < j ){
			k = arg[i++], v = arg[i++];
			if( tween[k] ){
				if( k == 'time' ) this.time = parseInt(v*1000), this.timeR = 1/this.time;
				else if( k == 'ease' ) this.ease = ease[v];
				else if( k == 'end' || k == 'update' ) this[k] = v;
				else if( k == 'loop' ) this.loop = this.loopC = v;
				else if( k == 'delay' ) this.delay = parseInt(v*1000);
				else if( k == 'id' || k == 'yoyo' || k == 'bezier' || k == 'circle' ) this[k] = v;
			}else{
				l = this.length;
				while( l-- ){
					t0 = this[l], v0 = t0[0].g(k), t0[t0.length] = style[k];
					if( typeof v == 'string' && v.indexOf(',') > -1 ) v = v.split(','), t0[t0.length] = v1 = ex( v[0], v0 ), t0[t0.length] = ex( v[1], v0 ) - v1;
					else t0[t0.length] = v0, t0[t0.length] = ex( v, v0 ) - v0;
					t0[t0.length] = typeof style[k] == 'function' ? 1 : 0;
				}
			}
		}
		this.keyLen = this[0].length, this.etime = ( this.stime = Date.now() + this.delay ) + this.time;
		if( t0 = this.circle ){
			if( i = t0.center ) i = i.split(','), t0.centerX = parseFloat(i[0]), t0.centerY = parseFloat(i[1]);
			if( i = t0.offset ) i = i.split(','), t0.offsetX = parseFloat(i[0]), t0.offsetY = parseFloat(i[1]);
			if( i = t0.angle ) i = i.split(','), t0.angle0 = parseFloat(i[0]), t0.angle1 = parseFloat(i[1]);
			if( i = t0.radius ) i = i.split(','), t0.radius0 = parseFloat(i[0]), t0.radius1 = parseFloat(i[1]);
			t0.angle0 *= toRadian, t0.angle1 *= toRadian, t0.angle2 = t0.angle1 - t0.angle0, t0.radius2 = t0.radius1 - t0.radius0,
			t0.x0 = typeof ( t0.x = style[t0.x] ) == 'function' ? 1 : 0, t0.y0 = typeof ( t0.y = style[t0.y] ) == 'function' ? 1 : 0;
		}else if( t0 = this.bezier ){
			t1 = this.bezier0 || ( this.bezier0 = [] ), t1.length = 0;
			for( i  in t0 ){//styleKey, array, rate, val, isFunction
				if( ( l = t0[i].length ) != 3 ) bs.err(1);
				t1.push( style[i], t0[i], 1 / t0[i].length, 0, typeof style[i] == 'function' ? 1 : 0 ); 
			}
		}
		return this;
	},
	tween.prototype.ANI = function( T, pause ){
		var t0, t1, term, time, rate, i, j, l, k, v, e, s, u, 
			circle, ckx, cky, cvx, cvy, 
			bezier, bv0, bv1, bv2, bt, bl, br;
		if( this.stop ) return 1;
		if( pause )
			if( pause == 1 && this.pause == 0 ) return this.pause = T, 0;
			else if( pause == 2 && this.pause ) t0 = T - this.pause, this.stime += t0, this.etime += t0, this.pause = 0;
		if( this.pause || ( term = T - this.stime ) < 0 ) return;
		l = this.length, j = this.keyLen, circle = this.circle, bezier = this.bezier;
		if( term > ( time = this.time ) ){
			if( bezier ) bt = this.bezier0, bl = bt.length;
			if( --this.loopC ){
				if( this.yoyo ){
					while( l-- ){
						t0 = this[l], i = 1;
						while( i < j ) t0[i + 1] +=  t0[i + 2], t0[i + 2] *= -1, i += 4;
					}
					if( circle ) t0 = circle.angle1, circle.angle1 = circle.angle0, circle.angle0 = t0, circle.angle2 *= -1,
						t0 = circle.radius1, circle.radius1 = circle.radius0, circle.radius0 = t0, circle.radius2 *= -1;
					if( bezier ) for( i = 0 ; i < bl ; i += 5 ) j = bt[i + 2][2], bt[i + 2][2] = bt[i + 2][0], bt[i + 2][0] = j;
				}
				return this.stime = T + this.delay, this.etime = this.stime + this.time, 0;
			}else{
				if( circle ) cvx = circle.centerX + circle.offsetX + cos(circle.angle1) * circle.radius1, ckx = circle.x,
					cvy = circle.centerY + circle.offsetY + sin(circle.angle1) * circle.radius1, cky = circle.y
				while( l-- ){
					t0 = this[l], t1 = t0[0], s = t1.s, u = t1.u, i = 1;
					while( i < j ) k = t0[i++], v = t0[i++] + t0[i++], t0[i++] ? k( t1, v ) : s[k] = v + u[k], t1[k] = v;
					if( circle ) t1[ckx] = cvx, circle.x0 ? ckx( t1, cvx ) : s[ckx] = cvx + u[ckx], t1[cky] = cvy, circle.y0 ? cky( t1, cvy ) : s[cky] = cvy + u[cky];
					if( bezier ) for( i = 0 ; i < bl ; i += 5 ) k = bt[i], v = bt[i + 2][2], bt[i + 4] ? k( t1, v ) : s[k] = v + u[k], t1[k] = v;
				}
				if( this.end ) this.end( this.t, 1, T );
				pool[pool.length++] = this;
				return 1;
			}
		}
		e = this.ease, rate = term * this.timeR;
		if( circle ) i = e( rate, circle.angle0, circle.angle2, term, time ), j = e( rate, circle.radius0, circle.radius2, term, time ),
			cvx = circle.centerX + circle.offsetX + cos(i) * j, ckx = circle.x, cvy = circle.centerY + circle.offsetY + sin(i) * j, cky = circle.y;
		if( bezier ) bv1 = 2 * ( rate - ( bv0 = rate * rate ) ), bv2 = 1 - 2 * rate + bv0, bt = this.bezier0, bl = bt.length;
		while( l-- ){
			t0 = this[l], t1 = t0[0], s = t1.s, u = t1.u, i = 1;
			while( i < j ) k = t0[i++], v = e( rate, t0[i++], t0[i++], term, time ), t0[i++] ? k( t1, v ) : s[k] = v + u[k], t1[k] = v;
			if( circle ) circle.x0 ? ckx( t1, cvx ) : s[ckx] = cvx + u[ckx], t1[ckx] = cvx, circle.y0 ? cky( t1, cvy ) : s[cky] = cvy + u[cky], t1[cky] = v;
			if( bezier ){
				for( i = 0 ; i < bl ; i += 5 ){
					k = bt[i], t1 = bt[i + 1], v = t1[2] * bv0 + t1[1] * bv1 + t1[0] * bv2,
					bt[i + 4] ? k( t1, v ) : s[k] = v + u[k], t1[k] = v;
				}
			}
		}
		if( this.update ) this.update( this.t, rate, T );
	},
	mk0 = function( p0, p1 ){
		return function(){
			var i = ani.length, t = Date.now();
			isPause = p0; while( i-- ) ani[i].ANI( t, p1 );
			if( p0 == 0 ) loop();
		};
	},
	mk1 = function(p){
		return function(){
			var t0, t, i, j, k;
			if( p ) t = Date.now();
			i = ani.length, j = arguments.length;
			while( i-- ){
				t0 = ani[i], k = j;
				while( k-- ) if( t0.id == arguments[k] || t0.t[0] == arguments[k] ) p == 0 ? ( pool[pool.length++] = t0, t0.stop = 1, ani.splice( i, 1 ) ) :
					p == 1 ? t0.ANI( t, 1 ) : p == 2 ? ani[i].ANI( t, 2 ) : ani[i].ANI( t, ani[i].pause ? 2 : 1 );
			}
		}
	};
	return ANI = {
		ani:function(v){if(v.ANI) ani[ani.length] = v, start()},
		tween:function(){
			var t0 = pool.length ? pool[--pool.length] : new tween;
			return ani[ani.length] = t0, t0.S(arguments), start(), t0;
		},
		pause:mk0( 1, 1 ), resume:mk0( 0, 2 ), tweenStop:mk1(0), tweenPause:mk1(1), tweenResume:mk1(2), tweenToggle:mk1(3),
		toggle:function(){return isPause ? ANI.resume() : ANI.pause(), isPause;},
		stop:function(){end();},
		ease:ease
	};
}
(function(){
	var t0 = setInterval( function(){
		var start, i;
		switch( i = doc.readyState ){
		case'complete':case'loaded':break;
		case'interactive':if( doc.documentElement.doScroll ) try{doc.documentElement.doScroll('left');}catch(e){return;}
		default:return;
		}
		clearInterval(t0),
		start = function(){
			var i, j
			for( i = 0, j = bs._bsQue.length ; i < j ; i++ ) bs._bsQue[i]();
			bs._bsQue = null;
		},
		bs.obj( 'DETECT', DETECT( W, doc ) ), DOM(), bs.obj( 'ANI', ANI() ), 
		bs._pluginQue.length ? ( bs._pluginQue.unshift(start), bs.plugin.apply( null, bs._pluginQue ), bs._pluginQue = null ) : start();
	}, 1 );
})();
} )(this);