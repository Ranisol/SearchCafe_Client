import Table from './table.svg';
import Cup from './coffee.png';
import Time from './clock.png';
import blank from './blank.png';
import { tagName } from '../../cafeInfos';
import Tag from '../utils/Tag/index';
import styled from 'styled-components';
import Like from '../utils/Like/Like';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import locationImg from './location.png';
import { cafes } from '../../cafeInfos';
import React, { useState, useEffect, useMemo } from 'react';
import defaultImg from '../utils/Card/dummyImg/defaultCafe.jpeg';
import { connect } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import { $CombinedState } from 'redux';

/////////////////////////////////////
const Detail = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr 1fr 10fr 0.5fr;
  /* padding: 20px auto auto 20px; */
  width: 80%;
  max-width: 1300px;
  min-width: 600px;
  height: 610px;
  background: #fafafa;
  padding: 20px 20px;
  /* box-shadow: 0px 0px 5px 0px #afafaf; */
  border: 1px solid #dfdfdf;
  margin: auto;
  border-radius: 5px;
  @media (max-width: 1400px) {
    grid-template-columns: auto;
    height: auto;
  }
`;

const FakeDiv = styled.div`
  @media (max-width: 1400px) {
    display: none;
  }
`;

const DescribeContainer = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 0.3rem;
  grid-template-rows: auto;
  align-items: center;

  min-width: 450px;
`;
//////ANCHOR  First
const Header = styled.header``;
const TittleWrap = styled.div`
  display: flex;
  flex-direction: row;

  font-weight: bold;
`;
const Title = styled.span`
  margin-bottom: 30px;
  padding: 5px;
  font-size: ${(props) =>
    props.cafeName ? 3 - props.cafeName.length * 0.07 + 'rem' : '2rem'};
`;
const ActionButtonWrap = styled.div`
  position: relative;
  bottom: 35px;
  right: 20px;
`;
const LikeCss = styled(Like)`
  align-items: start;
`;
///////ANCHOR Second
const InfoAdress = styled.div`
  display: grid;
  grid-template-columns: 70px 1.8rem auto;
  grid-template-rows: auto auto;
  padding: 5px;
`;
const InfoAddressContent = styled.span`
  color: #272727;
  grid-column: 2 / 4;
`;
const AdressIcon = styled.span`
  position: relative;
  top: 0.31rem;
  border-radius: 2px;
  border: solid 1px #5c5c5c;
  padding: 0 0.1rem;
  margin-right: 2px;
  font-size: 0.6rem;
  text-align: center;
  color: #7f7f7f;
  grid-column: -3 / -2;
  height: 0.9rem;
`;
const Info = styled.div`
  display: grid;
  grid-template-columns: 70px auto;
  margin-left: 0;
  padding: 3px;
`;
const Location = styled.img`
  width: 30px;
`;
const InfoTitle = styled.span`
  color: #4f4f4f;
  font-weight: 600;
`;
const InfoContent = styled.span`
  color: #272727;
`;

/// ANCHOR Three
const SvgContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  right: 30px;
  top: 5px;
`;

const ContentFigure = styled.img`
  height: 60px;
`;

const SvgOneContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.4rem 0 1.4rem;
  border-right: 2px solid #bfbfbf;
  justify-content: center;
  align-items: center;
`;
const SvgLastContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`;

const H4 = styled.span`
  font-size: 16px;
  margin: auto;
  padding: 1px;
  font-weight: 500;
`;
const SvgInfo = styled.span`
  margin: auto;
  font-size: 16px;
  padding: 10px 7px;
  font-weight: 600;
`;

const TagContainer = styled.div`
  margin-left: 0;
  margin-top: 10px;
`;

//////

const SlideContainer = styled.div`
  display: flex;
  margin: 1.5rem 0 0 0;
  flex-direction: column;
  align-items: center;
  object-fit: scale-down;
`;

const SlideMaincontainer = styled.div`
  max-width: 700px;
  width: 90%;
  position: relative;
  background-size: cover;
`;

const SlickSlide = styled.div`
  text-align: center;
  position: relative;

  :focus {
    outline: none;
  }
`;

const Image = styled.img`
  max-width: 600px;
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3);
`;

const Thumbnailcontainer = styled.div`
  margin: 30px auto auto auto;
  height: 120px;
  max-width: 580px;
  width: 100%;
  position: relative;
  overflow-y: scroll;
  white-space: nowrap;
  /* @media (max-width: 1400px) {
    margin-right: 12%;
  } */
`;

const ThumbSlickSlide = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
  :focus {
    outline: none;
  }
`;

const ThumbnailImg = styled.img`
  display: inline-block;
  width: 120px;
  height: 120px;
  background-image: ${({ src }) => (!!src ? `url(${src})` : 'none')};
  border-radius: 4px;
  box-shadow: 0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25),
    0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03);
  padding-left: 10px;
  @media (max-width: 1400px) {
  }
`;
const Divide = styled.div`
  border-left: 1px solid #cccccc;
  height: 60%;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 20px;
  margin: auto 0 auto 0;
`;

const ContentHeader = (props) => {
  console.log(props.currentCafe);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [mainPhoto, setMainPhoto] = useState(null);
  const [subPhoto, setSubPhotos] = useState(null);
  const [cafeImg, setCafeImg] = useState([blank]);

  let cafeid = !props.currentCafe ? '' : props.currentCafe.cafeid;
  let cafeTag = !props.currentCafe ? '' : props.currentCafe.cafeTag;
  let cafeName = !props.currentCafe ? '' : props.currentCafe.cafeName;
  let cafeAddress = !props.currentCafe ? '' : props.currentCafe.cafeAddress;
  let cafeImage = !props.currentCafe ? [blank] : props.currentCafe.cafeImg;
  let addressname = !props.currentCafe ? '' : props.currentCafe.addressname;
  let cafePhoneNumber = !props.currentCafe
    ? ''
    : props.currentCafe.cafePhoneNumber;
  let cafeDetail = !props.currentCafe ? '' : props.currentCafe.cafeDetail;
  let cafeTable = !props.currentCafe ? '' : props.currentCafe.cafeTable;
  let Americano = !props.currentCafe ? '' : props.currentCafe.Americano;
  let holiday = !props.currentCafe ? '' : props.currentCafe.holiday;
  useEffect(() => {
    setNav1(mainPhoto);
    setNav2(subPhoto);
  }, []);
  useEffect(() => {
    setCafeImg(cafeImage);
  }, [cafeImage[0]]);
  useEffect(() => {
    if (props.comment) {
      let temp = props.currentCafe.cafeImg;
      for (let commentObj of props.comment) {
        if (!!commentObj.userImg) {
          temp = temp.concat(commentObj.userImg);
        }
      }
      setCafeImg(temp);
    }
  }, [props.comment?.length]);

  const settingsMain = {
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,
    autoplay: true,
    centerPadding: '50px',
    speed: 1000,
  };

  const settingsThumbs = {
    slidesToShow: cafeImg ? cafeImg.length + 1 : 0,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    <>
      {/* <MainImgCover />
      <MainImage style={{ backgroundImage: `url(${cafeImg[0]})` }} /> */}
      <Detail>
        <FakeDiv></FakeDiv>
        <DescribeContainer>
          <div />
          <Header>
            <TittleWrap>
              <Title cafeName={cafeName}>
                {cafeName ? cafeName : '해당 정보를 불러오는 중입니다.'}
              </Title>
            </TittleWrap>
          </Header>
          <ActionButtonWrap>
            <Like />
          </ActionButtonWrap>
          <InfoAdress>
            <InfoTitle>주소</InfoTitle>
            <InfoAddressContent>
              {addressname ? addressname : '해당 정보를 불러오는 중입니다.'}
            </InfoAddressContent>
            <AdressIcon>지번</AdressIcon>
            <InfoContent>
              {cafeAddress ? cafeAddress : '해당 정보를 불러오는 중입니다.'}
            </InfoContent>
          </InfoAdress>
          <Info>
            <InfoTitle>연락처</InfoTitle>
            <InfoContent>
              {cafePhoneNumber ? cafePhoneNumber : '준비 중입니다.'}
            </InfoContent>
          </Info>
          <Info>
            <InfoTitle>휴일</InfoTitle>
            <InfoContent>{holiday ? holiday : '준비 중입니다.'}</InfoContent>
          </Info>
          <SvgContainer>
            <SvgOneContainer>
              <ContentFigure src={Table}></ContentFigure>
              <SvgInfo>좌석</SvgInfo>
              <H4>{cafeTable ? cafeTable : '정보없음'}</H4>
            </SvgOneContainer>
            <SvgOneContainer>
              <ContentFigure src={Cup}></ContentFigure>
              <SvgInfo>아메리카노</SvgInfo>
              <H4>{Americano ? Americano : '정보없음'}</H4>
            </SvgOneContainer>
            <SvgLastContainer>
              <ContentFigure src={Time}></ContentFigure>
              <SvgInfo>영업시간</SvgInfo>
              <H4>{cafeDetail ? cafeDetail : '정보없음'} </H4>
            </SvgLastContainer>
          </SvgContainer>

          <TagContainer className="tagBox">
            {cafeTag
              ? cafeTag.map((el) => {
                  return (
                    <Tag key={el} color="#ffffff" isSmall={true} tagName={el} />
                  );
                })
              : ''}
          </TagContainer>

          <div></div>
        </DescribeContainer>
        <Divide></Divide>
        <SlideContainer>
          <SlideMaincontainer>
            <Slider
              {...settingsMain}
              asNavFor={nav2}
              ref={(photo) => setMainPhoto(photo)}
            >
              {cafeImg ? (
                cafeImg.map((el) => {
                  let uniqueKey = el.split('token')[1] || el;
                  return (
                    <SlickSlide key={uniqueKey} id="aaaa">
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
              ref={(photos) => setSubPhotos(photos)}
            >
              {cafeImg ? (
                cafeImg.map((el, index) => {
                  let uniqueKey = el.split('token')[1] || el;

                  return (
                    <ThumbSlickSlide key={uniqueKey}>
                      <ThumbnailImg src={el} />
                    </ThumbSlickSlide>
                  );
                })
              ) : (
                <div>'사진이 없습니다.'</div>
              )}
              <ThumbSlickSlide>
                <ThumbnailImg src={blank} />
              </ThumbSlickSlide>
            </Slider>
          </Thumbnailcontainer>
        </SlideContainer>
        <FakeDiv></FakeDiv>
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
