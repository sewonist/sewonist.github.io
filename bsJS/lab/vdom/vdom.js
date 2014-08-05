bs( function(){
	
bs.factory( 'v,vdom', (function( bs, doc ){
	var v, e, s;
	function _e(){}
	_e.prototype.toString = function(){
		
	};
	function _p(){}
	_p.prototype.toString = function(){
		var t0, i;
		t0 = '';
		for( i in this ) t0 += ' ' + i + '="'+this[i]+'"';
		return t0;
	};
	function _s(){}
	_s.prototype.toString = function(){
		
	};
	
	v = bs.factory.creator( 'd' ),
	v.init = function( $key ){
		this._e = {}, this._p = {}, this._s = {};
	},
	v.$ = function(){
		var i, j, k, v;
		i = 0, j = arguments.length;
		while( i < j ){
			k = arguments[i++];
			if( k === null ) return this._();
			else if( ( v = arguments[i++] ) === undefined ) return this._s[k] || this._e[k] || this._p[k] || this[k]();
			else v = k.charAt(0) == '@' ? this._p[k.substr(1)] = v : e[k] ? this.e( k, v ) :	this[k] ? this[k]( v ) : this.s( k, v );
		}
	};
	e = function(){
	};
	s = function(){
	};
	v.method = {
		isVdom:1,e:e,s:s,'_': function(){if( this.__d ) this.__d();}
	};
	return v;
})( bs, doc ) );

} );