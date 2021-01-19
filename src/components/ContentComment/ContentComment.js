import Comment from '../utils/Comment/index';
import CommentWrite from '../utils/CommentWrite/index';
import { cafeComment } from '../../cafeInfos';
import styled from 'styled-components';
import { ImageModal } from '../utils/ImageModal/ImageModal';
import { useState, useEffect, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import { actionCreators } from '../../reducer/store';
import Button from '../utils/Button/Button';
import reviewImg from './review.svg';
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { dbService } from '../../firebase/mainbase';
import SignIn from '../Signin/SignIn';
import SignUp from '../SignUp/SignUp';
import Like from '../utils/Like/Like';
import Fade from 'react-reveal/Fade';
const Detail3 = styled.div`
  width: 865px;
  height: auto;
  min-height: 600px;
  margin: 1.5rem 0 0 0;
  max-width: 1200px;
  background: #fafafa;
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border: 1px solid #dfdfdf;
  /* box-shadow: 0.5px 2px 5px 0px #afafaf; */
  z-index: 1;
  @media (max-width: 1400px) {
    margin: 3rem auto auto auto;
    width: 78%;
  }
`;
const BackGroundCover = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(220, 220, 220, 0.94);
  z-index: 5;
`;

const ButtonStyle = styled.span`
  margin-top: 20px;
  position: relative;
  display: inline-block;
  left: 70%;
  margin-bottom: 80px;
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
const CommentWraper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  min-height: 50px;
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
  const [currentImg, setCurrentImg] = useState('');
  const [currentImageModal, setImageModal] = useState(false);
  const [beforeModify, setBeforeModify] = useState(false);
  const handleImageEnlarge = (image) => {
    setCurrentImg(image);
    setImageModal((pres) => !pres);
  };

  const handleUnEnlarge = () => {
    setImageModal((pres) => !pres);
  };
  useEffect(() => {
    if (!!user & !!currentCafe) {
      let filtered = comment?.filter(
        (com) => com.username === user.displayName
      );
      let userCommentArray = user.comment ? user.comment : [];

      if (
        (filtered?.length === 0) &
        (userCommentArray.indexOf(currentCafe.cafeName) !== -1)
      ) {
        let tempComment = user.comment ? user.comment : [];
        tempComment.splice(user.comment.indexOf(currentCafe.cafeName), 1);
        handleUserMyComment(tempComment);
        dbService.collection('users').doc(user.uid).update({
          comment: tempComment,
        });
      }
    }
  }, [comment]);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [!user]);
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
      {currentImageModal ? (
        <ImageModal image={currentImg} unEnlarge={handleUnEnlarge}></ImageModal>
      ) : (
        ''
      )}
      {commentModal ? (
        <>
          <BackGroundCover>
            <CommentWrite
              handleModal={handleModal}
              beforeModify={beforeModify}
            ></CommentWrite>
          </BackGroundCover>
        </>
      ) : (
        ''
      )}
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
            marginLeft="6px"
            imgSize="40px"
            fontSize="13px"
            flexDirection="column"
            iconRight="1px"
            iconTop="-1px"
          ></Button>
        </ButtonStyleReview>
      </div>
      <CommentWraper>
        {!comment | (comment?.length === 0) ? (
          <WhenNoReview>
            <WhenNoReviewTitle>아직 작성된 리뷰가 없어요</WhenNoReviewTitle>
            <WhenNoReviewContent>첫번째 리뷰를 달아주세요</WhenNoReviewContent>
          </WhenNoReview>
        ) : (
          comment.map((userComment, index) => {
            return (
              <Fade key={userComment.commentId} top collpase>
                <Comment
                  handleImageEnlarge={handleImageEnlarge}
                  key={userComment.commentId}
                  userComment={userComment}
                  setCommentModal={setModal}
                  setBeforeModify={setBeforeModify}
                ></Comment>
              </Fade>
            );
          })
          // .reverse()
        )}
      </CommentWraper>
    </Detail3>
  );
};
function mapStateToProps(state, ownProps) {
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
