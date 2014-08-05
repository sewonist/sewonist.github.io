/*
	쥬크박스(pekuid@gmail.com)
	http://developers.google.com/youtube
	https://console.developers.google.com/project
	https://developers.google.com/youtube/v3/docs/search/list
	https://developers.google.com/youtube/iframe_api_reference
*/
'use strict';
function onYouTubeIframeAPIReady(){
	player = new YT.Player('player', {
		height: '360',
		width: '640',
		videoId: 'nQm_9nbY_7U',
		events: {
			//'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError': function(event){
				switch(event.data){
					case 2:alert('요청한 동영상ID가 잘못되었습니다.'); break; 
					case 5:alert('요청한 콘텐츠를 HTML5 플레이어에서 재생할 수 없습니다.'); break; 
					case 100:alert('요청한 동영상을 찾을 수 없습니다.'); break;
					case 101:case 150:alert('요청한 동영상의 소유자가 내장 플레이어에서 동영상을 재생하는 것을 허용하지 않습니다.'); break;
				}
			}
		}
	});
}

function onPlayerReady(event){
}

function onPlayerStateChange(event){
	player.setLoop(true);
	//player.setShuffle(true);
	if( event.data == YT.PlayerState.ENDED ){
	}else	if( event.data == YT.PlayerState.PLAYING ){
		app.V.drawCurrentMovie();
	}
}
function toggleClass(){
	var classes = bs.Dom(this).S('class').split(' ');
	if( classes.indexOf('on') > -1 )
		bs.Dom(this).S('class-', 'on');
	else
		bs.Dom(this).S('class+', 'on');
}
var player, app = {
	V:{}
};

// M
app.M = {
	url : 'https://www.googleapis.com/youtube/v3/search',
	playlist : [],
	searchResults : [],
	init : function(){
		var t0;
		if( t0 = bs.save('playlist') ){
			this.playlist = typeof t0 == 'string' ? t0.split(',') : t0;
		}
		if( t0 = bs.save('searchResult') ){
			this.searchResults =  typeof t0 == 'string' ? t0.split(',') : t0;
		}
	}
};


// C
app.C = {
	init : function(){
		if( !player || !player.cuePlaylist ){
			return console.log('retry'), setTimeout( app.C.init, 500 );
		}
		app.M.init(),
		app.V.init( app.M.playlist, app.M.searchResults );
	},
	getSearchResult : function(rs){
		app.V.drawSearchList( rs, app.M.searchResults );
	},
	doSearch : function(ev){
		// 검색키워드로 Youtube검색
		bs.get( app.C.getSearchResult, app.M.url,
			'q', app.V.getSearchKey(),
			"part", 'snippet',
			"maxResults", 50,
			"order", "relevance",
			"key", "AIzaSyAkz-K8M2YGdbHvBiyVHvgwKM-MMeQtwfo" );
	},
	savePlaylist : function(){
		app.V.addPlaylist(app.M.playlist),
		console.log(app.M.playlist),
		app.V.clearPlaylist(),
		app.V.drawPlaylist( app.M.playlist, app.M.searchResults ),
		player.cuePlaylist( app.M.playlist, 0, 0, 'default'),
		bs.save( 'playlist', app.M.playlist ),
		bs.save( 'searchResult', app.M.searchResults ),
		app.V.makePlaybt();
	},
	deletePlaylist : function(){
		app.V.deletePlaylist( app.M.playlist ),
		console.log(app.M.playlist),
		app.V.clearPlaylist(),
		app.V.drawPlaylist( app.M.playlist, app.M.searchResults ),
		player.cuePlaylist( app.M.playlist, 0, 0, 'default'),
		bs.save( 'playlist', app.M.playlist ),
		bs.save( 'searchResult', app.M.searchResults ),
		app.V.makePlaybt();
	}
}



// V
app.V = {
	init : function( playlist, searchResults ){
		bs.css('youtube.css');
		if( bs.DETECT.os.charAt(0) == 'i' ){
			bs.Dom('#menuDiv').S('width', 250);
			bs.Dom('#controlBox').S(null);
		}else if(bs.DETECT.os == 'android'){
			bs.Dom('#play').S('visibility', 'hidden');
		}
		this.drawPlaylist(playlist, searchResults);

		bs.Dom('#search').S('submit', app.C.doSearch);
		bs.Dom('#tabPlayList').S('click', this.activeTabPlaylist);
		bs.Dom('#tabSearch').S('click', this.activeTabSearch);
		if( bs.DETECT.os.charAt(0) != 'i' ){
			bs.Dom('#play').S( 'click', this.doPlay);
		}
		bs.Dom('#btPlaylist').S( 'click', app.C.savePlaylist);
		bs.Dom('#btTrash').S( 'click', app.C.deletePlaylist);
		if( bs.DETECT.os.charAt(0) != 'i' ){
			bs.Dom('#prevPL').S( 'click', function(){
				player.previousVideo();
			});
			bs.Dom('#nextPL').S( 'click', function(){
				player.nextVideo();
			});
		}
	},
	activeTabPlaylist : function(){
		bs.Dom('#searchlist').S( '@hidden', '' ),
		bs.Dom('#playlist').S( '@hidden', null ),
		bs.Dom('#tabSearch').S( 'class-', 'pure-menu-selected' ),
		bs.Dom(this).S( 'class+', 'pure-menu-selected' );
	},
	activeTabSearch : function(){
		bs.Dom('#searchlist').S( '@hidden', null ),
		bs.Dom('#playlist').S( '@hidden', '' ),
		bs.Dom('#tabPlayList').S( 'class-', 'pure-menu-selected' ),
		bs.Dom(this).S( 'class+', 'pure-menu-selected' ),
		bs.Dom('#q').S('f');
	},
	getSearchKey : function(){
		return bs.Dom('#q').S('@value');
	},
	makePlaybt : function(){
		if( bs.DETECT.os.charAt(0) != 'i' )
			bs.Dom('#play i').S('class-', 'fa-pause', 'class+', 'fa-play');
	},
	doPlay : function(){
		if( bs.Dom('#play i').S('class').indexOf('fa-play') > -1 ){
			player.playVideo(),
			bs.Dom('#play i').S('class-', 'fa-play', 'class+', 'fa-pause');
		}else{
			// 시작되지 않음(-1), 종료됨(0), 재생 중(1), 일시중지(2), 버퍼링(3), 동영상 신호(5)
			if( player.getPlayerState() == 2 )
				player.playVideo(), bs.Dom('#play i').S('class-', 'fa-play', 'class+', 'fa-pause');
			else
				player.pauseVideo(), bs.Dom('#play i').S('class-', 'fa-pause', 'class+', 'fa-play');
		}
	},
	clearPlaylist : function(){
		bs.Dom('#playlists').S( 'html', '' );
	},
	addPlaylist : function(playlist){
		var videoId, videoIdx, i, j,
			videos = bs.Dom('@li.results.on');
		for( i = 0, j = videos.length; i < j ; i++ ){
			videoId = bs.Dom( videos[i] ).S('@data-video-id');
			if( playlist.indexOf(videoId) < 0 ) playlist.push( videoId );
		}
	},
	deletePlaylist : function(playlist){
		var videoId, videoIdx, i, j,
			videos = bs.Dom('@li.playlist.on');
		for( i = 0, j = videos.length; i < j; i++ ){
			videoId = bs.Dom( videos[i] ).S('@data-video-id');
			playlist.splice( playlist.indexOf(videoId), 1 );
		}
	},
	drawCurrentMovie : function(){
		var els, i, j;
		bs.Dom('@li.playlist').S('class-', 'playing'),
		els = bs.Dom('@li.playlist');
		for( i = 0, j = els.length; i < j; i++ ){
			if( bs.Dom( els[i] ).S('@data-video-id') == player.getVideoData().video_id )
				bs.Dom( els[i] ).S( 'class+', 'playing' );
		}
	},
	drawSearchList : function( rs, searchResults ){
		var item, type, videoId, title, thumbD, thumbH, thumbM, i, j;
		bs.Dom('#searchResults').S( 'html', '' ),
		rs = JSON.parse(rs);
		for( i = 0, j = rs.items.length; i < j; i++ ){
			item = rs.items[i],
			type = item.id.kind, // youtube#video
			videoId = item.id.videoId,
			title = item.snippet.title,
			thumbD = item.snippet.thumbnails.default.url,
			thumbH = item.snippet.thumbnails.high.url,
			thumbM = item.snippet.thumbnails.medium.url;
			if( type != 'youtube#video' ) continue;
			if( searchResults.indexOf(videoId) < 0 ){
				searchResults.push(videoId),
				searchResults.push(thumbD),
				searchResults.push(title);
			}
			bs.Dom('#searchResults').S( '>',
				bs.Dom('<li>').S( 'class+', 'results', '@data-video-id', videoId, '>',
					bs.Dom('<img>').S( '@align', 'left', '@src', thumbD, '@title', title, '@alt', title, 'this' ),
				'html+', title, 'this' )
			);
		}
		bs.Dom('@li.results').S( 'click', toggleClass );
	},
	drawPlaylist : function(playlist, searchResults){
		var videoId, videoIdx, i, j;
		for( i = 0, j = playlist.length; i < j; i++ ){
			videoId = playlist[i],
			videoIdx = searchResults.indexOf(videoId);
			bs.Dom('#playlists').S( '>',
				bs.Dom('<li>').S( 'class+', 'playlist', '@data-video-id', videoId, '>',
					bs.Dom('<img>').S( '@align', 'left', '@src', searchResults[++videoIdx], '@title', searchResults[++videoIdx],
					'@alt', searchResults[videoIdx], 'this' ),
				'html+', searchResults[videoIdx], 'this' )
			);
		};
		bs.Dom('@li.playlist').S( 'click', toggleClass );
		if( bs.DETECT.os.charAt(0) != 'i' )
			player.cuePlaylist( playlist, 0, 0, 'default'),
			bs.Dom('#play i').S('class-', 'fa-pause', 'class+', 'fa-play');
		else
			player.cuePlaylist( playlist, 0, 0, 'default');
	}
}


bs.plugin( 'save', 'last' );
bs(function(){
	app.C.init();
});