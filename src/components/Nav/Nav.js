import './Nav.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SignIn from '../Signin/SignIn';
import { actionCreators } from '../../reducer/store';
import { authService, dbService } from '../../firebase/mainbase';
import { Link } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import { useHistory } from 'react-router-dom';
import logo from './navLogo.png';
import styled from 'styled-components';
const LogOut = styled.span`
  margin-left: 30px;
  cursor: pointer;
`;

const LogoImg = styled.img`
  height: 35px;
`;
const NavStyle = styled.div`
  z-index: 4;
`;

const Nav = ({ state, userHandler }) => {
  // const [Login, setLogin] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const history = useHistory();
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLogin(true);
        const checkDB = await dbService.collection('users').doc(user.uid).get();
        const data = checkDB.data();
        userHandler({ ...data });
      } else {
        setIsLogin(false);
      }
    });
  }, []);
  const handleLogOut = () => {
    authService.signOut();
    userHandler(null);
    history.push('/');
  };
  const openSignin = () => {
    setShowSignin(true);
    // document.body.style.overflow = 'hidden'; // 모달창이 열리면 스크롤 고정
  };
  const closeSignin = () => {
    setShowSignin(false);
    // document.body.style.overflow = 'unset'; // 스크롤 고정 해제
  };
  const openSignup = () => {
    setShowSignup(true);
    // document.body.style.overflow = 'hidden'; // 모달창이 열리면 스크롤 고정
  };
  const closeSignup = () => {
    setShowSignup(false);
    // document.body.style.overflow = 'unset'; // 스크롤 고정 해제
  };
  return (
    <NavStyle>
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
      <div className="header">
        <span className="logo">
          <Link to="/">
            <LogoImg src={logo}></LogoImg>
          </Link>
        </span>
        <div className="login">
          {isLogin ? (
            <span className="mypage-btn">
              <Link className="mypage-btn-a" to="/mypage">
                마이페이지
              </Link>

              <LogOut className="mypage-btn-b" onClick={handleLogOut}>
                로그아웃
              </LogOut>
            </span>
          ) : (
            <>
              <span className="login-btn" onClick={openSignin}>
                로그인
              </span>
              {/* <div className onClick={openSignin}>
                게스트 로그인
              </div> */}
            </>
          )}
        </div>
      </div>
    </NavStyle>
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
