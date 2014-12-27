### 2014-10-27

MDWiki 에서 Disqus 를 각 페이지별로 사용하기 위한 추가코드.

javascript:
```javascript
	var disqus_url = window.location.href;
	var id = disqus_url.split("#!");
	var disqus_identifier;
	if(id.length>1) disqus_identifier = id[1];
	else disqus_identifier = disqus_url;
```

Note: MDWiki 코드하이라이트에서는 자바스크립트 개행을 하면 안되는 듯 함.

[gimmick:Disqus](sewonist-github-io)