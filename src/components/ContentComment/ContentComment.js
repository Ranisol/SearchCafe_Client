import Comment from '../utils/Comment/index';
import CommentWrite from '../utils/CommentWrite/index';
import { cafeComment } from '../../cafeInfos';
import styled from 'styled-components';
import { useState, useEffect, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import Button from '../utils/Button/Button';
import reviewImg from './review.png';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { dbService } from '../../firebase/mainbase';
import SignIn from '../Signin/SignIn';
import SignUp from '../SignUp/SignUp';
import Like from '../utils/Like/Like';
const Detail3 = styled.div`
  width: 90%;
  height: 100%;
  min-height: 400px;
  margin: auto;
  max-width: 1500px;
  position: relative;
  background: #ffffff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin-bottom: 150px;
  margin-top: 5rem;
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;
const BackGroundCover = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(220, 220, 220, 0.94);
  z-index: 1;
`;

const ButtonStyle = styled.span`
  margin-top: 20px;
  position: relative;
  display: inline-block;
  left: 60%;
`;
const ButtonStyleReview = styled(ButtonStyle)`
  top: 2.5px;
`;

const TitleStyle = styled.span`
  display: grid;
  grid-template-columns: 40% 10% 40%;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
const TitleDiv = styled.span`
  border-top: 2px solid black;
  margin-left: 30px;
  margin-right: 30px;
`;
const TitleName = styled.span`
  font-size: 1.5rem;
  text-align: center;
`;

const WhenNoReview = styled.div`
  margin: auto;
`;
const WhenNoReviewTitle = styled.div`
  text-align: center;
  font-size: 1.4rem;
  margin: 110px 0 30px 0;
`;
const WhenNoReviewContent = styled.div`
  text-align: center;
  font-size: 1.1rem;
  margin: 10px 0 20px 0;
`;

const ContentComment = ({
  comment,
  handleUserHeart,
  user,
  currentCafe,
  handleUserMyComment,
}) => {
  const [commentModal, setModal] = useState(false);
  const [commentArr, setCommentArr] = useState([]);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(!!user);

  useEffect(() => {
    console.log('work!');
    if (user) {
      let filtered = comment?.filter(
        (com) => com.username === user.displayName
      );
      let userCommentArray = user.comment ? user.comment : [];
      console.log(filtered);
      if (
        (filtered?.length === 0) &
        (userCommentArray.indexOf(currentCafe.cafeName) !== -1)
      ) {
        let tempComment = user.comment ? user.comment : [];
        console.log('removing....');
        tempComment.splice(user.comment.indexOf(currentCafe.cafeName), 1);
        handleUserMyComment(tempComment);
        dbService.collection('users').doc(user.uid).update({
          comment: tempComment,
        });
      }
    }
  }, [comment?.length]);
  // const comment =  useSelector(async(state) => await comment);
  const handleModal = () => {
    setModal((pres) => !pres);
  };

  const openSignin = () => {
    setShowSignin(true);
  };
  const closeSignin = () => {
    setShowSignin(false);
  };
  const openSignup = () => {
    setShowSignup(true);
  };
  const closeSignup = () => {
    setShowSignup(false);
  };
  return (
    <Detail3>
      <SignIn
        show={showSignin}
        handleClose={closeSignin}
        handleOpen={openSignup}
      />
      <SignUp
        show={showSignup}
        handleClose={closeSignup}
        handleOpen={openSignin}
      />
      <TitleStyle>
        <TitleDiv />
        <TitleName>Review</TitleName>
        <TitleDiv />
      </TitleStyle>
      <div>
        <ButtonStyleReview onClick={isLogin ? handleModal : openSignin}>
          <Button
            name="리뷰 작성"
            icon={reviewImg}
            color="inherit"
            hoverColor="inherit"
            fontColor="#333333"
            hoverFontColor="#8a705a"
            noBorder={true}
            margin="1px"
          >
            리뷰 작성
          </Button>
        </ButtonStyleReview>
        <Like></Like>
      </div>

      {commentModal ? (
        <>
          <BackGroundCover>
            <CommentWrite handleModal={handleModal}></CommentWrite>
          </BackGroundCover>
        </>
      ) : (
        ''
      )}
      {!comment | (comment?.length === 0) ? (
        <WhenNoReview>
          <WhenNoReviewTitle>아직 작성된 리뷰가 없어요</WhenNoReviewTitle>
          <WhenNoReviewContent>첫번째 리뷰를 달아주세요</WhenNoReviewContent>
        </WhenNoReview>
      ) : (
        comment.reverse().map((userComment, index) => {
          return <Comment key={index} userComment={userComment}></Comment>;
        })
      )}
    </Detail3>
  );
};
function mapStateToProps(state, ownProps) {
  console.log(state);
  return { ...state, ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
    handleUserHeart: (cafe) => dispatch(actionCreators.changeUserHeart(cafe)),
    handleUserMyComment: (cafe) =>
      dispatch(actionCreators.changeUserComment(cafe)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentComment);
