import { ReactComponent as Table } from './Table.svg';
import { ReactComponent as Cup } from './Cup.svg';
import { ReactComponent as Time } from './Time.svg';

import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Like from '../utils/Like/Like';
import React, { useState, useEffect } from 'react';
import defaultImg from '../utils/Card/dummyImg/defaultCafe.jpeg';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';

const MainImgCover = styled.div`
  width: 100%;
  height: 600px;
  background-color: #160a0a9f;
  position: absolute;
`;

const MainImage = styled.div`
  background-position: center;
  background-size: 100% auto;
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 600px;
`;

/////////////////////////////////////
const Detail = styled.div`
  /* position: relative;
  top: 80px;
  width: 800px;
  margin: 0px auto auto auto;

  background-color: red;
  display: flex; */

  display:flex;
  justify-content: space-evenly;
  /* padding: 20px auto auto 20px; */
  width: 1424px;
  height:800px;
  background: #FAFAFA;
  flex:1;
  padding: 20px 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;

`


const DescribeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  align-items: start;
  width: 30%;
  min-width: 400px;
`;

//////ANCHOR  First
const Header = styled.header`
  margin: auto;
`;

const TittleWrap = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 3rem;
  font-weight:bold;
  /* -webkit-flex-direction: row;
  -wedkit-box-direction: normal;
  --webkit-box-orient: horizontal; */
`;
const Title = styled.span`
  /* padding-right: 50px;
  max-width: 75%;
  font-size: 1.2rem;
  line-height: 46px; */
`;

// const Name = styled.h1`
//   display: inline-block;
//   max-width: 100%;
//   word-break: break-all;
// `;

const ActionButtonWrap = styled.div`
  display: flex;
  display: --webkit-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  -wedkit-box-direction: normal;
  --webkit-box-orient: horizontal;
  margin-left: auto;
`;

const LikeWrap = styled.div`
  position: relative;
  padding-top: -10px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
`;

const LikeModi = styled(Like)`
  display: inline-block;
  text-indent: -9999px;
  vertical-align: middle;
  font-size: 20px;
`;

///////ANCHOR Second
const Info = styled.div`
  margin: auto;
`;
const InfoTitle = styled.span`
  margin-right: 30px;
`;
const InfoContent = styled.span``;

/// ANCHOR Three
const SvgContainer = styled.div`
  margin: auto;
  display: flex;
  justify-content:cener;
  align-items:center;
`;
const SvgOneContainer = styled.div`
display:flex;
padding: 0  10px 0 10px;
border-right : 2px solid black;
flex-direction:column;
align-items:center;

`
const H4 = styled.span`
font-size: 15px;
margin: 1rem 0 0 0 ;
`

const TagContainer = styled.div`
  margin: auto;
`;

//////

const Line = styled.div`
  margin: auto;
  border-bottom: 1px solid #000000;
  width: 5rem;
  transform: rotate(90deg);
`;

const MainImg = styled.img`
  float: right;
  width: 30%;
  height: 30%;
`;

const SlideContainer = styled.div`
  display:flex;
  margin: 9rem 0 0 0;
  flex-direction:column;
  align-items:center;
  object-fit:scale-down;
`;

const SlideMaincontainer = styled.div`
  width:500px;
  position: relative;
  background-size: cover;
`;

const SlickSlide = styled.div`
  text-align: center;
  position: relative;
  margin: auto;
  :focus {
    outline: none;
  }
`;

const Image = styled.img`
  width: 400px;
  height: 500px;
  object-fit: cover;
  margin-right:10px;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3);
`;

const Thumbnailcontainer = styled.div`
  margin-top: 10px;
  height: 75px;
  width: 350px;
`;

const ThumbSlickSlide = styled.div`
  position: relative;
  margin: auto;
  :focus {
    outline: none;
  }
  `;

const ThumbnailImg = styled.img`
    width: 100px;
    height: 100px;
    background-image: ${({ src }) => (!!src ? `url(${src})` : 'none')};
    border-radius: 4px;
    box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
      0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
  `;

const ContentHeader = (props) => {
  const current = props.cardArr.filter(
    (el) => el.id === props.currentCafe.cafeid
  );

  const {
    cafeid,
    cafeTag,
    cafeName,
    cafeAddress,
    cafeImg,
    cafePhoneNumber,
    cafeDetail
  } = current[0];
  console.log('=========== detail :', current[0][cafeDetail])
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    //autoplay: true,
    asNavFor: '.slider-nav',
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
  };

  // const cardArr = props.cardArr ? props.cardArr : cafes;

  //console.log('==================current>> :', current);

  return (
    <>
      {/* <MainImgCover />
      <MainImage style={{ backgroundImage: `url(${cafeImg[0]})` }} /> */}
      <Detail>
        <DescribeContainer>
          <div></div>
          <Header>
            <TittleWrap>
              <Title>
                {cafeName ? cafeName : '해당 정보를 불러오는 중입니다.'}
              </Title>
              <ActionButtonWrap>
                <LikeWrap>
                  <LikeModi />
                </LikeWrap>
              </ActionButtonWrap>
            </TittleWrap>
          </Header>
          <Info>
            <InfoTitle>주소</InfoTitle>
            <InfoContent>
              {cafeAddress ? cafeAddress : '해당 정보를 불러오는 중입니다.'}
            </InfoContent>
            <InfoTitle>연락처</InfoTitle>
            <InfoContent>
              {cafePhoneNumber ? cafePhoneNumber : ""}
            </InfoContent>
          </Info>
          <SvgContainer>
            <SvgOneContainer>
              <Table />
              <H4>{cafeDetail ? cafeDetail : "없어"} </H4>
            </SvgOneContainer>
            <SvgOneContainer>
              <Cup />
              <H4>{cafeDetail ? cafeDetail : "없어"} </H4>
            </SvgOneContainer>
            <SvgOneContainer>
              <Time />
              <H4>{cafeDetail ? cafeDetail : "없어"} </H4>
            </SvgOneContainer>
          </SvgContainer>
          <TagContainer className="tagBox">
            {cafeTag
              ? cafeTag.map((el) => {
                return (
                  <Tag
                    isButton={true}
                    color="#ffffff"
                    isSmall={true}
                    tagName={el}
                  />
                );
              })
              : ''}
          </TagContainer>
          <div></div>
        </DescribeContainer>
        <SlideContainer>
          <SlideMaincontainer>
            <Slider
              {...settingsMain}
              asNavFor={nav2}
              ref={(slider) => setSlider1(slider)}
            >
              {cafeImg ? (
                cafeImg.map((el) => {
                  return (
                    <SlickSlide>
                      <Image src={el} />
                    </SlickSlide>
                  );
                })
              ) : (
                  <div>'사진이 없습니다.'</div>
                )}
            </Slider>
          </SlideMaincontainer>
          <Thumbnailcontainer>
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={(slider) => setSlider2(slider)}
            >
              {cafeImg ? (
                cafeImg.map((el) => {
                  return (
                    <ThumbSlickSlide>
                      <ThumbnailImg src={el} />
                    </ThumbSlickSlide>
                  );
                })
              ) : (
                  <div>'사진이 없습니다.'</div>
                )}
            </Slider>
          </Thumbnailcontainer>
        </SlideContainer>
      </Detail>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return { ...state };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     addcurrentCafe: (currentCafe) =>
//       dispatch(actionCreators.currentCafeClick(currentCafe)),
//   };
// }

export default connect(mapStateToProps, null)(ContentHeader);
