/* bsJS v0.5.5
 * Copyright (c) 2013 by ProjectBS Committe and contributors. 
 * http://www.bsplugin.com All rights reserved.
 * Licensed under the BSD license. See http://opensource.org/licenses/BSD-3-Clause
 */
( function( W, N ){
'use strict';
var VERSION = 0.5, REPOSITORY = 'http://projectbs.github.io/bsPlugin/js/',
	CROSSPROXYKEY = 'CROSSPROXY_DEMO_ACCESS_KEY',
	CROSSPROXY = 'http://api.bsplugin.com/bsNet/php/crossProxy.0.1.php',
	NETWORKERKEY = 'BSNETWORKER_20140707',
	NETWORKER = 'http://www.bsidesoft.com/bs/bsPHP/index.php/networker',
	log, none = function(){}, trim = /^\s*|\s*$/g, doc = W['document'], que = [], pque = [], plugin, timeout = 5000, mk, comp, detect, isDebug = 0,
	bs = W[N = N || 'bs'] = function(f){que ? ( que[que.length] = f ) : f();},
	err = function( num, msg ){console.log( num, msg ); if( isDebug ) throw new Error( num, msg );},
	fn = bs.fn = function( key, v ){var t0 = key.replace( trim, '' ).toLowerCase();( !arguments[2] && t0 != key ) ? err( 1001, key ) : bs[t0] ? err( 2001, t0 ) : bs[t0] = v;};
DETECT:
var detectWindow, detectDOM;
detectWindow = function( W, detect ){
	var navi = W['navigator'], agent = navi.userAgent.toLowerCase(), platform = navi.platform.toLowerCase(), app = navi.appVersion.toLowerCase(), flash = 0, device = 'pc', browser, bv, os, osv, i, t0,
	ie = function(){
		if( agent.indexOf('msie') < 0 && agent.indexOf('trident') < 0 ) return;
		if( agent.indexOf('iemobile') > -1 ) os = 'winMobile';
		return browser = 'ie', bv = agent.indexOf('msie 7') > -1 && agent.indexOf('trident') > -1 ? -1 : agent.indexOf('msie') < 0 ? 11 : parseFloat(/msie ([\d]+)/.exec(agent)[1]);
	},
	chrome = function(){
		if( agent.indexOf( i = 'chrome' ) < 0 && agent.indexOf( i = 'crios' ) < 0 ) return;
		return browser = 'chrome', bv = parseFloat( ( i == 'chrome' ? /chrome\/([\d]+)/ : /crios\/([\d]+)/ ).exec(agent)[1] );
	},
    firefox = function(){return agent.indexOf('firefox') < 0 ? 0 : ( browser = 'firefox', bv = parseFloat(/firefox\/([\d]+)/.exec(agent)[1]) );},
	safari = function(){return agent.indexOf('safari') < 0 ? 0 : ( browser = 'safari', bv = parseFloat(/safari\/([\d]+)/.exec(agent)[1]) );},
    opera = function(){var i; return (agent.indexOf( i = 'opera') < 0 && agent.indexOf( i = 'opr' ) < 0 ) ? 0 : ( browser = 'opera', bv = ( i == 'opera' ) ? parseFloat(/version\/([\d]+)/.exec(agent)[1]) : parseFloat(/opr\/([\d]+)/.exec(agent)[1]) );},
	naver = function(){return agent.indexOf('naver') < 0 ? 0 : browser = 'naver';};
	if( !detect ) detect = {};
	if( agent.indexOf('android') > -1 ){
		browser = os = 'android', device = agent.indexOf('mobile') == -1 ? ( browser += 'Tablet', 'tablet' ) : 'mobile',
		osv = ( i = /android ([\d.]+)/.exec(agent) ) ? ( i = i[1].split('.'), parseFloat( i[0] + '.' + i[1] ) ) : 0,
		naver() || opera() || chrome() || firefox() || ( bv = i = /safari\/([\d.]+)/.exec(agent) ? parseFloat(i[1]) : 0 );
	}else if( agent.indexOf( i = 'ipad' ) > -1 || agent.indexOf( i = 'iphone' ) > -1 ){
		device = i == 'ipad' ? 'tablet' : 'mobile', browser = os = i, osv = ( i = /os ([\d_]+)/.exec(agent) ) ? ( i = i[1].split('_'), parseFloat( i[0] + '.' + i[1] ) ) : 0,
		naver() || opera() || chrome() || firefox() || ( bv = ( i = /mobile\/([\S]+)/.exec(agent) ) ? parseFloat(i[1]) : 0 );
	}else if( platform.indexOf('win') > -1 ){
		for( i in t0 = {'5.1':'xp', '6.0':'vista','6.1':'7','6.2':'8','6.3':'8.1'} ){
			if( agent.indexOf( 'windows nt ' + i ) > -1 ){
				osv = t0[i];
				break;
			}
		}
		os = 'win', ie() || opera() || chrome() || firefox() || safari();
	}else if( platform.indexOf('mac') > -1 ) os = 'mac', i = /os x ([\d._]+)/.exec(agent)[1].replace( '_', '.' ).split('.'), osv = parseFloat( i[0] + '.' + i[1] ), opera() || chrome() || firefox() || safari();
	else os = app.indexOf('x11') > -1 ? 'unix' : app.indexOf('linux') > -1 ? 'linux' : 0, chrome() || firefox();
	(function(){
		var plug, t0;
		plug = navi.plugins;
		if( browser == 'ie' ) try{t0 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').substr(4).split(','), flash = parseFloat( t0[0] + '.' + t0[1] );}catch(e){}
		else if( ( t0 = plug['Shockwave Flash 2.0'] ) || ( t0 = plug['Shockwave Flash'] ) ) t0 = t0.description.split(' ')[2].split('.'), flash = parseFloat( t0[0] + '.' + t0[1] );
		else if( agent.indexOf('webtv') > -1 ) flash = agent.indexOf('webtv/2.6') > -1 ? 4 : agent.indexOf("webtv/2.5") > -1 ? 3 : 2;
	})();
	for( i in t0 = {
		file:W['FileReader'] ? 1 : 0, message:W['postMessage'] ? 1 : 0, local:( W['localStorage'] && 'setItem' in localStorage ) ? 1 : 0,
		db:W['openDatabase'] ? 1 : 0, socket:W['WebSocket'] ? 1 : 0, geo:( navigator['geolocation'] ) ? 1 : 0, history:( 'pushState' in history ) ? 1 : 0, offline:W['applicationCache'] ? 1 : 0,
		device:device, browser:browser, browserVer:bv, os:os, osVer:osv, flash:flash, sony:agent.indexOf('sony') > -1 ? 1 : 0
	} ) if( t0.hasOwnProperty(i) ) detect[i] = t0[i];
	return detect;
},
detectDOM = function( W, detect ){
	var doc = W['document'], cssPrefix, stylePrefix, docMode = 0, b = doc.body, bStyle = b.style, div = doc.createElement('div'), t0, k;
	if( !detect ) detect = {};
	switch( detect.browser ){
	case'ie':
		cssPrefix = '-ms-', stylePrefix = 'ms', docMode = doc['documentMode'] || 0;
		if( detect.browserVer == 6 ) doc.execCommand( 'BackgroundImageCache', false, true ), bStyle.position = 'relative';
		else if( detect.browserVer == -1 ) detect.browserVer = !doc.createElement('canvas')['getContext'] ? 8 : !( 'msTransition' in bStyle ) && !( 'transition' in bStyle ) ? 9 : c.getContext('webgl') ? 11 : 10;
		break;
	case'firefox': cssPrefix = '-moz-', stylePrefix = 'Moz';break;
	case'opera': cssPrefix = '-o-', stylePrefix = 'O';break;
	default: cssPrefix = '-webkit-', stylePrefix = 'webkit';
	}
	for( k in t0 = {
		root:b.scrollHeight ? b : doc.documentElement,
		scroll:doc.documentElement && typeof doc.documentElement.scrollLeft == 'number' ? 'scroll' : 'page',
		cstyle:( doc.defaultView && doc.defaultView.getComputedStyle ) ? 1 : 0,
		docMode:docMode, cssPrefix:cssPrefix, stylePrefix:stylePrefix
	} ) if( t0.hasOwnProperty(k) ) detect[k] = t0[k];
	(function(){
		var c = doc.createElement('canvas'), a = doc.createElement('audio'), v = doc.createElement('video'), r, re, gl, keys, t0, t1, i, j, k,
		c1 = c && c['getContext'] && c.getContext('2d') ? 1 : 0, a1 = a && a['canPlayType'] ? 1 : 0, v1 = v && v['canPlayType'] ? 1 : 0;
		for( k in t0 = {
			canvas:c1, audio:a1, video:v1, worker:W['Worker'] ? 1 : 0,
			canvasText:c1 && c.getContext('2d').fillText ? 1 : 0,
			videoCaption:'track' in doc.createElement('track') ? 1 : 0,
			videoPoster:v1 && 'poster' in v ? 1 : 0
		} ) if( t0.hasOwnProperty(k) ) detect[k] = t0[k];	
		if( a1 ) for( k in t0 = {Mp3:'mpeg',Ogg:'ogg',Wav:'wav',Mp4:'mp4'} ) detect['audio' + k] = a.canPlayType( 'audio/' + t0[k] + ';' ).indexOf('no') < 0 ? 1 : 0;
		if( v1 ) for( k in t0 = {Webm:'/webm; codecs="vp8,mp4a.40.2"',H264:'mp4; codecs="avc1.42E01E,m4a.40.2"',Teora:'ogg; codecs="theora,vorbis"'} ) detect['video' + k] = a.canPlayType( 'video/' + t0[k] ).indexOf('no') < 0 ? 1 : 0;
		keys = {premultipliedAlpha:1,stencil:1,preserveDrawingBuffer:1}, c = doc.createElement('canvas');
		if( c1 && ( gl = c.getContext('webgl',keys) || c.getContext('experimental-webgl',keys) || c.getContext('webkit-3d',keys) || c.getContext('moz-webgl',keys) ) ){
			t0 = gl.getContextAttributes();
			detect.glEnabled = 1;
			t1 = 'alpha,antialias,depth,premultipliedAlpha,preserveDrawingBuffer,stencil'.split(',');
			for( i = 0, j = t1.length ; i < j ; i++ ) k = t1[i], detect['gl' + k.charAt(0).toUpperCase() + k.substr(1)] = t0[k];
			t0 = ( 'VENDOR,VERSION,SHADING_LANGUAGE_VERSION,RENDERER,MAX_VERTEX_ATTRIBS,MAX_VARYING_VECTORS,MAX_VERTEX_UNIFORM_VECTORS,'+
				'MAX_VERTEX_TEXTURE_IMAGE_UNITS,MAX_FRAGMENT_UNIFORM_VECTORS,MAX_TEXTURE_SIZE,MAX_CUBE_MAP_TEXTURE_SIZE,'+
				'MAX_COMBINED_TEXTURE_IMAGE_UNITS,MAX_TEXTURE_IMAGE_UNITS,MAX_RENDERBUFFER_SIZE,MAX_VIEWPORT_DIMS,'+
				'RED_BITS,GREEN_BITS,BLUE_BITS,ALPHA_BITS,DEPTH_BITS,STENCIL_BITS' ).split(',');
			r = /[_]\S/g, re = function(_0){return _0.charAt(1).toUpperCase();};
			for( i = 0, j = t0.length ; i < j ; i++ ) k = t0[i], t1 = k.toLowerCase().replace( r, re ), detect['gl' + t1.charAt(0).toUpperCase() + t1.substr(1)] = gl.getParameter(gl[k]);
		}else detect.glEnabled = 0;
	})();
	return detect;
},
detect = detectWindow(W);
ES5:
if( !Date.now ) Date.now = function(){return +new Date;};
if( !Array.prototype.indexOf ) Array.prototype.indexOf = function( v, I ){
	var i, j, k, l;
	if( j = this.length ) for( I = I || 0, i = I, k = parseInt( ( j - i ) * .5 ) + i + 1, j-- ; i < k ; i++ ) if( this[l = i] === v || this[l = j - i + I] === v ) return l; 
	return -1;
};
if( !W['JSON'] ) W['JSON'] = {
	parse:function(v){return ( new Function( '', 'return ' + v ) )();},
	stringify:(function( r, f ){
		return f = function(o){
			var t0, i, j;
			if( !o ) return 'null';
			switch( t0 = typeof o ){
			case'string':return '"' + o.replace( r, '\\"' ) + '"';
			case'number':case'boolean':return o.toString();
			case'undefined':return t0;
			case'object':
				t0 = '';
				if( o.splice ){
					for( i = 0, j = o.length ; i < j ; i++ ) t0 += ',' + f(o[i]);
					return '[' + t0.substr(1) + ']';
				}else{
					for( i in o ) if( o.hasOwnProperty(i) && o[i] !== undefined && typeof o[i] != 'function' )
						t0 += ',"'+i+'":' + f(o[i]);
					return '{' + t0.substr(1) + '}';
				}
			}
		};
	})(/["]/g)//"
};
fn( 'log', log = (function(){
	var t0 = [], mode = 1, base, prev;
	return function(){
		var i, j, k, l;
		if( !doc.getElementById('BSCSE') ){
			prev = base = Date.now();
			bs.Css('.BSCSE0').S('border-bottom','1px solid #ddd','padding','10px 0'),
			bs.Css('.BSCSE1').S('font-size',8,'color','#777', 'margin-left', 10),
			bs.Css('.BSCSE2').S('float','left','margin',5,'border','1px dashed #aaa','padding',2),
			bs.Dom('<div id="BSCSE" style="position:fixed;z-index:999999;width:100%;background:#fdfdfd;bottom:0;left:0"></div>').S( 'height',300,'<','body',
				'>', bs.Dom('<div style="width:100%;background:#ccc;cursor:pointer;height:20px"></div>').S('down',function(e){
					if( mode ) mode = 0, bs.ANI.style( bs.Dom('#BSCSE'), 'height', 20, 'time', .6 );
					else mode = 1, bs.ANI.style( bs.Dom('#BSCSE'), 'height', 300, 'time', .6 );
				}, 'this'),
				'>', '<div id="BSCC" style="font-family:DotumChe,Courier;overflow-y:scroll;height:280px"></div>'
			);
		}
		for( i = 0, j = arguments.length, t0.length = 0, t0[0] = '<div class="BSCSE1">' + ( l = ( k = Date.now() ) - base ) + ' : ' + ( k - prev ) + '</div>', prev = k ; i < j ; i++ )
			k = arguments[i], t0[t0.length] = '<div class="BSCSE2">' + (typeof k == 'object' ? JSON.stringify(k) : k + '' ) + '</div>';
		bs.Dom('#BSCC').S( '>', '<div class="BSCSE0">'+t0.join('')+'<br clear="both"></div>' );
		return l;
	};
})() );
if( !W['console'] ) W['console'] = {log:log};
CORE:
(function(trim){
	var rc = 0, rand, template,	js, head = doc.getElementsByTagName('head')[0], e = W['addEventListener'], id = 0, c = bs.__callback = {}, slice = [].slice;
	fn( 'obj', function( key, v ){var t0 = key.replace( trim, '' ).toUpperCase();( !arguments[2] && t0 != key ) ? err( 1002, key ) : bs[t0] ? err( 2002, t0 ) : bs[t0] = v;} ),
	fn( 'cls', function( key, v ){
		var t0 = key.replace( trim, '' ).toLowerCase(), t1, t2, cls, fn, k, f;
		t0 = t0.charAt(0).toUpperCase() + t0.substr(1), ( !arguments[2] && t0 != key ) ? err( 1003, key ) : bs[t0] ? err( 2003, t0 ) : (
			( fn = ( cls = function(arg){return this.__bsKey = arg[0], this.NEW.apply( this, arg );} ).prototype ).NEW = none,
			v( t1 = {}, t2 = {}, bs ), f = bs[t0] = function(key){
				var t0;
				if( typeof key == 'string' && key ){
					if( ( t0 = key.charAt(0) ) == '@' ) return cls[arguments[0] = key.substr(1)] = new cls(arguments);
					else if( t0 != '<' ) return cls[key] || ( cls[key] = new cls(arguments) );
				}
				return new cls(arguments);
			}
		);
		for( k in t1 ) if( t1.hasOwnProperty(k) ) fn[k] = t1[k];
		for( k in t2 ) if( t2.hasOwnProperty(k) ) f[k] = t2[k];
		fn.END = function(){delete cls[this.__bsKey];}, fn.instanceOf = f;
	} ),
	fn( 'compress', (function(){
		var own = Object.prototype.hasOwnProperty, _f = String.fromCharCode;
		fn( 'decompress', function(e){if(e==null)return"";if(e=="")return null;var t=[],n,r=4,i=4,s=3,o="",u="",a,f,l,c,h,p,d,v=_f,m={string:e,val:e.charCodeAt(0),position:32768,index:1};for(a=0;a<3;a++){t[a]=a}l=0;h=Math.pow(2,2);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(n=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}d=v(l);break;case 2:return""}t[3]=d;f=u=d;while(true){if(m.index>m.string.length){return""}l=0;h=Math.pow(2,s);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}switch(d=l){case 0:l=0;h=Math.pow(2,8);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 1:l=0;h=Math.pow(2,16);p=1;while(p!=h){c=m.val&m.position;m.position>>=1;if(m.position==0){m.position=32768;m.val=m.string.charCodeAt(m.index++)}l|=(c>0?1:0)*p;p<<=1}t[i++]=v(l);d=i-1;r--;break;case 2:return u}if(r==0){r=Math.pow(2,s);s++}if(t[d]){o=t[d]}else{if(d===i){o=f+f.charAt(0)}else{return null}}u+=o;t[i++]=f+o.charAt(0);r--;f=o;if(r==0){r=Math.pow(2,s);s++}}} );
		return function(e){if(e==null)return"";var t,n,r={},i={},s="",o="",u="",a=2,f=3,l=2,c="",h=0,p=0,d,v=_f;for(d=0;d<e.length;d+=1){s=e.charAt(d);if(!own.call(r,s)){r[s]=f++;i[s]=true}o=u+s;if(own.call(r,o)){u=o}else{if(own.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}r[o]=f++;u=String(s)}}if(u!==""){if(own.call(i,u)){if(u.charCodeAt(0)<256){for(t=0;t<l;t++){h=h<<1;if(p==15){p=0;c+=v(h);h=0}else{p++}}n=u.charCodeAt(0);for(t=0;t<8;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}else{n=1;for(t=0;t<l;t++){h=h<<1|n;if(p==15){p=0;c+=v(h);h=0}else{p++}n=0}n=u.charCodeAt(0);for(t=0;t<16;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}delete i[u]}else{n=r[u];for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}}a--;if(a==0){a=Math.pow(2,l);l++}}n=2;for(t=0;t<l;t++){h=h<<1|n&1;if(p==15){p=0;c+=v(h);h=0}else{p++}n=n>>1}while(true){h=h<<1;if(p==15){c+=v(h);break}else p++}return c};
	})() ),
	fn( 'local', detect.local ? function(){
		var t0, k = arguments[0], v = arguments[1];
		return v === undefined ? ( ( t0 = localStorage.getItem(k) || '' ) && t0.charAt(0) == '@' ? JSON.parse(bs.decompress(t0.substr(1))) : t0 ) :
			v === null ? localStorage.removeItem(k) :
			( localStorage.setItem( k, typeof v == 'object' ? '@' + bs.compress(JSON.stringify(v)) : v ), v );
	} : function(){
		var t0, k = arguments[0], v = arguments[1];
		return v === undefined ? (t0 = bs.ck(k) || '').charAt(0) == '@' ? JSON.parse(bs.decompress(t0.substr(1))) : t0 :
			v === null ? bs.ck( k, null ) :
			( bs.ck( k, v && typeof v == 'object' ? '@' + bs.compress(JSON.stringify(v)) : v, 365 ), v );
	} ),
	fn( 'model', (function(){
		var data = {};
		return function(){
			var i = 0, j = arguments.length, k, v;
			while( i < j ){
				k = arguments[i++], v = arguments[i++];
				if( v === undefined ) return data[k];
				else if ( v === null ) delete data[k];
				else data[k] = v;
			}
			return v;
		};
	})() );
	fn( 'debug', function(v){return v === undefined ? isDebug : ( isDebug = v );} );
	rand = function(){return rc = ( ++rc ) % 1000, rand[rc] || ( rand[rc] = Math.random() );},
	fn( 'rand', function( a, b ){return parseInt( rand() * ( b - a + 1 ) ) + a;} ), fn( 'randf', function( a, b ){return rand() * ( b - a ) + a;} ),
	mk = function( t, m ){return function(r){return t[r] || t[r] == 0 ? 0 : ( t[r] = Math[m](r) );};},
	fn( 'sin', mk( {}, 'sin' ) ), fn( 'cos', mk( {}, 'cos' ) ), fn( 'tan', mk( {}, 'tan' ) ), fn( 'atan', mk( {}, 'atan' ) );
	fn( 'trim', (function(trim){
		var f = function(v){
			var t0, i;
			if( !v ) return v;
			t0 = typeof v;
			if( t0 == 'string' ) return v.replace( trim, '' );
			if( t0 == 'object' ){
				if( v.splice ){t0 = [], i = v.length; while( i-- ) t0[i] = f(v[i]);}
				else{t0 = {}; for( i in v ) if( v.hasOwnProperty(i) ) t0[i] = f(v[i]);}
				return t0;
			}
			return v;
		};
		return f;
	})(trim) ),
	fn( 'tmpl', template = (function(){
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
		return function(v){return arg = arguments, v.replace( r, re ).replace( trim, '' );};
	})() ),
	fn( 'compile', comp = (function( r0, re0, r1, arg, param ){
		return function( f, tmpl, opt ){
			var i;
			param.length = arg.length = 0;
			if( tmpl ) for( i in tmpl ) if( typeof tmpl[i] == 'function' ) tmpl[i] = tmpl[i].toString().replace( r1, '' ).replace( trim, '' );
			if( opt ) for( i in opt ) if( opt.hasOwnProperty(i) ) param[param.length] = i, arg[arg.length] = opt[i];
			return ( new Function( param.length ? param.join(',') : '', 'return ' + template( f.toString().replace( r0, re0 ), tmpl ) ) ).apply( null, arg );
		};
	})( /'@[^@]+@'/g, function(_0){return _0.substring( 1, _0.length - 1 );}, /^[^{]*\{|\}$/g, [], [] ) ),
	fn( 'img', (function(c){
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
	})(window['HTMLCanvasElement']) ),
	fn( 'go', function(url){location.href = url;} ), fn( 'open', function(url){W.open(url);} ),
	fn( 'back', function(){history.back();} ), fn( 'reload', function(){location.reload();} ),
	fn( 'ck', function ck( key/*, val, expire, path*/ ){
		var t0, t1, t2, i, v;
		t0 = document.cookie.split(';'), i = t0.length;
		if( arguments.length == 1 ){
			while( i-- ) if( ( t1 = bs.trim(t0[i].split('=')), t1[0] ) == key ) return decodeURIComponent(t1[1]);
			return null;
		}else{
			v = arguments[1], t1 = key + '=' + encodeURIComponent(v) + ';domain='+document.domain+';path='+ (arguments[3] || '/');
			if( v === null ) t0 = new Date, t0.setTime( t0.getTime() - 86400000 ), t1 += ';expires=' + t0.toUTCString();
			else if( arguments[2] ) t0 = new Date, t0.setTime( t0.getTime() + arguments[2] * 86400000 ), t1 += ';expires=' + t0.toUTCString();
			return document.cookie = t1, v;
		}
	} ),
	fn( 'timeout', function(){return arguments.length ? ( timeout = parseInt( arguments[0] * 1000 ) ) : timeout * .001;} ),
	js = function( data, load, end ){
		var t0 = doc.createElement('script'), i;
		t0.type = 'text/javascript', t0.charset = 'utf-8', head.appendChild(t0);
		if( load ){
			if(e) t0.onload = function(){t0.onload = null, load();};
			else t0.onreadystatechange = function(){if( t0.readyState == 'loaded' || t0.readyState == 'complete' ) t0.onreadystatechange=null, load();};
			if( data.charAt( data.length - 1 ) == '=' ) data += 'bs.__callback.' + ( i = 'c' + (id++) ), c[i] = function(){delete c[i], end.apply( null, arguments );};
			t0.src = data;
		}else t0.text = data;
	},
	fn( 'js', function(end){
		var arg = arguments, load, i = 1, j = arg.length;
		if( end ) ( load = function(){i < j ? js( arg[i++], load, end ) : end();} )();
		else while( i < j ) js( bs.get( null, arg[i++] ) );
	}),
	fn( 'worker', (function(){
		var worker, body, type, blob, builder, url, toURL;
		if( W['Worker'] && ( blob = W['Blob'] ? function(){return new Blob( body, type );} :
			( builder = W['BlobBuilder'] || W['WebKitBlobBuilder'] || W['MozBlobBuilder'] ) ? function(){
				var blob = new BlobBuilder();
				return blob.append(body), blob.getBlob();
			} : 0 ) ){
			worker = {}, body = [], type = {type:'application/javascript'}, url = W['URL'] || W['webkitURL'],
			toURL = function(f){return body[0] = 'onmessage=function(e){postMessage((' + f.toString() + ').apply(null,e.data));}', url.createObjectURL(blob());}
			return function(){
				var i = arguments.length, j = arguments[0];
				if( i == 1 && ( i = worker[j] ) ) return i;
				if( i == 2 && typeof (i = arguments[1] ) == 'function' ){
					var u = toURL(i);
					return worker[j] = function(end){
						var worker = new Worker(u), isEnd = 0;
						worker.onmessage = function(e){
							if( isEnd++ ) return;
							end(e.data);
						},
						worker.onerror = function(e){
							if( isEnd++ ) return;
							end( null, e );
						},
						worker.postMessage(slice.call( arguments, 1 ));
					};
				}
				bs.err( 10001, arguments );
			};
		}
		return function(){return none;};
	})() ),
	fn( 'networker', (function(){
		var worker = {};
		return function(){
			var i = arguments.length, j = arguments[0];
			if( i == 1 && ( i = worker[j] ) ) return i;
			if( i == 2 && typeof (i = arguments[1] ) == 'function' ){
				return worker[j] = function(end){
					bs.post( function( v, e ){end( v ? JSON.parse(v) : null, e || 'server error' );},
						NETWORKER, 'BS', NETWORKERKEY, 'c', '(' + i.toString() + ').apply(null,' + JSON.stringify(slice.call( arguments, 1 )) + ')'
					);
				};
			}
			bs.err( 11001, arguments );
		};
	})() );
})(trim);
NET:
(function( trim ){
	var xhrType = 0, xhr = detect.browser === 'ie' && detect.browserVer < 9 ? (function(){
		var t0, i, j;
		xhrType = 1;
		t0 = 'MSXML2.XMLHTTP', t0 = ['Microsoft.XMLHTTP',t0,t0+'.3.0',t0+'.4.0',t0+'.5.0'], i = t0.length;
		while( i-- ){try{new ActiveXObject( j = t0[i] );}catch(e){continue;}break;}
		return function(){return new ActiveXObject(j);};
	})() : function(){return new XMLHttpRequest;},
	cross = W['XDomainRequest'] ? (function(){
		var mk = function( x, err, end ){return function(){x.ontimeout = x.onload = x.onerror = null, err ? ( x.abort(), end( null, err ) ) : end(x.responseText);};};
		return function( data, end ){
			var x = new XDomainRequest;
			x.ontimeout = mk( x, 'timeout', end ), x.timeout = timeout, x.onerror = mk( x, 'xdr error', end ), x.onload = mk( x, 0, end ), x.open( 'POST', CROSSPROXY ), x.send(data);
		};
	})() : W['XMLHttpRequest'] ? function( data, end ){
		var x = xhr();
		async( x, end ), x.open( 'POST', CROSSPROXY, true ), x.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8' ), x.withCredentials = true, x.send(data);
	} : 0,
	url = function( U, arg ){
		var t0 = U.replace( trim, '' ).split('#'), p = param( arg, 2 );
		return t0[0] + ( t0[0].indexOf('?') > -1 ? '&' : '?' ) + 'bsNC=' + bs.rand( 1000, 9999 ) + ( p ? '&' + p : '' ) + ( t0[1] ? '#' + t0[1] : '' );
	},
	async = function( x, end ){
		var timeId = setTimeout( function(){
			if( timeId == -1 ) return;
			if( x.readyState !== 4 ) x.abort();
			timeId = -1, x.onreadystatechange = null, end( null, 'timeout' );
		}, timeout );
		x.onreadystatechange = function(){
			var text, status;
			if( x.readyState !== 4 || timeId == -1 ) return;
			clearTimeout(timeId), timeId = -1,
			text = x.status == 200 || x.status == 0 ? x.responseText : null,
			status = text ? x.getAllResponseHeaders() : x.status,
			xhrType ? delete x.onreadystatechange : x.onreadystatechange = null,
			end( text, status );
		};
	},
	head = [], paramBody = [], paramHeader = function(v){return typeof v == 'function' ? v(httpMethod) : v;},
	param = function( arg, i ){
		var t0, j, k, v, m;
		if( !arg || ( j = arg.length ) < i + 1 ) return '';
		head.crossKey = head.length = paramBody.length = 0;
		while( i < j ){
			if( !( k = arg[i++].replace( trim, '' ) ).length ) err(5005);
			if( i < j ){
				v = arg[i++],
				k.charAt(0) === '@' ? head.push( k.substr(1), paramHeader(v) ) :
				k == 'crossAccessKey' ? head.crossKey = v :
					paramBody[paramBody.length] = encodeURIComponent(k) + '=' + encodeURIComponent(( v && typeof v == 'object' ? JSON.stringify(v) : v + '' ).replace( trim, '' ));
			}else m = encodeURIComponent(k);
		}
		return m || paramBody.join('&');
	},
	httpCross = cross ? [] : 0, httpH = [], httpMethod,
	http = function( method, end, U, arg ){
		var x, key, i, j, k;
		if( ( httpMethod = method ) === 'GET' ){
			if( ( U = url( U, arg ) ).length > 512 ) err( 5004, U );
			arg = '';
		}else U = url(U), arg = param( arg, 2 );
		if( ( i = U.indexOf( '://' ) ) > -1 && U.substr( i + 3, ( j = location.hostname).length ) != j ){
			if( !end || !cross ) return err(5001);
			for( key = head.crossKey || CROSSPROXYKEY, httpCross.length = httpH.length = i = 0, j = head.length ; i < j ; i += 2 )
				baseHeader[httpCross[i] = k = head[i]] ? httpH[httpH.length] = k : 0, httpCross[i + 1] = head[i + 1];
			k = i;
			for( i in baseHeader ) if( httpH.indexOf(i) == -1 ) httpCross[k++] = i, httpCross[k++] = paramHeader(baseHeader[i]);
			k = param( httpCross, 0 ), httpCross.length = 0,
			httpCross.push( 'url', U, 'method', method, 'key', key, 'data', arg, 'header', k );
			cross( param(httpCross, 0), end );
		}else{
			x = xhr();
			if( end ) async( x, end );
			x.open( method, U, end ? true : false ),
			httpH.length = i = 0, j = head.length;
			while( i < j ){
				x.setRequestHeader( k = head[i++], head[i++] );
				if( baseHeader[k] ) httpH[httpH.length] = k;
			}
			for( i in baseHeader ) if( httpH.indexOf(i) == -1 ) x.setRequestHeader( i, paramHeader(baseHeader[i]) );
			x.send(arg);
			if( !end ) return ( i = x.responseText ), xhrType ? delete x.onreadystatechange : x.onreadystatechange = null, i;
		}
	}, baseHeader = {};
	fn( 'header', function( k, v ){baseHeader[k] ? err( 2200, k ) : baseHeader[k] = v;} ),
	mk = function(m){return function( end, url ){return http( m, end, url, arguments );};},
	fn( 'post', mk('POST') ), fn( 'put', mk('PUT') ), fn( 'delete', mk('DELETE') ), fn( 'get', mk('GET') );
})(trim);
PLUGIN:
(function(){
	var required = {}, types ={'method':bs.fn, 'class':bs.cls, 'static':bs.obj}, require = function( key, data, type ){
		var module = {exports:{}}, t0, t1 = {}, k;
		try{t0 = ( new Function( 'bs,module,exports', data + '\n\n;return [module, exports];' ) )( bs, module, module.exports );
		}catch(e){return err( 7000, e + '::' + data );}
		if( t0[0].exports ) for( k in t0[0].exports ) if( t0[0].exports.hasOwnProperty(k) ) t1[k] = t0[0].exports[k];
		if( t0[1] ) for( k in t0[1] )if( t0[1].hasOwnProperty(k) && !t1[k] ) t1[k] = t0[1][k];
		return ( t0 = types[type] ) ? ( required[key] = t1[key] ) ? t0( key, t1[key], 1 ) : err( 7001, t1 ) : ( required[key] = t1 );
	};
	plugin = function( end, list ){
		var i0 = 0, j0 = list.length, loader = function(){
			var repo, k1 ,v1;
			if( i0 >= j0 ) return end();
			k1 = list[i0++], v1 = list[i0++];
			if( required[k1] ) return loader();
			( repo = function(){
				bs.get( function(data){
					var info, add, t0, i, j, k, v;
					if( !data ) return err( 6001, k1 ), end();
					data = JSON.parse(data);
					if( !v1 || v1 == 'last' ){
						v1 = 0;
						for( k in data ) if( ( k = parseFloat(k) ) > v1 ) v1 = k;
					}
					if( !(info = data[v1]) ) return err( 6002, data ), end();
					if( typeof info == 'string' ) return k1 = info, repo();
					add = function(){bs.get( function(data){require( k1, data, info.type ), loader();}, info.uri );};
					if( info.depend && ( j = info.depend.length ) ){
						t0 = [], i = 0;
						while( i < j ){
							k = info.depend[i++], v = info.depend[i++];
							if( !required[k] ) t0.push( k, v );
						}
						if( t0.length > 1 ) plugin( add, t0 );
					}else add();
				}, REPOSITORY + k1 + '.json' );
			} )();
		};
		loader();
	},
	fn( 'require', function(){
		var end, url, t0;
		switch( arguments.length ){
		case 1:return required[arguments[0]];
		case 2:
			end = arguments[0], t0 = required[url = arguments[1]];
			if( t0 ) return end ? end(t0) : t0;
			return  end ? bs.get( function(data){end(require( url, data ));}, url ) : require( url, bs.get( null, url ) );
		}
	} ),
	fn( 'repository', function(){return arguments[0] ? ( REPOSITORY = arguments[0] ) : REPOSITORY;} ),
	fn( 'plugin', function(){for( var i = 0, j = arguments.length ; i < j ; i++ ) pque[pque.length] = arguments[i];} );
})();
EVENT:
fn( 'ev', (function(){
	var pool = {}, ev, on, fn, f
	on = function(){this.a = [];}, on._l = 0,
	ev = function(){}, fn = ev.prototype,
	fn['+'] = function( channel, type, group, context, method, arg, i ){
		var t0 = this.o[channel] || ( this.o[channel] = {_l:0} ), t1 = on._l ? on[--on._l] : new on, j;
		if( !t0[type] ) t0[type] = t0._l++;
		if( !t0[t0[type]] ) t0[t0[type]] = [];
		t0 = t0[t0[type]], t0[t0.length] = t1, t1.g = group, t1.c = context,
		t1.m = typeof method == 'function' ? method : context[method], t0 = t1.a;
		if( arg ){
			i = i || 2, j = arg.length;
			while( i < j ) t0[t0.length] = arguments[i++];
		}
		return t0[t0.length] = this, t1;
	}, fn['-'] = function( channel, type, group, listener ){
		var t0 = this.o[channel], t1, i;
		if( t0 && ( t0 = t0[t0[type]] ) ){
			i = t0.length;
			if( group ){
				while( i-- ) if( ( t1 = t0[i] ).g == group && ( !listener || t1 == listener ) ) on[on._l++] = ( t0.splice( i, 1 ), t1.c = t1.m = t1.g = null, t1.a.length = 0, t1 );
				return t0.length;
			}else{
				while( i-- ) if( !listener || t1 == listener ) on[on._l++] = ( ( t1 = t0[i] ).c = t1.m = t1.g = null, t1.a.length = 0, t1 );
				return t0.length = 0;
			}
		}else return -1;
	}, fn['~'] = function( channel, type, group ){
		var t0 = this.o[channel], i = 0, j, k;
		t0 = t0[t0[type]], j = t0.length;
		if( group ) while( i < j ){if( ( k = t0[i++] ).g == group && k.m.apply( k.c, k.a ) ) return;} else while( i < j ){if( ( k = t0[i++] ).m.apply( k.c, k.a ) ) return;}
	}, fn.NEW = fn.END = none;
	f = function( k, v ){
		var cls, fn, t0, t1, i;
		if( f[k] ) err( 0, k );
		pool[k] = {_l:0}, cls = function(){this.o = {_l:0};}, fn = cls.prototype = new ev,
		f[k] = function(v){
			if( v instanceof ev ){
				for( k in v.o ){
					t0 = v.o[k], i = t0._l;
					while( i-- ){
						j = t0[i].length;
						while( j-- ) on[on._l++] = ( t1 = t0[i][j] ).c = t1.m = t1.g = null, t1.a.length = 0, t1;
						t0[i].length = 0;
					}
				}
				pool[k][pool[k]._l++] = ( v.END(), v );
			}else return t0 = pool[k], t0 = t0._l ? t0[--t0._l] : new cls, t0.NEW.apply( t0, arguments ), t0;
		},
		v( t0 = {}, t1 = {}, bs );
		for( i in t0 ) if( t0.hasOwnProperty(i) ) fn[i] = t0[i];
		for( i in t1 ) if( t1.hasOwnProperty(i) ) f[k][i] = t1[i];
	};
	return f;
})() );
fn( 'router', (function(){
	var defaultC = 'index', defaultM = 'index', ex = '.js', table = {}, path, isHash = 'onhashchange' in W, timer, prevHash, currHash, 
	file, arg, method,
	methodHash = {}, uuid = 1, methodId,
	methodReg = function( v, h ){
		if( !v.bsrouter_uuid ) v.bsrouter_uuid = uuid++;
		methodHash[methodId = v.bsrouter_uuid] = h;
		return v;
	},
	hashHead = '#!/', hashHeadLen = hashHead.length,
	hash = function(h){
		var t0 = h || location.hash, i = 0, j = 0;
		while( j < hashHeadLen ) i += t0.charAt(i) == hashHead.charAt(j++) ? 1 : 0;
		t0 = t0.substring( i, t0.length - ( t0.charAt( t0.length - 1 ) == '/' ? 1 : 0 ) );
		if( t0 == '/' ) t0 = '';
		if( !h ) currHash = t0; 
		return t0;
	},
	change = function(){
		if( prevHash != hash() ) route();
		prevHash = currHash;
	},
	route = function(){
		var runHash, uri, id, end, t0, t1, i, j, k;
		file = arg = method = null;
		runHash = currHash;
		if( t0 = table['*'] ) return methodReg( method = t0, runHash ).apply( null, arg = runHash.split('/') );
		if( !runHash ) return path ? bs.require( function(v){
				v && ( v = v.controller ) && ( v = v[defaultM] ) ? ( file = uri, method = defaultM, methodReg( v, runHash )() ) : err( 12003, '/' );
			}, uri = path.base + defaultC + ex ) : err( 12002, '/' );
		
		id = runHash.split('/'), j = id.length;
		for( t0 = [], i = 0 ; i < j ; i++ ){
			t0[t0.length] = id[i];
			if( t1 = table[t0.join('/') + '*'] ) return methodReg( method = t1, runHash ).apply( null, arg = id.slice( i + 1 ) );
		}
		if( typeof table[t0] == 'function' ) methodReg( method = table[t0], runHash )();
		else if( path ){
			for( t0 = path.base, k = path.folder, i = 0 ; i < j ; i++ ) if( k = k[id[i]] ) t0 += id[i] + '/'; else break;
			bs.require( end = function(v){
				var f, idx = i + 1, t1;
				v && ( v = v.controller ) ? ( f = v[t1 = v[id[i]] ? id[i] : (idx--, defaultM)] ) ? ( method = t1, file = uri, methodReg( f, runHash ).apply( null, arg = id.slice(idx) ) ) : err( 12004, runHash ) :
				uri.indexOf( defaultC + ex ) == -1 ? ( i--, bs.require( end, uri = t0 + defaultC + ex ) ) : err( 12003, runHash );
			}, uri = t0 + ( i < j ? id[i++] : defaultC ) + ex );
		}else err( 12002, runHash );
	},
	key = {}, t0 = 'start,stop,path,change,defaultController,defaultMethod,file,current,virtual,arguments,method'.split(','), i = t0.length,
	router = function(){
		var args = arguments, t0, t1, t2, i = 0, j = args.length, k, v, m, n;
		while( i < j ){
			k = args[i++], v = args[i++];
			if( key[k] ) switch(k){
			case'path':
				return bs.get( function( v, e ){
					if( v ) try{
						path = JSON.parse(v);
						if( path.base && path.folder ){
							if( path.base.charAt( path.base.length - 1 ) != '/' ) path.base += '/';
						}else v = 0, e = 'invalid path';
					}catch(ex){e = v + '::' + ex, v = 0;}
					!v ? err( 12001, v + '::' + e ) : i < j ? router.apply( null, Array.prototype.slice.call( args, i ) ) : 0;
				}, v );
			case'start':isHash ? bs.WIN.on( 'hashchange', change ) : timer || ( timer = setInterval( change, 1 ) ), v && v(); break;
			case'stop':isHash ? bs.WIN.on( 'hashchange', null ) : timer && ( clearInterval(timer), timer = 0 ); break;
			case'file':return file;
			case'current':return currHash;
			case'virtual':return methodHash[methodId];
			case'arguments':return arg;
			case'method':return method;
			case'change':return change();
			case'defaultController':v === undefined ? v = defaultC : defaultC = v; break;
			case'defaultMethod':v === undefined ? v = defaultM : defaultM = v; break;
			}else k = hash(k), typeof v == 'function' ? table[k] = v: v === undefined ? v = table[k] : v === null ? delete table[k] : err( 12004, k );
		}
		return v;
	};
	while(i--) key[t0[i]] = t0[i];
	return router;
})() );
(function(){
	var DOM = function(){
		var attrs = {};
		bs.obj( 'KEY', (function(){
			var t0 = {downed:{}, code2name:{}, name2code:{}}, i, j, k, v,
				t1 = 'a,65,b,66,c,67,d,68,e,69,f,70,g,71,h,72,i,73,j,74,k,75,l,76,m,77,n,78,o,79,p,80,q,81,r,82,s,83,t,84,u,85,v,86,w,87,x,88,y,88,z,90,back,8,tab,9,enter,13,shift,16,control,17,alt,18,pause,19,caps,20,esc,27,space,32,pageup,33,pagedown,34,end,35,home,36,left,37,up,38,right,39,down,40,insert,45,delete,46,numlock,144,scrolllock,145,0,48,1,49,2,50,3,51,4,52,5,53,6,54,7,55,8,56,9,57'.split(',');
			i = 0, j = t1.length;
			while( i < j ) k = t1[i++], v = parseInt(t1[i++]), t0.name2code[k] = v, t0.code2name[v] = k;
			return t0;
		})() ),
		bs.ev( 'dom', function( fn, clsfn, bs ){
			var r = {length:0}, keyName = bs.KEY.code2name, keycode = bs.KEY.name2code, eName = {},
			evCat = {'touchstart':2,'touchend':1,'touchmove':1,'mousedown':4,'mouseup':3,'mousemove':3,'click':3,'mouseover':3,'mouseout':3},
			isChild = function( p, c ){
				if( c ) do if( c == p ) return 1; while( c = c.parentNode )
				return 0;
			}, docel=document.documentElement, page, layerX, layerY;

			detect.browser == 'ie' && detect.browserVer < 9  ? ( layerX = 'offsetX', layerY = 'offsetY' ) : ( page = 1, layerX = 'layerX', layerY = 'layerY' ),
			clsfn.fn = function( k, v ){attrs[k] = 2, eName[k] = v;},
			fn.key = function(k){return this.keyCode == keycode[k];},
			fn.eventKey = function(k){return k == 'ctrl' ? this.event.metaKey || this.event.ctrlKey : k == 'shift' ? this.event.shiftKey : k == 'button' ? this.event.button : 0;},
			fn.preventDefault = bs.DETECT.event ? function(){this.event.preventDefault();} : function(){this.event.returnValue = false;};
			fn.stop = bs.DETECT.event ? function(){this.event.stopPropagation();} : function(){this.event.cancelBubble = true;};
			fn.prevent = function(){this.preventDefault(), this.stop();},
			fn.isRollover = function(){return !isChild( this, e.event.fromElement || e.event.relatedTarget );},
			fn.isRollout = function(){return !isChild( this, e.event.toElement || e.event.explicitOriginalTarget );},
			fn.on = function( type, group, context, method, arg ){
				type = eName[type] || ( eName[type] = type );
				this['+']( false, type, group, context, method, arg, 2 ), this._on(type);},
			fn.off = function( type, group ){
				type = eName[type] || ( eName[type] = type );
				if( !this['-']( false, type, group ) ) this._off(type);
			},
			fn._on = W['addEventListener'] ? function(k){this.dom.addEventListener( k, this.handleEvent, this.isCapture );} :
				W['attachEvent'] ? function(k){this.dom.attachEvent( 'on' + k, this.handleEvent );} : function(k){this.dom['on' + k] = this.handleEvent;},
			fn._off = W['addEventListener'] ? function(k){this.dom.removeEventListener( k, this.handleEvent, this.isCapture );} :
				W['attachEvent'] ? function(k){this.dom.detachEvent( 'on' + k, this.handleEvent );} : function(k){this.dom['on' + k] = null;},
			fn.END = function(){this.dom = this.handleEvent = null;},
			fn.NEW = function(d){
				var self = this, t = trim;
				this.dom = d, this.isCapture = false, this.handleEvent = function(e){
					var e = self.event = e || event, type = self.type = e.type, typeCat = evCat[type], t0, t1, i, X, Y;
					if( typeCat ){ 
						if( typeCat < 3 ){
							t0 = e.changedTouches, self.length = i = t0.length;
							while( i-- ) self[i] = t1 = t0[i], self['id'+i] = t1.identifier,
								self['x'+i] = X = t1.pageX, self['y'+i] = Y = t1.pageY,
								self['cx'+i] = t1.clientX, self['cy'+i] = t1.clientY,
								self['lx'+i] = t1.layerX, self['ly'+i] = t1.layerY,
								typeCat == 2 ?
									( self['$x'+i] = self['_x'+i] = X, self['$y'+i] = self['_y'+i] = Y ) :
									( self['dx'+i] = X - self['_x'+i], self['dy'+i] = Y - self['_y'+i] ),
								typeCat == 1 ?( self['mx'+i] = X - self['$x'+i], self['my'+i] = Y - self['$y'+i], self['$x'+i] = X, self['$y'+i] = Y) : 0;
							self.id = self.id0, self.mx = self.mx0, self.my = self.my0, self.x = self.x0, self.y = self.y0, self.lx = self.lx0, self.ly = self.ly0, self.dx = self.dx0, self.dy = self.dy0, self.cx = self.cx0, self.cy = self.cy0;
						}else{
							self.length = 0, self.cx = e.clientX, self.cy = e.clientY,
							self.x = X = page ? e.pageX : self.cx + docel.scrollLeft, self.y = Y = page ? e.pageY : self.cy + docel.scrollTop,
							self.lx = e[layerX], self.ly = e[layerY],
							typeCat == 4 ? ( self.$x = self._x = X, self.$y = self._y = Y ) : ( self.dx = X - self._x, self.dy = Y - self._y );
							if( typeCat == 3 ) self.mx = X - self.$x, self.my = Y - self.$y, self.$x = X, self.$y = Y;
						}
					}
					if( d.value ) self.value = d.value.replace( t, '' );	
					self.keyName = keyName[self.keyCode = e.keyCode],
					self['~']( false, type );
				};
			};
		} ),
		bs.obj( 'WIN', (function(){
			var win, wdata = {}, ddata = {}, ev = {};
			win = {
				ev:function( k, v ){ev[k] ? err( 2401, k ) : ev[k] = v;},
				on:function( k, v, isDoc ){
					var data, t0, t1, k, g, c, m, a, d;
					( isDoc || k.substr(0,3) == 'key' ) ? ( data = ddata, d = doc ) : ( data = wdata, d = W );
					if( 'on' + k in d || k.indexOf(':') > -1 ) attrs[k] = 2;
					else return err( 4001, k );
					if( !( t0 = data.BSdomE ) ) data.BSdomE = t0 = bs.ev.dom(d);
					g = ( t1 = k.indexOf(':') ) > -1 ? ( k = k.substring( 0, t1 ), k.substr( t1 + 1 ) ) : '';
					if( v ) v.splice ? ( m = v[1], a = v, c = v[0] || d ) : v[k] ? ( m = v[k], c = v ) : ( m = v, c = d );
					if( t1 = ev[k] ){
						if( typeof t1 == 'function' ) return t1( t0, k, g, c, m, a );
						k = t1;
					}
					v ? t0.on( k, g, c, m, a ) : t0.off( k, g );
				},
				scroll:(function( W, doc, root, docEl ){
					return function scroll(){
						switch( arguments[0] ){
						case'w': return Math.max( root.scrollWidth, root.clientWidth );
						case'h': return Math.max( root.scrollHeight, root.clientHeight );
						case'l': return docEl.scrollLeft || W.pageXOffset || 0;
						case't': return docEl.scrollTop || W.pageYOffset || 0;
						}
						W.scrollTo( arguments[0], arguments[1] );
					};
				})( W, doc, detect.root, doc.documentElement )
			},
			win.sizer = (function( W, doc ){
				var t0 = {w:0, h:0}, t1, size, docEl, docBody;
				size = W['innerHeight'] === undefined ? (
					docEl = doc.documentElement, docBody = doc.body, t1 = {w:'clientWidth', h:'clientHeight'}, t1.width = t1.w, t1.height = t1.h,
					function(k){return k = t1[k] ? docEl[k] || docBody[k] : ( t0.w = docEl[t1.w] || docBody[t1.w], t0.h = docEl[t1.h] || docBody[t1.h], t0 );}
				) : ( t1 = {w:'innerWidth', h:'innerHeight'}, t1.width = t1.w, t1.height = t1.h,
					function(k){return k = t1[k] ? W[k] : ( t0.w = W[t1.w], t0.h = W[t1.h], t0 );}
				);
				return function(end){
					var f = function(){size(), end( t0.w, t0.h );};
					win.on( 'resize', f );
					if( 'onorientationchange' in W ) win.on( 'orientationchange', f );
					f();
				};
			})( W, doc );
			return win;
		})() ),
		bs.cls( 'Style', function( fn, clsfn, bs ){
			var r = /-[a-z]/g, re = function(_0){return _0.charAt(1).toUpperCase();},
			b = doc.body.style, pf = detect.stylePrefix, key, conf = {nopx:{}, key:{}, val:{}}, nopx = conf.nopx, keys = conf.key, vals = conf.val, t0;
			clsfn.keys = keys,
			clsfn.fn = function( type, key, val ){
				conf[type][key] = val;
				if( type == 'key' ) attrs[key] = 1;
			},
			clsfn.key = key = function(k){
				var t0 = k.replace( r, re );
				return t0 in b || ( t0 = pf + t0.charAt(0).toUpperCase() + t0.substr(1) ) in b ? ( attrs[k] = 1, keys[k] = t0 ) : 0;
			},
			fn.NEW = function(){this.u = {};},
			fn.S = function( s, arg, i ){
				var t0, t1, u = this.u, k, v, j = arg.length;
				while( i < j ){
					k = arg[i++], v = arg[i++];
					if( t0 = keys[k] ){
						if( typeof t0 == 'function' ){
							t0( this, s, v );
							continue;
						}else k = t0;
					}else if( !( k = key(k) ) ) continue;
					if( v || v === 0 ){
						if( t0 = typeof v == 'string' ) if( t1 = vals[v.substr(0,4)] ) v = t1(v);
						if( u[k] === undefined ) u[k] = t0 ? ( t0 = v.indexOf( ':' ) ) == -1 ? '' : ( t1 = v.substr( t0 + 1 ), v = parseFloat( v.substr( 0, t0 ) ), t1 ) : nopx[k] ? '' : 'px';
						s[k] = ( this[k] = v ) + u[k];
					}else if( v === null ) delete this[k], delete u[k], s[k] = '';
					else v = this[k];
				}
				return v;
			},
			mk = function( s, k, v ){
				if( k = keys[k] ){if( typeof k == 'function' ) return k( this, s, v );}else if( !( k = key(k) ) ) return 0;
				return '@r@';
			},
			t0 = {keys:keys, key:key},
			fn.g = comp( mk, {r:'this[k]'}, t0 ), fn.s = comp( mk, {r:'s[k] = ( this[k] = v ) + u[k], v'}, t0 );
		} ),
		bs.cls( 'Css', function( fn, clsfn, bs ){
			var sheet = doc.createElement('style'), rule, ruleSet, ruleKey, idx, add, del;
			doc.getElementsByTagName('head')[0].appendChild(sheet),
			sheet = sheet.styleSheet || sheet.sheet, ruleSet = sheet.cssRules || sheet.rules,
			ruleKey = {
				'keyframes':(function(){
					var i = W['CSSRule'], j = 'keyframes';
					return i ? i.WEBKIT_KEYFRAME_RULE ? '-webkit-' + j : i.MOZ_KEYFRAME_RULE ? '-moz-' + j : i.KEYFRAME_RULE ? j : 0 : 0;
				})()
			},
			idx = function(rule){
				var i, j, k, l;
				for( i = 0, j = ruleSet.length, k = parseInt( j * .5 ) + 1, j-- ; i < k ; i++ ) if( ruleSet[l = i] === rule || ruleSet[l = j - i] === rule ) return l;
			},
			add = sheet.insertRule ? function( k, v ){return sheet.insertRule( k + ( v ? '{' + v + '}' : '{}' ), ruleSet.length ), ruleSet[ruleSet.length - 1];} :
				function( k, v ){return sheet.addRule( k, v||' ' ), ruleSet[ruleSet.length - 1];};
			del = sheet.deleteRule ? function(v){sheet.deleteRule(idx(v));} : function(v){sheet.removeRule(idx(v));};
			rule = function(rule){this.r = rule, this.s = new style(rule);},
			fn.NEW = function(key){
				var t0, v;
				if( key.indexOf('@') > -1 ){
					t0 = key.split('@');
					if( t0[0] == 'font-face' ){
						v = t0[1].split(' '), v = 'font-family:'+v[0]+";src:url('"+v[1]+".eot');src:"+
							"url('"+v[1]+".eot?#iefix') format('embedded-opentype'),url('"+v[1]+".woff') format('woff'),"+
							"url('"+v[1]+".ttf') format('truetype'),url('"+v[1]+".svg') format('svg');",
						this.type = 5;
						doc.getElementsByTagName('head')[0].appendChild( t0 = doc.createElement('style') ),
						( t0.styleSheet || t0.sheet ).cssText = '@font-face{' + v + '}';
						return;
					}else if( t0[0] == 'keyframes' ){
						if( !ruleKey[t0[0]] ) return this.type = -1;
						else t0 = '@' + ruleKey[t0[0]] + ' ' + t0[1], this.type = 7;
					}
				}else t0 = key, this.type = 1;
				this.r = add( t0, v ), this.style = this.r.style;
				if( this.type == 1 ) this.s = bs.Style();
			},
			fn.S = function(){
				var type, t0, t1;
				t0 = arguments[0], type = this.type;
				if( t0 === null ) return del( type < 0 ? 0 : this.END(), this.r );
				else if( type == 1 ) return this.s.S( this.style, arguments, 0 );
				else if( type == 7 ){
					if( !this[t0] ){
						if( this.r.appendRule ) this.r.appendRule( t0 + '{}' );
						else this.r.insertRule( t0 + '{}' );
						t1 = this.r.cssRules[this.r.cssRules.length - 1], this[t0] = {r:t1, s:new style(), style:t1.style};
					}
					arguments[1] == null ? this[t0].s.init() : this[t0].s.S( this[t0].style, arguments, 1 );
				}
				return this;
			}
		} ),
		bs.cls( 'Dom', function( fn, clsfn, bs ){
			var ev = bs.ev, del, dom, domData, first = {};
			clsfn.data = domData = (function(){
				var id = 1, data = {}, t0 = doc.createElement('div');
				t0.innerHTML = '<div data-test-aaa="3"></div>';
				return t0.childNodes[0].dataset && t0.childNodes[0].dataset.testAaa == "3" ? function( el, k, v ){
					var t0 = el.dataset.bs || ( data[id] = {}, el.dataset.bs = id++ );
					return k == undefined ? data[t0] : k == null ? ( delete data[el.dataset.bs], delete el.dataset.bs ) : v == undefined ? data[t0][k] : v === null ? delete data[t0][k] : ( data[t0][k] = v );
				}: function( el, k, v ){
					var t0 = el.getAttribute('data-bs') || ( data[id] = {}, el.setAttribute('data-bs', id ), id++ );
					return k == undefined ? data[t0] : k == null ? ( delete data[el.getAttribute('data-bs')], el.removeAttribute('data-bs') ) : v == undefined ? data[t0][k] : v === null ? delete data[t0][k] : ( data[t0][k] = v );
				};
			})(),
			clsfn.fn = function( type, k, v ){
				if( type == 'key' ) attrs[k] = attrs[k] ? err( 2300, k ) : v;
				else if( type == 'first' ) first[k] = first[k] ? err( 2301, k ) : v;
			},
			clsfn.del = del = (function( domData, ev ){
				var m = {'object':1, 'function':1};
				return function(target){
					var data, t0, t1, i = target.length, j, k;
					while( i-- ){
						t0 = target[i], t0.parentNode.removeChild(t0);
						if( t0.nodeType == 3 ) continue;
						if( data = t0.getAttribute('data-bs') ){
							if( t1 = data.BSdomE ) data.BSdomE = null, ev(t1);
							domData( t0, null );
						}
						j = t0.attributes.length;
						while( j-- ) m[typeof t0.getAttribute( k = t0.attributes[j].nodeName )] ? t0.removeAttribute(k) : 0;
					}
					if( target.END ) target.END();
				};
			})( domData, ev ),
			clsfn.html = (function(doc){
				var div = doc.createElement('div'), tbody = doc.createElement('tbody'), tags = {
					tr:[1, '<table><tbody>', '</tbody></table>'], th:[2, '<table><tbody><tr>', '</tr></tbody></table>'],
					col:[1, '<table><tbody></tbody><colgroup>', '</colgroup></table>'], option:[0, '<select>', '</select>']
				}, t0, i;
				tags.td = tags.th, tags.optgroup = tags.option,
				t0 = 'thead,tfoot,tbody,caption,colgroup'.split(','), i = t0.length;
				while( i-- ) tags[t0[i]] = [0,'<table>','</table>'];
				return function( str, target, mode ){
					var t0, t1, t2, t3, i, j, n0, n1, n2, parent, tbodyStr;
					str += '',
					tbodyStr = str.toLowerCase().indexOf('tbody') > -1 ? true : false,
					t0 = str.replace( trim, '' ), n0 = t0.indexOf(' '), n1 = t0.indexOf('>'), n2 = t0.indexOf('/'),
					t1 = ( n0 != -1 && n0 < n1 ) ? t0.substring( 1, n0 ) : ( n2 != -1 && n2 < n1 ) ? t0.substring( 1, n2 ) : t0.substring( 1, n1 ),
					t1 = t1.toLowerCase();
					if( mode == 'html' && target.nodeName.toLowerCase() == 'table' && t1 == 'tr' ) tbodyStr = true, t1 = 'tbody';
					if( mode == '>' || 'html+' && t1 == 'tr' && target ) target = target.getElementsByTagName('tbody')[0] || ( target.appendChild(tbody), target.getElementsByTagName('tbody')[0] );
					if( tags[t1] ){
						if( div.innerHTML ) del(div.childNodes);
						div.innerHTML = tags[t1][1] + str + tags[t1][2], t2 = div.childNodes[0];
						if( tags[t1][0] ) for( i = 0 ; i < tags[t1][0] ; i++ ) t2 = t2.childNodes[0];
						parent = t2;
					}else div.innerHTML = str, parent = div;
					i = parent.childNodes.length;
					if( !target ) return parent.childNodes;
					else if( mode == 'html' ){
						if( target.innerHTML ) del(target.childNodes);
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
			clsfn.query = (function( doc, trim ){
				var compare = {
					'#':function(el, token){return token.substr(1) == el.id;},
					'.':function(el, token){
						var t0, k;
						return !( t0 = el.className ) ? 0 : ( k = token.substr(1), t0.indexOf(' ') > -1 ? k == t0 : t0.split(' ').indexOf(k) > -1 );
					},
					'[':(function(){
						var mT0 = {'~':1, '|':1, '!':1, '^':1, '$':1, '*':1};
						return function(el, token){
							var t0, t1, i, v;
							if( ( i = token.indexOf('=') ) == -1 ) return el.getAttribute(token.substr(1)) === null ? 0 : 1;
							if( ( t0 = el.getAttribute( token.substring( 1, i - ( mT0[t1 = token.charAt( i - 1 )] ? 1 : 0 ) ) ) ) === null ) return;
							v = token.substr( i + 1 );
							switch( t1 ){
							case'~':return t0.split(' ').indexOf(v) > -1;
							case'|':return t0.split('-').indexOf(v) > -1;
							case'^':return t0.indexOf(v) == 0;
							case'$':return t0.lastIndexOf(v) == ( t0.length - v.length );
							case'*':return t0.indexOf(v) > -1;
							case'!':return t0 !== v;
							default:return t0 === v;
							}
						};
					})(),
					':':(function( trim, domData ){
						var mTag = {'first-of-type':1, 'last-of-type':1, 'only-of-type':1},
						nChild = {'first-child':'firstElementChild', 'last-child':'lastElementChild'},
						enabled = {INPUT:1, BUTTON:1, SELECT:1, OPTION:1, TEXTAREA:1},
						checked = {INPUT:1, radio:1, checkbox:1, OPTION:2},
						skip ={'target':1, 'active':1, 'visited':1, 'first-line':1, 'first-letter':1, 'hover':1, 'focus':1, 'after':1, 'before':1, 'selection':1,
							'eq':1, 'gt':1, 'lt':1,
							'valid':1, 'invalid':1, 'optional':1, 'in-range':1, 'out-of-range':1, 'read-only':1, 'read-write':1, 'required':1
						};
						return function filters(el, token){
							var parent, childs, tag, dir, t0, t1, t2, k, v, i, j, m, dd, tname, ename, lname;
							k = token.substr(1), i = k.indexOf('('), v = i > -1 ? isNaN( t0 = k.substr( i + 1 ) ) ? t0.replace( trim, '' ) : parseFloat(t0) : null;
							if( v ) k = k.substring( 0, i );
							if( skip[k] ) return;
							switch( k ){
							case'link':return el.tagName == 'A' && el.getAttribute('href');
							case'root':return el.tagName == 'HTML';
							case'lang':return el.getAttribute('lang') == v;
							case'empty':return el.nodeType == 1 && !el.nodeValue && !el.childNodes.length;
							case'checked':return t0 = checked[el.tagName], ( t0 == 1 && el.checked && checked[el.getAttribute('type')] ) || ( t0 == 2 && el.selected );
							case'enabled':return enabled[el.tagName] && ( ( t0 = el.getAttribute('disabled') ) == null || t0 == '' );
							case'disabled':return enabled[el.tagName] && ( ( t0 = el.getAttribute('disabled') ) != null && t0 != '' );
							case'contains':return ( el.innerText || el.textContent || '' ).indexOf(v) > -1;
							case'not':
								switch( v.charAt(0) ){
								case'#':return v.substr(1) != el.id;
								case'.':return !( !( t0 = el.className ) ? 0 : ( t1 = v.substr(1), t0.indexOf(' ') < 0 ? t1 == t0 : t0.split(' ').indexOf(t1) > -1 ) );
								default:return v != el.tagName && v != '*';
								}
								return 0;
							case'first-child':case'first-of-type':dir = 1;case'last-child':case'last-of-type':
								if( isElCld && ( t1 = nChild[k] ) ) return el.parentNode[t1] == el;
								dd = domData( parent = el.parentNode ), tag = el.tagName;
								(t1 = mTag[k]) ? dir ? ( tname = 'DQseqFCT', ename = 'DQFCTEl' ) : ( tname = 'DQseqLCT', ename = 'DQLCTEl' ):
									dir ? ( tname = 'DQseqFC', ename = 'DQFCEl' ) : ( tname = 'DQseqLC', ename = 'DQLCEl' );
								if( !dd[tname] || dd[tname] != ( t1 ? tag : '' ) + bsRseq ){
									if( ( childs = isElCld ? parent.children : parent.childNodes ) && ( i = j = childs.length ) ){
										m = 0;
										while( i-- ){
											t0 = childs[dir ? j - i - 1 : i];
											if( ( isElCld ? 1 : t0.nodeType == 1 ) && ( t1 ? tag == t0.tagName : 1 ) && !m++ ){
												dd[tname] = ( t1 ? tag : '' ) + bsRseq,
												dd[ename] = t0;break;
											}
										}
									}
								}
								return dd[ename] == el;
							case'only-of-type':case'only-child':
								if( isElCld && k == 'only-child' ) return el.parentNode.children.length == 1;
								dd = domData( parent = el.parentNode ),
								t1 = mTag[k], tag = el.tagName;
								k == 'only-of-type' ? ( tname = 'DQseqOT', lname = 'DQTChElLen' ) : ( tname = 'DQseqOCH', lname = 'DQChElLen' );
								if( !dd[tname] || dd[tname] != ( t1 ? tag : '' ) + bsRseq ){
									if( ( childs = isElCld ? parent.children : parent.childNodes ) && ( i = childs.length ) ){
										m = 0;
										while( i-- ){
											t0 = childs[i];
											if( ( isElCld ? 1 : t0.nodeType == 1 ) && ( t1 ? tag == t0.tagName : 1 ) && !m++ );
										}
										dd[tname] = ( t1 ? tag : '' ) + bsRseq,
										dd[lname] = m;
									}
								}
								return dd[lname] == 1;
							default:
								if( !( parent = el.parentNode ) || parent.tagName == 'HTML' || !( childs = isElCld ? parent.children : parent.childNodes ) || !( j = i = childs.length ) ) return;
								if( v == 'n' ) return 1;
								t1 = 1, dd = domData(el);
								switch( k ){
								case'nth-child':
									if( !dd.DQseq || dd.DQseq != bsRseq ) for( i = 0; i < j; i++ ){
										t0 = childs[i];
										if( isElCld ? 1 : t0.nodeType == 1 ){
											( t2 = domData(t0) ).DQseq = bsRseq,
											t2.DQindex = t1++;
										}
									}
									return t0 = dd.DQindex, v == 'even' || v == '2n' ? t0 % 2 == 0 :
									v == 'odd' || v == '2n+1' ? t0 % 2 == 1 :
									t0 == v;
								case'nth-last-child':
									if( !dd.DQseqL || dd.DQseqL != bsRseq ) while( i-- ){
										t0 = childs[i];
										if( isElCld ? 1 : t0.nodeType == 1 ){
											( t2 = domData(t0) ).DQseqL = bsRseq,
											t2.DQindexL = t1++;
										}
									}
									return t0 = dd.DQindexL, v == 'even' || v == '2n' ? t0 % 2 == 0 :
									v == 'odd' || v == '2n+1' ? t0 % 2 == 1 :
									t0 == v;
								case'nth-of-type':
									tag = el.tagName;
									if( !dd.DQseqT || dd.DQseqT != tag + bsRseq ) for( i = 0 ; i < j ; i++ ){
										t0 = childs[i];
										if( ( isElCld ? 1 : t0.nodeType == 1 ) && t0.tagName == tag ){
											( t2 = domData(t0) ).DQseqT = tag + bsRseq,
											t2.DQindexT = t1++;
										}
									}
									return t0 = dd.DQindexT, v == 'even' || v == '2n' ? t0 % 2 == 0 :
									v == 'odd' || v == '2n+1' ? t0 % 2 == 1 :
									t0 == v;
								case'nth-last-of-type':
									tag = el.tagName;
									if( !dd.DQseqTL || dd.DQseqTL != tag + bsRseq ) while( i-- ){
										t0 = childs[i];
										if( ( isElCld ? 1 : t0.nodeType == 1 ) && t0.tagName == tag ){
											( t2 = domData(t0) ).DQseqTL = tag + bsRseq,
											t2.DQindexTL = t1++;
										}
									}
									return t0 = dd.DQindexTL, v == 'even' || v == '2n' ? t0 % 2 == 0 :
									v == 'odd' || v == '2n+1' ? t0 % 2 == 1 :
									t0 == v;
								}
							}
						};
					})( trim, domData )
				},
				rTag = /^[a-z]+[0-9]*$/i, rAlpha = /[a-z]/i, rClsTagId = /^[.#]?[a-z0-9]+$/i,
				DOC = document, tagName = {}, clsName = {},
				className = (function( tagName, clsName ){
					var reg = {}, r = [];
					return DOC['getElementsByClassName'] ? function(cls){return clsName[cls] || ( clsName[cls] = DOC.getElementsByClassName(cls) );} : 
					function(cls){
						var t0 = tagName['*'] || ( tagName['*'] = DOC.getElementsByTagName('*') ), t1 = reg[cls] || ( reg[cls] = new RegExp( '\\b' + cls + '\\b', 'g' ) ), i = t0.length;
						r.length = 0;
						while( i-- ) if( t1.test( t0[i].className ) ) r[r.length] = t0[i];
						return r;
					};
				})( tagName, clsName ),
				bsRseq = 0, navi, aPsibl = ['previousSibling', 'previousElementSibling'], tEl = DOC.createElement('ul'), isElCld, isQSA,
				chrome = ( navi = window['navigator'].userAgent.toLowerCase() ).indexOf('chrome') > -1 || navi.indexOf('crios') ? 1 : 0,
				mQSA = {' ':1,'+':1,'~':1,':':1,'[':1},
				mParent = {' ':1, '>':1}, mBracket = {'[':1, '(':1, ']':2, ')':2},
				mEx = {' ':1, '*':1, ']':1, '>':1, '+':1, '~':1, '^':1, '$':1},
				mT0 = {' ':1, '*':2, '>':2, '+':2, '~':2, '#':3, '.':3, ':':3, '[':3}, mT1 = {'>':1, '+':1, '~':1},
				R = [], arrs = {_l:0};
				tEl.innerHTML = '<li>1</li>',
				isElCld = tEl['firstElementChild'] && tEl['lastElementChild'] && tEl['children'] ? 1 : 0,
				isQSA = isElCld && DOC['querySelectorAll'] ? 1 : 0;
				return function selector( query, doc, r ){
					var sels, sel, hasParent, hasQSAErr, hasQS, el, els, hit, token, tokens, t0, t1, t2, t3, i, j, k, l, m, n;
					if( !r ) r = R;
					r.length = 0, doc ? ( DOC = doc ) : ( doc = DOC );
					if( rClsTagId.test(query) ) switch( query.charAt(0) ){
						case'#':return r[r.length] = doc.getElementById(query.substr(1)), r;
						case'.':return className(query.substr(1));
						default:return tagName[query] || ( tagName[query] = doc.getElementsByTagName(query) );
					}
					if( chrome && isQSA && ( t0 = query.toLowerCase() ).indexOf(':contains') < 0 && t0.indexOf('!') < 0 ) return doc.querySelectorAll(query);
					if( isQSA && ( i = query.indexOf(',') ) > -1 && query.indexOf('!') < 0 ) return doc.querySelectorAll(query);
					if( i == -1 ) sels = arrs._l ? arrs[--arrs._l] : [], sels[0] = query, i = 1;
					else sels = query.split(','), i = sels.length;
					while( i-- ){
						t0 = arrs._l ? arrs[--arrs._l] : [], t1 = '', sel = sels[i].replace( trim, '' ), m = 0, j = sel.length;
						while( j-- ){
							k = sel.charAt(j);
							if( hasParent || mParent[k] ) hasParent = 1;
							if( m == 2 && k == '!' ) hasQSAErr = 1;
							if( ( t2 = mBracket[k] ) && ( m = t2 ) == 2 ) continue;
							if( !( t2 = mEx[k] ) ) t1 = k + t1;
							if( t2 && m == 2 ) t1 = k + t1;
							else if( ( t2 = mT0[k] ) == 1 ){
								if( ( t3 = t0[t0.length - 1] ) == ' ' ) continue;
								if( t1 ) t0[t0.length] = t1, t1 = '';
								if( !mT1[t3] ) t0[t0.length] = k;
							}else if( t2 == 2 ){
								if( t1.replace( trim, '' ) ) t0[t0.length] = t1, t1 = '';
								if( t0[t0.length - 1] == ' ' ) t0.pop();
								t0[t0.length] = k;
							}else if( t2 == 3 || !j ){
								if( t1 && m < 2 ) t0[t0.length] = t1, t1 = '';
							}else if( sel.charAt( j - 1 ) == ' ' ) t0[t0.length] = t1, t1 = '';
						}
						j = t0.length;
						while( j-- ){
							if( rTag.test(t0[j]) ) t0[j] = t0[j].toUpperCase();
							else if( t0[j].charAt(0) == ':' ){
								if( !( t1 = t0[j] ).toLowerCase().indexOf( ':contains(' ) ){
									hasQSAErr = 1; continue;
								}else{
									t0[j] = t1;
									if( ( t1 == ':nth-child(n' || t1 == ':nth-last-child(n' ) && t0.length != 1 ){
										hasQSAErr = 1, t0.splice( j, 1 ); continue;
									}
								}
							}
							if( isQSA && !hasQS && !mQSA[t0[j].charAt(0)] ) hasQS = 1;
						}
						sels[i] = t0;
					}
					if( hasQSAErr ) hasQS = 0;
					if( sels.length == 1 ){
						t0 = sels[0][0];
						if( ( k = t0.charAt(0) ) == '#' ) els = arrs._l ? arrs[--arrs._l] : [], els[0] = doc.getElementById(t0.substr(1)), sels[0].shift();
						else if( k == '.' ){
							els = className(t0.substr(1)), sels[0].shift();
							if( hasQS && els.length > 100 ) return doc.querySelectorAll(query);
						}else if( k == '[' || k == ':' ){
							if( hasQS ) return doc.querySelectorAll(query);
							if( !hasParent ){
								t0 = sels[0][sels[0].length - 1], k = t0.charAt(0);
								if( k == '#' ) sels[0].pop(), els = arrs._l ? arrs[--arrs._l] : [], els[0] = doc.getElementById( t0.substr(1) );
								else if( k == '.' ) sels[0].pop(), els = className( t0.substr(1) );
								else if( rTag.test(t0) ) sels[0].pop(), els = tagName[t0] || ( tagName[t0] = doc.getElementsByTagName(t0) );
							}
						}else if( rTag.test(t0) ){
							sels[0].shift(), els = tagName[t0] || ( tagName[t0] = doc.getElementsByTagName(t0) );
							if( hasQS && els.length > 100 ) return doc.querySelectorAll(query);
						}
					}
					if( !els ) els = tagName['*'] || ( tagName['*'] = doc.getElementsByTagName('*') );
					if( !sels[0].length ) return arrs[arrs._l++] = sels[0], sels.length = 0, arrs[arrs._l++] = sels, els;
					bsRseq++;
					for( i = 0, j = els.length; i < j; i++ ){
						l = sels.length;
						while( l-- ){
							el = els[i];
							for( tokens = sels[l], m = 0, n = tokens.length; m < n; m++ ){
								token = tokens[m], hit = 0;
								if( ( k = token.charAt(0) ) == ' ' ){
									m++;
									while( el = el.parentNode )
										if( hit = ( ( t0 = compare[tokens[m].charAt(0)] ) ? t0( el, tokens[m] ) : ( tokens[m] == el.tagName || tokens[m] == '*' ) ) ) break;
								}else if( k == '>' )
									hit = ( ( t0 = compare[tokens[++m].charAt(0)] ) ? t0( el = el.parentNode, tokens[m] ) :
									( tokens[m] == ( el = el.parentNode ).tagName || tokens[m] == '*' ) );
								else if( k == '+' ){
									while( el = el[ aPsibl[isElCld] ] ) if( ( isElCld ? 1 : el.nodeType == 1 ) ) break;
									hit = el && ( ( t0 = compare[tokens[++m].charAt(0)] ) ? t0( el, tokens[m] ) : ( tokens[m] == el.tagName || tokens[m] == '*' ) );
								}else if( k == '~' ){
									m++;
									while( el = el[aPsibl[isElCld]] ){
										if( ( isElCld ? 1 : el.nodeType == 1 ) && ( ( t0 = compare[tokens[m].charAt(0)] ) ? t0( el, tokens[m] ) : ( tokens[m] == el.tagName || tokens[m] == '*' ) ) ){
											hit = 1; break;
										}
									}
								}else hit = ( ( t0 = compare[token.charAt(0)] ) ? t0( el, token ) : ( token == el.tagName || token == '*' ) );
								if( !hit ) break;
							}
							if( i == j - 1 ) tokens.length = 0, arrs[arrs._l++] = tokens;
							if( hit ) break;
						}
						if( i == j - 1 ) sels.length = 0, arrs[arrs._l++] = sels;
						if( hit ) r[r.length] = els[i];
					}
					return r;
				};
			})( doc, trim ),
			clsfn.dom = dom = (function( query, html ){
				var n = {length:0}, dom = function( sel ){
					return typeof sel == 'string' ? sel.charAt(0) == '<' ? html(sel) : query(sel) : 
						sel['nodeType'] == 1 ? ( n[0] = sel, n.length = 1, n ) : 
						sel['instanceOf'] == bs.Dom || sel.length ? sel : null;
				};
				return dom;
			})( clsfn.query, clsfn.html );
			fn.NEW = function(key){
				var t0 = dom(key), i = this.length = t0.length;
				if( t0['instanceOf'] == bs.Dom ) return t0;
				while( i-- ) this[i] = t0[i];
			},
			fn.S = comp( function(){
				var ktype = ktypes._l ? ktypes[--ktypes._l] : [], d, data, target, type, t0, t1, t2, l, i0, i, j, k, v, k0, v0, m, a, g;
				if( arguments[0] === null ) return del(this);
				typeof ( i = arguments[0] ) == 'number' ? ( i0 = l = 1, target = d = this[i], data = this[i + 'data'] || ( this[i + 'data'] = domData(target) ) ) : ( l = this.length, i0 = 0 ),
				j = arguments.length, ktype.length = 0;
				while( l-- ){
					if( !target ) d = this[l], data = this[l + 'data'] || ( this[l + 'data'] = domData(d) );
					i = i0, arg.length = 0;
					while( i < j ){
						k = arguments[i];
						if( !( type = ktype[i] ) ) type = ktype[i] = attrs[k] || first[k.charAt(0)] || ( 'on' + k in d ? attrs[k] = 2 : k.indexOf(':') > -1 ? 2 : 1 );
						if( ++i == j ) return '@pool@', arg.length ? '@sSet@' : 0, type == 1 ? '@sGet@' : type == 2 ? 0 : type == 3 ? this : '@tGet@';
						v = arguments[i++];
						if( type == 2 ){
							if( !( t0 = data.BSdomE ) ) data.BSdomE = t0 = ev(d);
							if( k == 'event' ) for( i in v ) t0.on( k, '', v, v[i] );
							else g = ( t1 = k.indexOf(':') ) > -1 ? ( k = k.substring( 0, t1 ), k.substr( t1 + 1 ) ) : '',
								v ? t0.on( k, g, v.splice ? ( m = v[1], a = v, v[0] || d ) : v[k] ? ( m = v[k], v ) : ( m = v, d ), m, a ) : t0.off( k, g );
						}else{
							if( ( t0 = typeof v ) == 'function' ) v = v( type == 1 ? '@sGet@' : '@tGet@' );
							else if( t0 == 'string' && v.charAt(0) == '{' && exop[v.charAt(1)] && v.charAt( t1 = v.length - 1 ) == '}' ){
								v0 = type == 1 ? '@sGet@' : '@tGet@',
								v = ( k0 = v.charAt(1) ) == '=' ? v0 : (
									v0 = parseFloat(v0), v = parseFloat(v.substring( 2, t1 )),
									k0 == '+' ? v0 + v : k0 == '-' ? v0 - v : k0 == '*' ? v0 * v : k0 == '/' ? v0 / v : 0
								);
							}
							v =  type == 1 ? ( arg[arg.length++] = k, arg[arg.length++] = v ) : type( d, k, v );
						}
					}
					'@sSet@';
				}
				return '@pool@', v;
			}, {
				sGet:'data.BSdomS ? data.BSdomS.g( d.style, k ) : d.style[style[k]]', tGet:'type( d, k )',
				sSet:'arg.length ? ( data.BSdomS || ( data.BSdomS = bs.Style() ) ).S( d.style, arg, 0 ) : 0',
				pool:'ktypes[ktypes._l++] = ktype'
			}, {ev:bs.ev.dom, domData:domData, style:bs.Style.keys, attrs:attrs, first:first, ktypes:{_l:0}, arg:{length:0}, del:del, exop:{'+':1,'-':1,'*':1,'/':1,'=':1} } );
		} ),
		fn( 'css', (function(trim){
			var r = /^[0-9.-]+$/, parser = function(data){
				var t0, t1, t2, t3, c, i, j, k, v, m, sel, val;
				t2 = [], t0 = data.split('}');
				for( i = 0, j = t0.length ; i < j ; i++ ){
					if( t0[i].replace( trim, '' ) ){
						t1 = t0[i], sel = t1.substring( 0, m = t1.indexOf('{') ).replace( trim, '' ), val = t1.substr( m + 1 );
						if( sel.indexOf('@') == -1 ){
							c = bs.Css(sel), t1 = val.split(';'), k = t1.length, t2.length = 0;
							while( k-- ) t3 = t1[k], t2[t2.length] = t3.substring( 0, m = t3.indexOf(':') ).replace( trim, '' ), t2[t2.length] = r.test( v = t3.substr( m + 1 ).replace( trim, '') ) ? parseFloat(v) : v;
							c.S.apply( c, t2 );
						}else if( sel.substr( 0, 9 ) == 'font-face' ) bs.Css( sel + ' ' + val.replace( trim, '' ) );
					}
				}
			}
			return function(v){v.substr( v.length - 4 ) == '.css' ? bs.get( parser, v ) : parser(v);};
		})(trim) ),
		(function(){
			var downed = bs.KEY.downed, code2name = bs.KEY.code2name;
			bs.WIN.on( 'keydown', function(e){downed[code2name[e.keyCode]] = 1;}),
			bs.WIN.on( 'keyup', function(e){downed[code2name[e.keyCode]] = 0;});
		})();
	},
	ANIMATE = function(){
		var ani, time, timer, start, end, ltype, loop, ease, ex, tweenS, tweenANI, isLive, isPause, tween, ANI, mk0, mk1, i, pool = {length:0};
		ani = [], time = 0, timer = 'equestAnimationFrame';
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
		},
		ease = {},
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
		tweenS = function( tw, arg ){
			var t0, t1, l, i, j, k, v, v0, v1;
			tw.t = t0 = '@target@',
			tw.bezier = tw.circle = tw.delay = tw.stop = tw.yoyo = tw.pause = 0, tw.group = tw.end = tw.update = null, tw.ease = ease.linear,
			tw.time = 1000, tw.timeR = .001, tw.loop = tw.loopC = 1, tw.length = l = t0.length || 1;
			while(l--) tw[l] ? tw[l].length = 0 : tw[l] = [], tw[l][0] = '@targetAni0@', tw[l][1] = '@targetAni1@';
			i = 1, j = arg.length;
			while( i < j ){
				k = arg[i++], v = arg[i++];
				if( tween[k] ){
					k == 'time' ? ( tw.time = parseInt( v * 1000 ), tw.timeR = 1 / tw.time ) :
					k == 'ease' ? tw.ease = ease[v] :
					k == 'id' || k == 'end' || k == 'update' ? tw[k] = v :
					k == 'loop' ? tw.loop = tw.loopC = v :
					k == 'delay' ? tw.delay = parseInt( v * 1000 ) :
					k == 'group' || k == 'yoyo' || k == 'bezier' || k == 'circle' ? tw[k] = v : 0
				}else{
					l = tw.length;
					while( l-- ){
						t0 = tw[l], t0[t0.length] = '@key@', v0 = '@from@';
						if( typeof v == 'string' && v.indexOf(',') > -1 ) v = v.split(','), t0[t0.length] = v1 = ex( v[0], v0 ), t0[t0.length] = ex( v[1], v0 ) - v1;
						else t0[t0.length] = v0, t0[t0.length] = ex( v, v0 ) - v0;
						t0[t0.length] = '@option@';
					}
				}
			}
			tw.keyLen = tw[0].length, tw.etime = ( tw.stime = Date.now() + tw.delay ) + tw.time;
			if( t0 = tw.circle ){
				if( i = t0.center ) i = i.split(','), t0.centerX = parseFloat(i[0]), t0.centerY = parseFloat(i[1]);
				if( i = t0.offset ) i = i.split(','), t0.offsetX = parseFloat(i[0]), t0.offsetY = parseFloat(i[1]);
				if( i = t0.angle ) i = i.split(','), t0.angle0 = parseFloat(i[0]), t0.angle1 = parseFloat(i[1]);
				if( i = t0.radius ) i = i.split(','), t0.radius0 = parseFloat(i[0]), t0.radius1 = parseFloat(i[1]);
				t0.angle0 *= toRadian, t0.angle1 *= toRadian, t0.angle2 = t0.angle1 - t0.angle0, t0.radius2 = t0.radius1 - t0.radius0, '@circle@';
			}else if( t0 = tw.bezier ){
				t1 = tw.bezier0 || ( tw.bezier0 = [] ), t1.length = 0;
				for( i  in t0 ){//key, array, rate, val, isFunction
					if( ( l = t0[i].length ) != 3 ) bs.err(1);
					t1.push( '@bezierKey@', t0[i], 1 / t0[i].length, 0, '@bezierOption@' ); 
				}
			}
			return tw.ANI = '@setAni@', tw;
		},
		tweenANI = function( T, pause ){
			var t0, t1, term, time, rate, i, j, l, k, v, e, s, u, 
				circle, ckx, cky, cvx, cvy, 
				bezier, bv0, bv1, bv2, bt, bl, br;
			if( this.stop ) return 1;
			if( pause )
				if( pause == 1 && this.pause == 0 ) return this.pause = T, 0;
				else if( pause == 2 && this.pause ) t0 = T - this.pause, this.stime += t0, this.etime += t0, this.pause = 0;
			if( this.pause || ( term = T - this.stime ) < 0 ) return;
			l = this.length, j = this.keyLen, circle = this.circle, bezier = this.bezier, e = this.ease;
			if( term > ( time = this.time ) ){
				if( bezier ) bt = this.bezier0, bl = bt.length;
				if( --this.loopC ){
					if( this.yoyo ){
						while( l-- ){
							t0 = this[l], i = 2;
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
						t0 = this[l], i = 2, t1 = t0[0], '@aniTarget@';
						while( i < j ) k = t0[i++], v = t0[i++] + e.roll ? 0 : t0[i], i++, '@ani@';
						if( circle ) '@aniCircle@';
						if( bezier ) for( i = 0 ; i < bl ; i += 5 ) k = bt[i], v = bt[i + 2][2], '@aniBezier@';
					}
					if( this.end ) this.end( this.t, 1, T );
					pool[pool.length++] = this;
					return 1;
				}
			}
			rate = term * this.timeR;
			if( circle ) i = e( rate, circle.angle0, circle.angle2, term, time ), j = e( rate, circle.radius0, circle.radius2, term, time ),
				cvx = circle.centerX + circle.offsetX + cos(i) * j, ckx = circle.x, cvy = circle.centerY + circle.offsetY + sin(i) * j, cky = circle.y;
			if( bezier ) bv1 = 2 * ( rate - ( bv0 = rate * rate ) ), bv2 = 1 - 2 * rate + bv0, bt = this.bezier0, bl = bt.length;
			while( l-- ){
				t0 = this[l], i = 2, t1 = t0[0], '@aniTarget@';
				while( i < j ) k = t0[i++], v = e( rate, t0[i++], t0[i++], term, time ), '@ani@';
				if( circle ) '@aniCircle@';
				if( bezier ) for( i = 0 ; i < bl ; i += 5 ) k = bt[i], t1 = bt[i + 1], v = t1[2] * bv0 + t1[1] * bv1 + t1[0] * bv2, '@aniBezier@'
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
				i = ani.length, j = arguments.length;
				while( i-- ){
					t0 = ani[i], k = j;
					while( k-- ) if( t0.id == arguments[k] || t0.t[0] == arguments[k] ) p ?
						( t = Date.now(), ( p == 1 ? t0.ANI( t, 1 ) : p == 2 ? ani[i].ANI( t, 2 ) : ani[i].ANI( t, ani[i].pause ? 2 : 1 ) ) ) :
						( pool[pool.length++] = t0, t0.stop = 1, ani.splice( i, 1 ) );
				}
			}
		},
		ANI = {
			ani:function(v){if(v.ANI) ani[ani.length] = v, start()},
			fn:(function(){
				var keys = 'target,targetAni0,targetAni1,key,from,option,circle,bezierKey,bezierOption,aniTarget,ani,aniCircle,aniBezier'.split(','), keyLen = keys.length, check = function(tmpl){
					var i = keyLen;
					while( i-- ) if( !( keys[i] in tmpl ) ) return 0;
					return 1;
				}, tween = function(){}, opt = {
					ease:ease, tween:tween, ex:ex, tweenANI:tweenANI,
					toRadian:Math.PI/180, cos:bs.cos, sin:bs.sin,
					style:bs.Style.keys, pool:pool
				}, t0 = 'id,time,ease,delay,loop,end,update,yoyo,path,circle,bezier'.split(','), i = t0.length;
				while( i-- ) tween[t0[i]] = 1;
				return function( type, tmpl ){
					if( !check(tmpl) ) return err(1);
					tmpl.setAni = 'tweenANI.' + type, tweenS[type] = comp( tweenS, tmpl, opt ), tweenANI[type] = comp( tweenANI, tmpl, opt ),
					ANI[type] = function(){
						var t0 = ani[ani.length] = pool.length ? pool[--pool.length] : new tween;
						return tweenS[type]( t0, arguments ), start(), t0;
					};
				};
			})(),
			pause:mk0( 1, 1 ), resume:mk0( 0, 2 ), tweenStop:mk1(0), tweenPause:mk1(1), tweenResume:mk1(2), tweenToggle:mk1(3),
			toggle:function(){return isPause ? ANI.resume() : ANI.pause(), isPause;},
			stop:function(){end();},
			ease:function( k, v, isRoll ){v ? ease[k] ? err( 2501, k ) : ease[k] = v : ease[k], v.roll = isRoll;}
		};
		return ANI;
	},
	t0 = setInterval( function(){
		var start, i;
		switch( doc.readyState ){
		case'complete':case'loaded':break;
		case'interactive':if( doc.documentElement.doScroll ) try{doc.documentElement.doScroll('left');}catch(e){return;}
		default:return;
		}
		clearInterval(t0),
		start = function(){
			var t0 = que, i = 0, j = t0.length;
			que = null;
			while( i < j ) t0[i++]();
		},
		bs.obj( 'DETECT', detectDOM( W, detect ) ), DOM(), bs.obj( 'ANI', ANIMATE() ), EXT(), 
		pque.length ? ( i = pque, pque = null, plugin( start, i ) ) : start();
	}, 1 ),
	EXT = function(){
		var fn;
		NETWORK:
		fn = bs.header,
		fn( 'Cache-Control', 'no-cache' ),
		fn( 'Content-Type', function(type){return ( type == 'GET' ? 'text/plain' : 'application/x-www-form-urlencoded' ) + '; charset=UTF-8';} );
		STYLE:
		fn = bs.Style.fn;
		fn( 'nopx', 'opacity', 1 ), fn( 'nopx', 'zIndex', 1 ),
		fn( 'key', 'float', 'styleFloat' in doc.body.style ? 'styleFloat' : 'cssFloat' in doc.body.style ? 'cssFloat' : 'float' );
		if( !( 'opacity' in doc.body.style ) ){
			fn( 'key', 'opacity', function( self, style, v ){
				if( v === undefined ) return self.opacity;
				else if( v === null ) return delete self.opacity, style.filter = '', v;
				else return style.filter = 'alpha(opacity=' + parseInt( v * 100 ) + ')', self.opacity = v;
			} ),
			fn( 'val', 'rgba', function(v){
				var t0 = v.substring( v.indexOf('(') + 1, v.indexOf(')') ).split(',');
				t0[3] = parseFloat(t0[3]);
				return 'rgb('+parseInt((255+t0[0]*t0[3])*.5)+','+parseInt((255+t0[1]*t0[3])*.5)+','+parseInt((255+t0[2]*t0[3])*.5)+')';
			} );
		}
		DOM:
		fn = bs.Dom.fn;
		(function(trim){
			var k, x, y, t = detect.text, nodes = [], ds0 = {}, del = bs.Dom.del, html = bs.Dom.html, dom = bs.Dom.dom, childNodes, ev = bs.ev.dom, t0, t1, t2;
			childNodes = function(n){
				var i, j;
				for( nodes.length = i = 0, j = n.length ; i < j ; i++ ) if( n[i].nodeType == 1 ) nodes[nodes.length] = n[i];
				return nodes;
			};
			for( k in t0 = {
				'event':2,
				'this':3,
				cssObject:function( d, v ){
					var k;
					ds.length = 0;
					for( k in v ) ds[ds.length++] = k, ds[ds.length++] = v[k];
					if( ds.length ) ( d.bsS || ( d.bsS = new style(d.style) ) ).S(ds);
				},
				style:function(d){return d.bsS;},
				isCapture:function(d){return arguments.length == 1 ? d.bsE ? d.bsE.isCapture : 0 : ( d.bsE || ev(d) ).isCapture = arguments[1];},
				x:x = function(d){var i = 0; do i += d.offsetLeft; while( d = d.offsetParent ) return i;},
				y:y = function(d){var i = 0; do i += d.offsetTop; while( d = d.offsetParent ) return i;},
				lx:function(d){return x(d) - x(d.parentNode);},
				ly:function(d){return y(d) - y(d.parentNode);},
				w:function(d){return d.offsetWidth;}, 
				h:function(d){return d.offsetHeight;},
				s:function(d){d.submit();},
				f:function(d){d.focus();},
				b:function(d){d.blur();},
				html:function( d, k, v ){return v === undefined ? d.innerHTML : html( v, d, 'html' );},
				'html+':function( d, k, v ){return html( v, d, 'html+' );},
				'+html':function( d, k, v ){return html( v, d, '+html' );},
				'class':function( d, k, v ){return v === undefined ? d.className : ( d.className = v );},
				'class+':function( d, k, v ){
					var t0;
					return !( t0 = d.className.replace( trim, '' ) ) ? ( d.className = v ) : t0.split(' ').indexOf(v) == -1 ? ( d.className = v + ' ' + t0 ) : t0;
				},
				'class-':function( d, k, v ){
					var t0, i;
					if( !( t0 = bs.trim(d.className) ) ) return t0;
					t0 = t0.split(' '); 
					if( ( i = t0.indexOf(v) ) > -1 ) t0.splice( i, 1 );
					return d.className = t0.join(' ');
				}
			} )if( t0.hasOwnProperty(k) ) fn( 'key', k, t0[k] );
			fn( 'key', 'before', comp( t0 = function( d, k, v ){
				var p, t0, i, j;
				if( v === undefined ) return '@a@';
				if( v === null ) return d.parentNode.removeChild('@a@');
				if( ( p = d.parentNode ) && ( t0 = dom(v) ) && ( j = t0.length ) ) for( '@b@', i = 0 ; i < j ; i++ ) p.insertBefore( t0[i], d );
			}, t1 = {a:'d.previousSibling', b:0}, t2 = {dom:dom} ) ),
			fn( 'key', 'after', comp( t0, ( t1.a = 'd.nextSibling', t1.b = 'd = d.nextSibling', t1 ), t2 ) );
			for( k in t0 = {
				'@':(function(){
					var key = {'value':1, 'checked':1, 'selected':1};
					return function( d, k, v ){
						k = k.substr(1);
						if( v === undefined ) v = d[k] || d.getAttribute(k);
						else if( v === null ){
							d.removeAttribute(k);
							try{delete d[k];}catch(e){};
						}else d[k] = v, key[k] || d.setAttribute( k, v );
						return v;
					};
				})(),
				'*':(function(){
					var r, re;
					return detect.customData ? (
					r = /-[a-zA-Z]/g, re = function(_0){return _0.charAt(1).toUpperCase();},
					function( d, k, v ){
						k = k.substr(1).toLowerCase().replace( r, re );
						if( v === undefined ) v = d.dataset[k];
						else if( v === null ){
							delete d.dataset[k];
						}else d.dataset[k] = v;
						return v;
					} ) : function( d, k, v ){
						k = 'data-' + k.substr(1).toLowerCase();
						if( v === undefined ) v = d.getAttribute(k);
						else if( v === null ){
							d.removeAttribute(k);
						}else d.setAttribute( k, v );
						return v;
					};
				})(),
				'_':( function( view, key ){
					return detect.cstyle ? function( d, k ){return view.getComputedStyle( d, '' ).getPropertyValue(k.substr(1));} :
						function( d, k ){return d.currentStyle[key(k.substr(1))];};
				} )( doc.defaultView, bs.Style.key ),
				'<':function( d, k, v ){
					var t0;
					if( v ){
						if( d.parentNode ) d.parentNode.removeChild(d);
						return t0 = dom(v), t0[0].appendChild(d), t0;
					}else return d.parentNode;
				},
				'>':(function(){
					var r = [];
					return function( d, k, v ){
						var data, t0, t1, i, j, m, n;
						k = k.substr(1);
						if( v ){
							if( k ) return bs.Dom(childNodes(d.childNodes)[k]).S(v);
							else if( d.nodeName.toLowerCase() == 'table' ) return html( v, d, '>' );
							else{
								r.length = 0;
								for( t0 = dom(v), i = 0, j = t0.length ; i < j ; i++ ) d.appendChild( t1 = t0[i].cloneNode(true) ), r.push(t1);
								return r;
							}
						}else if( v === null ){
							if( k ) nodes[0] = childNodes(d.childNodes)[k], nodes.length = 1, del(nodes);
							else if( d.childNodes && childNodes(d.childNodes).length ) del(nodes);
						}else return childNodes(d.childNodes), k ? ( nodes[0] = nodes[k], nodes.length = 1, nodes ) : nodes;
					}
				})()
			} )if( t0.hasOwnProperty(k) ) fn( 'first', k, t0[k] );
		})(trim);
		EVENT:
		fn = bs.ev.dom.fn;
		detect.device =='tablet' || detect.device=='mobile' ?
			( fn( 'down', 'touchstart' ), fn( 'up', 'touchend' ), fn( 'move', 'touchmove' ) ) :
			( fn( 'down', 'mousedown' ), fn( 'up', 'mouseup' ), fn( 'move', 'mousemove' ) );
		fn = bs.WIN.ev;	
		if( !'onorientationchange' in W ) fn( 'orientationchange', 'resize' );
		if( !'onhashchange' in W ) fn( 'hashchange', (function(){
			var id = -1, old;
			return function( e, k, g, c, m, a ){
				var t0, old;
				if( v ){
					e['+']( false, 'hashchange', g, c, m, a, 2 );
					old = location.hash;
					if( id == -1 ) id = setInterval( function(){
						if( old != location.hash ) e.type = 'hashchange', old = location.hash, e['~']( false, 'hashchange' );
					}, 1 );
				}else if( e['-']( false, 'hashchange', g ) == 0 ) clearInterval(id), id = -1;
			};
		})() );
		ANI:
		fn = bs.ANI.ease,
		(function(){
			var PI = Math.PI, HPI = PI * .5;
			//rate,start,term
			fn( 'linear', function(a,c,b){return b*a+c} ),
			fn( 'backIn', function(a,c,b){return b*a*a*(2.70158*a-1.70158)+c} ),
			fn( 'backOut', function(a,c,b){a-=1;return b*(a*a*(2.70158*a+1.70158)+1)+c} ),
			fn( 'backInOut', function(a,c,b){a*=2;if(1>a)return 0.5*b*a*a*(3.5949095*a-2.5949095)+c;a-=2;return 0.5*b*(a*a*(3.70158*a+2.70158)+2)+c} ),
			fn( 'bounceIn', function(a,c,b,d,e){return b-ease[3]((e-d)/e,0,b)+c} ),
			fn( 'bounceOut', function(a,c,b){if(0.363636>a)return 7.5625*b*a*a+c;if(0.727272>a)return a-=0.545454,b*(7.5625*a*a+0.75)+c;if(0.90909>a)return a-=0.818181,b*(7.5625*a*a+0.9375)+c;a-=0.95454;return b*(7.5625*a*a+0.984375)+c} ),
			fn( 'bounceInOut', function(a,c,b,d,e){if(d<0.5*e)return d*=2,0.5*ease[13](d/e,0,b,d,e)+c;d=2*d-e;return 0.5*ease[14](d/e,0,b,d,e)+0.5*b+c} ),
			fn( 'sineIn', function(a,c,b){return -b*Math.cos(a*HPI)+b+c} ),
			fn( 'sineOut', function(a,c,b){return b*Math.sin(a*HPI)+c} ),
			fn( 'sineInOut', function(a,c,b){return 0.5*-b*(Math.cos(PI*a)-1)+c} ),
			fn( 'circleIn', function(a,c,b){return -b*(Math.sqrt(1-a*a)-1)+c} ),
			fn( 'circleOut', function(a,c,b){a-=1;return b*Math.sqrt(1-a*a)+c} ),
			fn( 'circleInOut', function(a,c,b){a*=2;if(1>a)return 0.5*-b*(Math.sqrt(1-a*a)-1)+c;a-=2;return 0.5*b*(Math.sqrt(1-a*a)+1)+c} ),
			fn( 'quadraticIn', function(a,c,b){return b*a*a+c} ),
			fn( 'quadraticOut', function(a,c,b){return -b*a*(a-2)+c} );
		})(),
		bs.ANI.fn( 'style', {
			target:'arg[0].instanceOf == bs.Dom ? arg[0] : bs.Dom(arg[0])',
			targetAni0:'bs.Dom.data(t0[l]).BSdomS', targetAni1:'t0[l].style',
			key:'style[k]', from:'t0[0].g( t0[1], k )', option:'typeof style[k] == "function" ? 1 : 0',
			circle:'t0.x0 = typeof ( t0.x = style[t0.x] ) == "function" ? 1 : 0, t0.y0 = typeof ( t0.y = style[t0.y] ) == "function" ? 1 : 0',
			bezierKey:'style[i]', bezierOption:'typeof style[i] == "function" ? 1 : 0',
			aniTarget:'s = t0[1], u = t1.u', ani:'t0[i++] ? k( t1, s, v ) : s[k] = v + u[k], t1[k] = v',
			aniCircle:'t1[ckx] = cvx, circle.x0 ? ckx( t1, cvx ) : s[ckx] = cvx + u[ckx], t1[cky] = cvy, circle.y0 ? cky( t1, cvy ) : s[cky] = cvy + u[cky]',
			aniBezier:'bt[i + 4] ? k( t1, s, v ) : s[k] = v + u[k], t1[k] = v'
		} );
	};
})();
} )(this);
