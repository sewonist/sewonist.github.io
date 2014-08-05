# 둘러보기

### bsJS에 오신 것을 진심으로 환영합니다.

bsJS로 무엇을 할 수 있을까요?

<a href='http://projectbs.github.io/bsShowCase/' target='_blank'>ShowCase</a>에서 확인할 수 있습니다.

![bsShowCase ScreenShot](http://i.imgur.com/07Yf9kx.png)

bsJS를 쓰면 ShowCase에 있는 것들을  **빠르고** **쉽게** 만들 수 있습니다.

# 만져보기

보고 침만 꿀떡 삼키실 건가요?

실제로 만져 보실 수 있습니다. 두 가지 방법이 있습니다.

## 내려받기

권장하는 방식입니다. 

실제 Core와 예제의 소스를 로컬에 내려받아서 마음대로 만져보실 수 있습니다.

bsJS로 만들어진 bsJSTest와 bsShowCase는 bsJS 연구나무의 bsjs.js를 상대 경로로 참조하고 있습니다.

그래서 아래와 같이 폴더를 구성하셔야 내려받은 로컬에서도 문제 없이 쓸 수 있습니다. 

    ANY-FOLDER
          └----bsJS           
          └----bsShowCase
          └----bsJSTest

구체적으로 말씀드리면 `ANY-FOLDER`에서 

>git clone https://github.com/projectBS/bsJS.git

>git clone https://github.com/projectBS/bsJSTest.git

>git clone https://github.com/projectBS/bsShowCase.git

를 모두 수행하시면 됩니다.

## 그냥쓰기

1. HTML 문서에 `<script>` 태그를 통해 bsJS를 포함시킵니다.

        <script src="http://projectbs.github.io/bsJS/bsjs.0.4.js"></script>

2. 아래와 같은 형식으로 bsJS를 사용합니다.

        <script>
        bs( function() {
            // 여기에 bsJS를 사용하는 소스 작성
        } );
        </script>

### 초간단 예제

- dom을 생성하고 스타일과 내용, 이벤트 리스너를 한방에 처리!

        <script>
        bs( function(){
            bs.Dom( '<div></div>' ).S( 
                '<', 'body', // body를 부모로
                'html', '안녕', // html 입력
                'width', 300, // 스타일 지정
                'click', function( $e ){ alert('초간단 초고성능 bsJS!'); } // 이벤트 등록
            );
        } );
        </script>


# 새싹되기

이제 bsJS의 새싹이 되실 차례입니다. ^^

## bsJSTest의 Push 권한 얻기

로컬에서만 놀지 마시고 bsJSTest에 직접 올리면서 마음껏 테스트해보세요.

bsJSTest 웹 페이지는 <a href='http://projectbs.github.io/bsJSTest/0.3/' target='_blank'><b>여기</b></a>에서 보실 수 있습니다. 멋지죠? ^^

Push 권한을 얻으려면 <a href='https://www.facebook.com/photo.php?fbid=828142343867893' target='_blank'><b>여기</b></a>에 GitHub의 아이디와 함께 'bsJSTest Push 권한 주세요'라고 댓글 달아주세요.

# 자료

## Wiki

<a href='https://github.com/projectBS/bsJS/wiki' target='_blank'>bsJS Wiki</a>

## Error Code table
<a href='https://docs.google.com/spreadsheet/ccc?key=0AhWfMzniSmaedDZPdUdRdEx2a3RhTjg0U0hEZXE2eEE&usp=drive_web#gid=0' target='_blank'>bsJS Error Code table</a>

## APIs

- bs Core [<a href='https://github.com/projectBS/bsJS/wiki/doc1-core' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/doc1-core-ja' target='_blank'>ja</a>]
- bs Base Function [<a href='https://github.com/projectBS/bsJS/wiki/doc2-base-function' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/doc2-base-function-ja' target='_blank'>ja</a>]
- bs Dom [<a href='https://github.com/projectBS/bsJS/wiki/doc3-Dom' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/doc3-Dom-ja' target='_blank'>ja</a>]
- Structure of BS [<a href='https://github.com/projectBS/bsJS/wiki/Structure-of-BS' target='_blank'>ko</a>][<a href='https://github.com/projectBS/bsJS/wiki/Structure-of-BS-ja' target='_blank'>ja</a>] : 작성 중

<a href='' target='_blank'></a>

 
# License

bsJS는 <a href='http://opensource.org/licenses/BSD-3-Clause' target='_blank'><b>BSD 라이선스</b></a>로 배포되는 Open Source Software 입니다.

# Contact us

<a href='https://www.facebook.com/groups/bs5js/' target='_blank'>bsJS Facebook Group</a>



----------
Copyrightⓒ 2013, ProjectBS Committee. All rights reserved.
