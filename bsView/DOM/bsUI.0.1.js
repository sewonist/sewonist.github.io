module.exports.ui = (function(){
var r = bs.rand, rf = bs.randf, tb = bs.DETECT.device == 'mobile' ? 'bottom' : 'top',
inited, init = function(){
	inited = 1,
	bs.Css('#bsUI_toast').S( 'overflow', 'hidden', 'position', 'fixed', tb, 0, 'background', '#2b2b2f', 'z-index', 999999999 );
}; 

return {
	toast:function( msg, time, durationTime, ease, parent ){
		var toast = function(){
			if( arguments[0] ) toastQue.push(arguments);
			if( toasted || !toastQue.length ) return;
			toasted = 1, curr = toastQue.pop();
			if( !dom ) dom = bs.Dom('<div id="bsUI_toast"></div>').S( '<', 'body', 'border-radius', 100, 'left', '50:%', 'width', '0:%', 'display', 'none', 'opacity', 0, 'this' );
			bs.ANI.style( dom.S( 'display', 'block', 'html', curr[0], 'this' ),
				'opacity', 1, 'width', 100, 'left', 0, 'border-radius', 0,
				'time', curr[1] || .5, 'ease', curr[3] || 'linear', 'end', end,
				'update', particle
			);
		},
		end = function(){
			bs.ANI.style( dom.S( 'border-radius', 0, 'opacity', 1,'width', 100, 'left', 0, 'this' ), 
				'border-radius', 100, 'opacity', 0, 'width', 0, 'left', 50, 'time', curr[1] || .5, 'ease', curr[3] || 'linear', 'delay', curr[2] || 1.5, 
				'end', hide, 'update', particle
			);
		},
		hide = function(){dom.S( 'border-radius', 100, 'opacity', 0, 'width', 0, 'left', 50, 'display', 'none' ), toasted = 0, toast();},
		particle = function( target, rate, T ){
			var i = r( 2, 5 ), x, y, s, d;
			while(i--) bs.ANI.style(
				bs.Dom('<div></div>' ).S( 'background', 'rgb('+r(100,200)+','+r(100,200)+','+r(100,200)+')', 'border-radius', 100, 'position','fixed', '<', 'body',
					'display', 'block', 'width',10, 'height',10, 'left', ( x = ( 1 + ( i % 2 ? -rate : rate ) ) * 50 ) + ':%', tb, y = bs.rand( 10, 40 ), 'opacity', 1, 'this'
				),
				'left', r( -10, 10 ) + x, 'top', r( -50, 100 ) + y,
				'width', s = r( 30, 60 ), 'height',s, 'opacity', 0, 
				'time', rf( .5, 1.5 ), 'end', particleEnd
			);
		},
		particleEnd = function(target){target.S(null);},
		toasted, toastQue = [], dom, curr;
		
		if( !inited ) init();
		(this.toast = toast).apply( this, arguments );
	},
        spin:function(){
            
                console.log("init spin")
            
        }
};
})();