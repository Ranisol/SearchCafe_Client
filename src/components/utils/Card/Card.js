import LocationImg from './location.png';
import defaultImg from './dummyImg/defaultCafe.jpeg';
import Tag from '../Tag/Tag';
import styled from 'styled-components';
import Scope from '../Scope/index';
import { connect } from 'react-redux';
import { actionCreators } from '../../../reducer/store';
import { dbService } from '../../../firebase/mainbase';
import { Link } from 'react-router-dom';
import CardSkeleton from '../Card/CardSkeleton';
import Fade from 'react-reveal/Fade';
import { noAuto } from '@fortawesome/fontawesome-svg-core';

// props
// cafeImage:? 카페 대표 이미지
// cafeName:string - 카페 이름
// cafeAddress:string - 카페 주소
// cafeTag:array - 카페 태그 배열

const CardStyle = styled.span`
  width: ${(props) => (props.inMypage ? '320px' : '345px')};
  display: inline-block;
  break-inside: avoid-column;
  border: 1.5px solid #dfdfdf;
  box-shadow: 0px 1px 2px rgba(100, 100, 100, 0.2);
  margin: 13px 10px 10px 10px;
  padding: 0px;
  padding-bottom: 10px;
  font-size: 1rem;
  border-radius: 3px;
  background-color: ${(props) => (props.inMypage ? '#f3f3f3' : '#ffffff')};
  height: ${(props) =>
    props.isMain ? '387px' : props.inMypage ? '370px' : 'auto'};
  transition: opacity 0.4s ease-in-out;
  transition: 0.3s;
  :hover {
    box-shadow: 1px 2px 3px 0.5px rgba(34, 25, 25, 0.4);
    transition: 0.3s;
    background-color: #ffffff;
  }

  &.fadeCard-enter {
    opacity: 0;
  }
  &.fadeCard-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  &.fadeCard-exit {
    opacity: 1;
  }
  &.fadeCard-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
  &.fadeCard-appear {
    opacity: 1;
  }
  &.fadeCard-appear-active {
    opacity: 0;
  }
`;

const CardImg = styled.img`
  width: ${(props) => (props.inMypage ? '310px' : '335px')};
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 0.1px;
  height: ${(props) =>
    props.isMain ? '250px' : props.inMypage ? '230px' : 'auto'};
  min-height: 200px;
  object-fit: ${(props) => (props.isMain | props.inMypage ? 'cover' : '')};
  padding-bottom: 5px;
  margin: 5px 5px 5px 5px;
`;

const CardName = styled.div`
  font-size: 1.1rem;
  padding-left: 15px;
  margin: 0 0 5px 0;
`;

const CardAddress = styled.div`
  margin: 5px 0;
  padding-left: 15px;
  white-space: pre-wrap;
`;
const CardLocationImg = styled.img`
  position: relative;
  top: ${(props) => (props.inMypage ? '0px' : '4px')};
  width: 17px;
  height: 17px;
`;
const CardAddressDetail = styled.span`
  display: inline-block;
  position: ${(props) => (props.inMypage ? 'absolute' : 'relative')};
  width: 280px;
  margin: 0px 0;
  padding-right: 10px;
  padding-left: 2px;
  font-size: 0.8rem;
`;

const CardTags = styled.div`
  margin: 5px 0;
  padding-left: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ScopeContain = styled.div`
  margin: 6px 0;
  padding-left: 20px;
  margin-top: ${(props) => (props.inMypage ? '17px' : '')};
`;

const LinkContent = styled(Link)`
  color: black;
  text-decoration: none;
  &:before {
    color: #24292e;
    cursor: default !important;
  }
`;

const FadeStyle = styled(Fade)`
  display: inline-block;
`;

const Card = (props) => {
  if (!props.cafeid & (props.cafeid !== 0)) {
    return <CardSkeleton size={props.skeletonSize}></CardSkeleton>;
  }

  return (
    <CardStyle
      inMypage={props.inMypage}
      isMain={props.isMain}
      cafeid={props.cafeid}
      tag={props.cafeTag}
    >
      <Fade>
        <LinkContent to={`/content/${props.cafeid}`}>
          <CardImg
            inMypage={props.inMypage}
            isMain={props.isMain}
            src={props.cafeImage || defaultImg}
          />
          <CardName>{props.cafeName ? props.cafeName : '제목'}</CardName>
          <CardAddress inMypage={props.inMypage}>
            <CardLocationImg
              src={LocationImg}
              inMypage={props.inMypage}
            ></CardLocationImg>
            <CardAddressDetail inMypage={props.inMypage}>
              {!props.cafeAddress
                ? '등록된 주소가 없습니다'
                : props.cafeAddress.length <= 30
                ? props.cafeAddress
                : props.cafeAddress.slice(0, 30) + '...'}
            </CardAddressDetail>
          </CardAddress>
          <ScopeContain inMypage={props.inMypage}>
            <Scope isScope={true} size="18px" scope={props.cafeStar}></Scope>
          </ScopeContain>
          {props.inMypage ? (
            ''
          ) : (
            <CardTags>
              {props.cafeTag
                ? props.cafeTag.map((tag) => (
                    <Tag key={tag} isSmall={true} tagName={tag}></Tag>
                  ))
                : ''}
            </CardTags>
          )}
        </LinkContent>
      </Fade>
    </CardStyle>
  );
};

function mapStateToProps(state, ownProps) {
  return { state, ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    currentCafe: (currentCafe) =>
      dispatch(actionCreators.currentCafeClick(currentCafe)),
    currentCafeComment: (comment) =>
      dispatch(actionCreators.currentCafeComment(comment)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
