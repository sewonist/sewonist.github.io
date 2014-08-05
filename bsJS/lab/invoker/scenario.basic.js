//일반적인 시나리오
invoker(
	'err', function(){
		//전체에러처리
	},
	'a', function(){
		asyncQuery(q,p, function(err, result){
			if(err) invoker.a_err();
			else invoker.b( q1, p1 );
		});
	},
	'a_err', function(){
		//....
		invoke.err();
	},
	'b', function( q, p ){
		asyncQuery( q, p, function(err, result){
			if(err) invoker.b_err(null, q1,p1);
		});
	},
	'b_err', function(){
		//....
		invoke.err();
	}
);
invoker.a();

//시나리오 구축
invoker(
	'a1', function(){
		asyncQuery( q, p, function(err, result){
			this.next( q1, p1 );
		});
	},
	'a2', function(){
		asyncQuery( q, p, function(err, result){
			this.next( q1, p1 );
		});
	},
	'a3', function(q, p, next){
		//....
	}
);
invoker.command( 'action1', 'a1', 'a2', 'a3' );
invoker.run( 'action1' );