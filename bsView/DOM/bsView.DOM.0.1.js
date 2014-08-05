module.exports.vdom = function( fn, cls, bs ){
	var components = {};
	cls.fn = function( k, v ){
		components[k] = v;
	};
	fn.NEW = function( key, type ){
		this._el = new components[type]();
	};
};