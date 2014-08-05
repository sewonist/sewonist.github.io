module.exports.vdom = function( fn, cls, bs ){
	var types = {
		checkbox:function(){
			
		}
	};
	fn.NEW = function( key, type ){
		this._el = types[type]();
	},
	fn.S = function(){
		var i = 0, j = arguments.length, k, v, el = this._el;
		while( i < j ){
			k = arguments[i++], v = arguments[i++];
			if( v === undefined ) return el[k];
			if( v === null ) delete el[k];
			el( k, v );
			
		}
	}
};