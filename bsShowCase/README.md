bsShowCase
==========

The place for fabulous BS examples

## ShowCase 구경 하기

<a href='http://projectbs.github.io/bsShowCase/' target='_blank'>ShowCase</a>

## ShowCase 내려 받기

bsShowCase의 모든 showcase는 bsJS 연구 나무의 bsjs.js를 상대 경로로 참조하고 있습니다.

그래서 bsShowCase를 내려 받아 로컬에서 사용해보려면 bsShowCase뿐 아니라 bsJS도 모두 아래와 같이 같은 폴더 아래에 받아야 합니다.

    ANY-FOLDER
          └----bsJS      
          └----bsJSTest
          └----bsShowCase

구체적으로 말씀드리면 `ANY-FOLDER`에서 

>git clone https://github.com/projectBS/bsJS.git

>git clone https://github.com/projectBS/bsJSTest.git

>git clone https://github.com/projectBS/bsShowCase.git

를 모두 수행하시면 됩니다.


## ShowCase 추가 하기

구경만 하지 마시고 <a href='https://github.com/projectBS/bsJSTest/' target='_blank'><strong>bsJSTest</strong></a>에서 마음껏 테스트 해 보시고, 여기 **bsShowCase**에도 추가해주세요. 

1. 새로운 showcase를 위한 폴더를 새로 만들어 showcase 작성. **Entry Point가 되는 html 파일의 이름은 반드시 index.html로 만든다.**
2. 새로운 showcase의 화면 캡쳐 이미지 파일의 이름을 'thumb_SHOWCASE이름.png'로 만들고 bsShowCase/Thumbnails 폴더 내에 저장  
3. [index.html](https://github.com/projectBS/bsShowCase/blob/gh-pages/index.html) 의 `<div class='list'>~~~</div>` 부분을 복사하여 새로 만든 showcase에 맞게 수정하여 추가
4. bsShowCase에 Push 
5. 1~2분 후 <a href='http://projectbs.github.io/bsShowCase/' target='_blank'>http://projectbs.github.io/bsShowCase/</a>를 방문하면 추가된 showcase 확인 가능

### 예시

>**bs**를 사용해서 **로또(lotto)** showcase를 만들자!!

1. **bsShowCase/lotto** 폴더 생성 후 그 안에 **index.html**과 기타 파일 및 폴더 저장
2. **bsShowCase/Thumbnails** 폴더 내에 'thumb_lotto.png' 저장 
3. **bsShowCase/index.html** 파일 내에 아래 내용을 **`<div id="stage"></div>`** 바로 위에 추가 후 저장
    `````
    <div class="list"><a href="lotto/" target="_blank"><img src="Thumbnails/thumb_lotto.png"/>lotto : 인생 역전</a></div>
    `````
4. **`git push origin gh-pages`** 또는 *SourceTree*와 같은 Git GUI Tool을 사용하여 bsShowCase에 Push
5. 1~2분 후 <a href='http://projectbs.github.io/bsShowCase/' target='_blank'>http://projectbs.github.io/bsShowCase/</a>를 방문해서 **lotto** showcase 추가된 것 확인


# License

bsJS는 <a href='http://opensource.org/licenses/BSD-3-Clause' target='_blank'><b>BSD 라이선스</b></a>로 배포되는 Open Source Software 입니다.

bsJS의 모든 문서는 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target='_blank'><b>크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스</b></a>에 따라 이용할 수 있습니다.


# Contact us

<a href='https://www.facebook.com/groups/bs5js/' target='_blank'>bsJS Facebook Group</a>


----------
Copyrightⓒ 2013, ProjectBS Committee. All rights reserved.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target='_blank'><img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">ProjectBS</span>의 저작물인 이 저작물은(는) <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/" target='_blank'><b>크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스</b></a>에 따라 이용할 수 있습니다.<br />이 라이선스의 범위 이외의 이용허락을 얻기 위해서는 <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.bsplugin.com" rel="cc:morePermissions" target='_blank'>http://www.bsplugin.com</a>을 참조하십시오.
