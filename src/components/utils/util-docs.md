# Tag

## props로 넘겨줄 값

tagName(string) 태그 이름이 들어갑니다. 들어갈 수 있는 목록은 figma 메인 페이지 태그 그대로 입니다.
isSmall(boolean) 값으로 true를 주면 태그가 작아집니다.
isButton(boolean) 값으로 true를 주면, hover 상태일 때 색이 바뀝니다.
color(string) 색을 지정하면 default가 아닌 다른 색으로 바뀝니다.

## Example

```js
<Tag tagName={스타벅스} isSmall={true} isButton={true} color="#ffffff"></Tag>
```

# Card

## props로 넘겨줄 값

cafeImage(string??) 카페 대표 이미지
cafeName(string) - 카페 이름
cafeAddress(string) - 카페 주소
cafeTag(array) - 카페 태그 배열
inMypage - 마이페이지 맞춤형 (position이 어그러져서 수정을 가했음)
inMain - 메인페이지 맞춤형 (카드 크기가 같은게 낫다는 의견 반영)

## Example

```js
<Card
  cafeImage="blahblah.png"
  cafeName="삼성역 근처 카페"
  cafeAddress="삼성역"
  cafeTag={['편안한', '애완 동물 동반', '스타벅스']}
></Card>
```

# Scope

## props로 넘겨줄 값

isScope(boolean) - 고정된 점수 보여줌 => 완전 다른 로직
size - 크기
scope - 점수 / 0이면 점수가 없는 상태
modifyScope - 댓글 수정 페이지용

## Example

```js
<Scope isScope={true} size="22px" scope={5}></Scope>
```

## 로직 수정중

# imageModal

## props로 넘겨줄 값

unEnlarge:Function - 확대된 모달창을 종료
image: 확대할 이미지

## Example

```js
<ImageModal unEnlarge={handler} image={image}></ImageModal>
```

# Comment

## props로 넘겨줄 값

handleImageEnlarge - 크게 키우는 icon을 클릭시, 동작할 옵션 (지금은 modal창 띄움)
setBeforeModify - 코멘트 수정시, 초기값 설정하기 위한 옵션
userComment - 현재 유저 댓글

## Example

```js
<Comment
  handleImageEnlarge={handleImageEnlarge}
  key={index}
  userComment={userComment}
  setCommentModal={setModal}
  setBeforeModify={setBeforeModify}
></Comment>
```

# Button / Like => 두개가 분리가 안되어 있어서 복잡한 상황..
