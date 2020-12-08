import LocationImg from './location.png';
import defaultImg from './dummyImg/defaultCafe.jpeg';
import Tag from '../Tag/Tag';
import styled from 'styled-components';
import Scope from '../Scope/index';
// props
// cafeImage:? 카페 대표 이미지
// cafeName:string - 카페 이름
// cafeAddress:string - 카페 주소
// cafeTag:array - 카페 태그 배열

const CardStyle = styled.span`
  width: 345px;
  /* border: 1.5px solid #fefefe; */
  box-shadow: 1px 3px 3px rgba(34, 25, 25, 0.4);
  margin: 10px 20px 10px 10px;
  padding: 8px;
  padding-bottom: 10px;
  transition: opacity 0.4s ease-in-out;
  transition: 0.3s;
  font-size: 1rem;
  display: inline-block;
  background-color: #ffffff;
  :hover {
    box-shadow: 5px 8px 8px 5px rgba(34, 25, 25, 0.4);
    transition: 0.3s;
    background-color: #b9aea1;
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
  width: 345px;
  max-height: 400px;
  height: auto;
  border-bottom: 1px solid #dfdfdf;
  padding-bottom: 13px;
  margin-bottom: 5px;
`;

const CardName = styled.div`
  font-size: 1.2rem;
  padding-left: 15px;
  margin: 10px 0;
`;

const CardAddress = styled.div`
  margin: 10px 0;
  padding-left: 15px;
`;
const CardLocationImg = styled.img`
  position: relative;
  top: 3px;
  width: 20px;
  height: 20px;
`;
const CardAddressDetail = styled.span`
  margin: 10px 0;
  padding-right: 10px;
  padding-left: 2px;
  font-size: 0.85rem;
`;

const CardTags = styled.div`
  margin: 10px 0;
  padding-left: 15px;
`;

const ScopeContain = styled.div`
  margin: 10px 0;
  padding-left: 15px;
`;

const Card = (props) => {
  console.log(props.cafeid);
  return (
    <CardStyle cafeid={props.cafeid} tag={props.cafeTag}>
      <CardImg src={props.cafeImage || defaultImg} />
      <CardName>{props.cafeName ? props.cafeName : '제목'}</CardName>
      <CardAddress>
        <CardLocationImg src={LocationImg}></CardLocationImg>
        <CardAddressDetail>
          {props.cafeAddress ? props.cafeAddress : '등록된 주소가 없습니다'}
        </CardAddressDetail>
      </CardAddress>
      <ScopeContain>
        <Scope isScope={true} size="20px" scope={props.cafeStar}></Scope>
      </ScopeContain>

      <CardTags>
        {props.cafeTag
          ? props.cafeTag.map((tag) => <Tag isSmall={true} tagName={tag}></Tag>)
          : '관련 태그가 없습니다'}
      </CardTags>
    </CardStyle>
  );
};

export default Card;
