# 사물과 인터넷 I

## 간단한 잇점연구소 소개

## 준비물

* 노트북
* 아두니오
* 거리센서 (Sharp 2Y0A21)

## 아두이노

![](data/ArduinoUno_R3_Front.jpg)

## 아두이노IDE 설치 

http://arduino.cc/en/Main/Software

## Sharp 2Y0A21

![](data/ir_distance.jpg)

## 특징 

* 저렴
* IR 방식
* 절대거리 (10~80cm)
* 아날로그 출력

### 저렴

$14
https://www.sparkfun.com/products/242

### IR 방식

![](data/IR.jpg)

### 아날로그 출력

![](data/graph.png)

## 작동개요

![](data/logic.jpg)

## 거리 테스트 스케치 작성

[깃헙 링크](http://example.net/)

## 재실 테스트 스케치 작성

[깃헙 링크](http://example.net/)

## 각자 테스트

## 5분간 휴식

## 인터넷

[gimmick:yuml]( [CMS|Eternet;Wifi;Bluetooth]-ation >[Object|Arduino], [Object|Arduino]-data>[CMS|Eternet;Wifi;Bluetooth], [CMS|Eternet;Wifi;Bluetooth]-data>[Internet], [Internet]-action>[CMS|Eternet;Wifi;Bluetooth] )

## How?

사물을 어떻게 인터넷과 연결 할 것인가?

* 아두이노에서 작접 연결 
  * [Arduino Yum](http://arduino.cc/en/Main/ArduinoBoardYun) - Eternet, WiFi
  * [Blueinno](http://www.icbanq.com/shop/product_detail.asp?prod_code=P005638665&catg_code=) - Bluetooth
* PC를 통해서 연결 
  * 시리얼 통신

## Where?

데이터를 어디로 보낼 것인가?

* 자체CMS
* SNS (Tweet, Facebook)
* Messenger (Telegram, KakaoTalk)

## 시리얼 통신

* 네이티브 시리얼 소켓 프로그램
* Adobe AIR
* node.js

## node.js

Node.js® is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
[node.js 설치](http://nodejs.org/download/)

## 샘플 node.js 작성

[깃헙 링크](http://example.net/)

## 정리



















