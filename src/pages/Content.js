import styled, { createGlobalStyle } from 'styled-components';
import { dbService } from '../firebase/mainbase';
import NearbyCafe from '../components/NearbyCafe/NearbyCafe';
// import { connect } from 'react-redux';
// import { actionCreators } from '../reducer/store';

import ContentHeader from '../components/ContentHeader/index';
// import ContentDetail from '../components/ContentDetail/index';
import ContentComment from '../components/ContentComment/index';
import { img } from './main.jpeg';
import { cafeComment } from '../cafeInfos';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0 auto;
}
`;

const ContentWrapper = styled.div`
  /* width: calc(100% - 400px);
  height:800px;
  background: blue;
  flex:1;
  padding: 0 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto; */
`

const Inner = styled.div`
box-sizing: border-box;
`
const NearbyCafeWrap = styled(NearbyCafe)`
  width: 400px;
`
const MiddleWrapper = styled.div`
display: flex;
justify-content:center;
flex-direction:row;
margin: 0 auto;
`

const Content = (props) => {
  return (
    <>
      <GlobalStyle />
      <ContentWrapper>
        <Inner>
          <ContentHeader></ContentHeader>
        </Inner>
      </ContentWrapper>
      <MiddleWrapper>
        <ContentComment></ContentComment>
        <NearbyCafeWrap
          cafeInfo={{
            cafeName: '블루보틀 역삼',
            region_1depth: '서울',
            region_2depth: '강남구',
            region_3depth: '역삼동',
          }}
        ></NearbyCafeWrap>
      </MiddleWrapper>
    </>
  );
};

export default Content;
