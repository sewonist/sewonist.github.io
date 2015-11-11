#Logs



##2015-10-30

그냥 요즘 많이 보여서~~~ ㅎㅎㅎ 

#### Hypnotizing circle dance by Sufi Zikr

<iframe width="420" height="315" src="https://www.youtube.com/embed/G5goISKPSH8?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

#### De Staat - Witch Docto

<iframe width="500" height="281" src="https://www.youtube.com/embed/0ttGgIQpAUc?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

#### toki

<iframe src="https://player.vimeo.com/video/141430185" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

#### Ants Circle

<iframe width="420" height="315" src="https://www.youtube.com/embed/mA37cb10WMU?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

##2015-10-28

###openFramework vs project generator

- of library path 수정

project.vcxproj path 수정
```
..\..\..\..\..\of_v0.8.4_vs_release\libs
```

###ijnclude
%(AdditionalIncludeDirectories) 패스가 틀림.

```
..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\graphics;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\app;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\sound;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\utils;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\communication;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\video;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\types;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\math;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\3d;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\gl;..\..\..\..\..\of_v0.8.4_vs_release\libs\openFrameworks\events;..\..\..\..\..\of_v0.8.4_vs_release\libs\glut\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\rtAudio\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\quicktime\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\freetype\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\freetype\include\freetype2;..\..\..\..\..\of_v0.8.4_vs_release\libs\freeImage\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\fmodex\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\videoInput\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\glew\include\;..\..\..\..\..\of_v0.8.4_vs_release\libs\glu\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\tess2\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\cairo\include\cairo;..\..\..\..\..\of_v0.8.4_vs_release\libs\poco\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\glfw\include;..\..\..\..\..\of_v0.8.4_vs_release\libs\openssl\include;..\..\..\..\..\of_v0.8.4_vs_release\addons;
```

###library
```
..\..\..\..\..\of_v0.8.4_vs_release\libs\glut\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\glfw\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\rtAudio\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\FreeImage\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\freetype\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\quicktime\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\fmodex\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\videoInput\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\cairo\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\glew\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\glu\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\openssl\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\Poco\lib\vs;..\..\..\..\..\of_v0.8.4_vs_release\libs\tess2\lib\vs;
```

경로 문제로 제대로 빌드가 되지 않음. of 경로를 프로젝트에 맞혀서 해결.

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