import Button from '../Button/Button';
import SignIn from '../../Signin/SignIn';
import SignUp from '../../SignUp/SignUp';
import likeImg from './like.png';
import likedImg from './liked.png';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../../../reducer/store';
import styled from 'styled-components';
import { dbService } from '../../../firebase/mainbase';

const ButtonStyle = styled.span``;

const Like = ({ user, currentCafe, handleUserHeart }) => {
  const handleLike = async () => {
    if (!!user & !!currentCafe) {
      if (like === likeImg) {
        setLike(likedImg);
        let tempHeart = [];
        user.heart ? (tempHeart = user.heart) : (tempHeart = []);
        tempHeart.push(currentCafe.cafeName);

        dbService.collection('users').doc(user.uid).update({
          heart: tempHeart,
        });
        handleUserHeart(tempHeart);
      } else {
        setLike(likeImg);
        let tempHeart = user.heart;
        tempHeart.splice(tempHeart.indexOf(currentCafe.cafeName), 1);

        dbService.collection('users').doc(user.uid).update({
          heart: tempHeart,
        });
        handleUserHeart(tempHeart);
      }
      return;
    } else if (!user) {
      openSignin();
    }
  };
  useEffect(() => {
    console.log(currentCafe);
    if (!!user?.heart && !!currentCafe) {
      let userWasLiked = user.heart.filter(
        (cafeName) => cafeName === currentCafe.cafeName
      );
      console.log(userWasLiked);
      if (userWasLiked.length !== 0) {
        setLike(likedImg);
      } else {
        setLike(likeImg);
      }
    }
  }, [!!user?.heart && !!currentCafe, currentCafe?.cafeName]);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(!!user);
  const [like, setLike] = useState(likeImg);
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
    <>
      <SignIn
        show={showSignin}
        handleClose={closeSignin}
        handleOpen={openSignup}
      />
      <SignUp
        show={showSignup}
        handleClose={closeSignup}
        handleOpen={openSignin}
      />{' '}
      <ButtonStyle onClick={handleLike}>
        <div>
          <span>
            <span></span>
          </span>
        </div>
        <Button
          name="찜하기"
          icon={like}
          color="inherit"
          hoverColor="inherit"
          fontColor="#8A8A8A"
          hoverFontColor="#8a705a"
          noBorder={true}
          imgSize="22px"
          margin="10px"
          fontSize="17px"
          hoverFontSize={true}
        ></Button>
      </ButtonStyle>
    </>
  );
};
function mapStateToProps(state, ownProps) {
  return { ...state, ownProps };
}
function mapDispatchToProps(dispatch) {
  return {
    handleUserHeart: (cafe) => dispatch(actionCreators.changeUserHeart(cafe)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Like);
