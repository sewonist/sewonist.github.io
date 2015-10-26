#Logs

##2015-10-26

**'nullptr' was not declared in this scope**
Finally found out what to do. Added the -std=c++0x compiler argument under Project Properties -> C/C++ Build -> Settings -> GCC C++ Compiler -> Miscellaneous. It works now!

[손에 폰잡고](http://newmart.iptime.org:2222/)
[https://nodebb.org/](https://nodebb.org/) 이거 뭐야? 너무 좋아~!

##2015-10-23

mdwiki 가 검색 되지않는 문제점은 github 검색으로 해결 하면 됨.

---

##2014-10-27

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