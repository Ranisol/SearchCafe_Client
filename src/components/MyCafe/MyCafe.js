import { actionCreators } from '../../reducer/store';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../utils/Card/index';
import CardSkeleton from '../utils/Card/CardSkeleton';
const MyCafeStyle = styled.div`
  width: 90%;
  min-width: 400px;
  height: auto;
  margin: auto auto 300px auto;
`;

const CafeCardStyle = styled.div`
  margin: auto;
  position: relative;
  width: 1200px;
  width: 70%;
  min-width: 370px;
  height: auto;
  min-height: 300px;
  background-color: #fafafa;
  border-radius: 10px;
  overflow-x: scroll;
  white-space: nowrap;
`;
const Title = styled.div`
  width: 65%;
  max-width: 1500px;
  font-size: 1.5rem;
  display: block;
  margin: auto;
  padding-top: 50px;
  padding-bottom: 30px;
  @media (max-width: 900px) {
    text-align: center;
  }
`;

const WhenNoCommentCafe = styled.div`
  font-size: 1.3rem;
  text-align: center;
  position: relative;
  top: 120px;
  width: 100%;
`;
const WhenNoHeartCafe = styled.div`
  font-size: 1.3rem;
  text-align: center;
  position: relative;
  top: 120px;
  width: 100%;
`;

const MyCafe = ({ state }) => {
  const [commentList, setCommentList] = useState([]);
  const [heartList, setHeartList] = useState([]);
  const [comments, setComments] = useState(
    !state.user ? [] : state.user.comment ? state.user.comment : []
  );
  const [hearts, setHearts] = useState(
    !state.user ? [] : state.user.heart ? state.user.heart : []
  );

  const history = useHistory();
  useEffect(() => {
    if (!state.user | !state.cardArr) {
      history.push('/');
      return;
    }
    setCommentList([]);
    for (let comment of comments) {
      let result = state.cardArr.filter((card) => {
        return card.cafeName === comment;
      });
      setCommentList((pres) => [...pres, result[0]]);
    }
    setHeartList([]);
    for (let heart of hearts) {
      let result = state.cardArr.filter((card) => {
        return card.cafeName === heart;
      });
      setHeartList((pres) => [...pres, result[0]]);
    }
  }, []);

  return (
    <MyCafeStyle>
      <Title>찜한 카페</Title>
      <CafeCardStyle>
        {heartList.length === 0 ? (
          <WhenNoCommentCafe>아직 찜한 카페가 없습니다.</WhenNoCommentCafe>
        ) : (
          heartList.map((card, index) => {
            return (
              <Card
                {...card}
                inMypage={true}
                key={index}
                cafeid={card.id}
                cafeImage={card.cafeImg ? card.cafeImg : ''}
              ></Card>
            );
          })
        )}
      </CafeCardStyle>
      <Title>리뷰 작성한 카페</Title>
      <CafeCardStyle>
        {commentList.length === 0 ? (
          <WhenNoHeartCafe>아직 리뷰를 작성한 카페가 없습니다.</WhenNoHeartCafe>
        ) : (
          commentList.map((card, index) => {
            return (
              <Card
                {...card}
                inMypage={true}
                key={index}
                cafeid={card.id}
                cafeImage={card.cafeImg ? card.cafeImg : ''}
              ></Card>
            );
          })
        )}
      </CafeCardStyle>
    </MyCafeStyle>
  );
};

function mapStateToProps(state, ownProps) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCafe);
