/*
benchmarker 입니다.
start 와 end 사이의 소요시간을 측정합니다.
[사용법]
1. 시작점 지정
bench.start();
bench.start(mark);
2. 결과취득
bench.end();
bench.end(mark); // millisecond
3. 프린터셋팅
bench.printer = function(benchTime, mark){
	...
};
*/
var bench = {
	record:null,
	records : {},
	start:function( mk ){
		var t0;
		t0 = +new Date,
		mk ? ( this.records[mk] = t0 ) : ( this.record = t0 );
	},
	end:function( mk ){
		var t0;
		t0 = +new Date,
		t0 = mk ? t0 - this.records[mk] : t0 - this.record;
		return this.printer ? ( this.printer( t0, mk ), t0 ) : t0;
	}
}