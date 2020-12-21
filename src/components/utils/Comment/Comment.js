import Tag from '../Tag/index';
import Scope from '../Scope/index';
import styled from 'styled-components';
import { ImageModal } from '../ImageModal/ImageModal';
import enlargeImg from '../CommentWrite/images/enlarge.png';
import commentLoading from './commentLoading.svg';
import CommentWrite from '../CommentWrite/CommentWrite';
import { connect } from 'react-redux';
import { actionCreators } from '../../../reducer/store';
import { useEffect, useState } from 'react';
import { dbService, storageService } from '../../../firebase/mainbase';
import defaultUser from './defaultUser.png';

const CommentStyle = styled.div`
  display: block;
  margin: 0 auto 10px auto;
  min-width: 400px;
  max-width: 800px;
  width: 50%;
  min-width: 700px;
  height: auto;
  padding-top: 50px;
  transition: 0.2s;
  :hover {
    background-color: #efefef;
    transition: 0.2s;
  }
`;
const ChangeComment = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  right: 90px;
  bottom: 20px;
`;

const TimeStamp = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.85rem;
  position: relative;
`;

const UserAndScope = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 4.5fr 3fr 3fr 1fr 1fr;
  align-items: center;
  padding-left: 5%;
  justify-content: center;
`;

const UserProfile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 15px;
  position: relative;
  border: 1px solid #555555;
`;

const DeleteButton = styled.button`
  /* display: inline-block;
  text-align: center;
  text-decoration: none;
  position: absolute;
  margin-left: 10%;
  
   */
  border: none;
  background-color: inherit;
  color: #222222;
  transition: 0.2s;
  cursor: pointer;
  :hover {
    color: #222222;
    font-size: 0.9rem;
    transition: 0.2s;
  }
  :focus {
    color: #222222;
    outline: 0;
    font-size: 0.9rem;
    transition: 0.2s;
  }
`;
const ModifyButton = styled.button`
  /* display: inline-block;
  margin-left: 14%;
  text-decoration: none;
  position: absolute;
  */
  border: none;
  background-color: inherit;
  color: #222222;
  transition: 0.2s;
  cursor: pointer;
  :hover {
    color: #222222;
    font-size: 0.9rem;
    transition: 0.2s;
  }
  :focus {
    color: #222222;
    outline: 0;
    font-size: 0.9rem;
    transition: 0.2s;
  }
`;

const UserName = styled.span`
  justify-items: start;
  margin-left: 1%;
`;
const ScopeContainer = styled.span`
  margin-left: 30px;
  position: relative;
  top: 2px;
`;
const TagWrapper = styled.div`
  margin-top: 13px;
  padding-left: 8%;
`;
const CommentInput = styled.div`
  margin-top: 10px;
  margin-left: 8%;
  padding-left: 2%;
  padding-top: 1%;
  width: 80%;
  height: auto;
  min-height: 50px;
  word-break: break-all;
  background-color: #f2f2f2;
  border-radius: 10px;
`;
const CommentImages = styled.div`
  margin-top: 13px;
  margin-left: 7%;
`;

const UploadedImgCover = styled.span`
  background-color: rgba(207, 204, 201, 0.61);
  position: absolute;
  width: 102px;
  height: 102px;
  margin-top: 1px;
  margin-left: 11px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s linear, opacity 0.2s linear;
`;
const Uploaded = styled.span`
  display: inline-block;
  width: 122px;
  height: 122px;
  margin: 0px 10px 0px 10px;
  &:hover ${UploadedImgCover} {
    visibility: visible;
    opacity: 1;
  }
`;
const UploadedImg = styled.img`
  border: 1px solid #d1d1d1;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 0px 10px 0px 10px;
  /* background-image: ${(props) => 'url(' + props.img + ')'};
  background-size: 100%; */
`;
const EnlargeImg = styled.img`
  width: 17px;
  position: absolute;
  margin-top: 75px;
  margin-left: 10px;
`;
const Divide = styled.div`
  padding-top: 5px;
  border-bottom: 1px solid #cccccc;
  margin: auto auto auto auto;
  width: 93%;
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

const Detail3 = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  max-width: 1500px;
  position: relative;
  background: #fafafa;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin-top: 5rem;
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
`;

const Comment = ({
  handleImageEnlarge,
  userComment,
  currentCafe,
  user,
  currentCafeComment,
  setCommentModal,
  setBeforeModify,
}) => {
  const [images, setImages] = useState([commentLoading, commentLoading]);
  const [imageModal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const [userProfileImg, setUserProfileImg] = useState(defaultUser);

  useEffect(() => {
    setImages(userComment.userImg);
    if (userComment.userEmail) {
      dbService
        .collection('users')
        .where('email', '==', userComment.userEmail)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setUserProfileImg(doc.data().photoURL);
          });
        });
    } else {
      dbService
        .collection('users')
        .where('displayName', '==', userComment.username)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            setUserProfileImg(doc.data().photoURL);
          });
        });
    }
  }, []);
  const handleModal = () => {
    setCommentModal((pres) => !pres);
  };

  const deleteComment = async () => {
    try {
      await dbService
        .collection('CafeComment')
        .doc(`${userComment.cafeId}&${userComment.commentId}`)
        .delete();
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('CafeComment Delete Fail :' + error);
    }

    try {
      let cafeCommentArr = [];
      const data = await dbService.collection('CafeComment').get();
      data.forEach((commentData) => {
        if (currentCafe.cafeid === commentData.data().cafeId) {
          cafeCommentArr.push(commentData.data());
        }
      });
      currentCafeComment(cafeCommentArr);
    } catch (error) {
      console.error('CafeComment get Error :' + error);
    }
    setCommentModal(false);
  };

  const modifyComment = async () => {
    try {
      const data = await dbService
        .collection('CafeComment')
        .doc(`${userComment.cafeId}&${userComment.commentId}`)
        .get();

      const tempObj = await data.data();
      setBeforeModify(tempObj);
      setCommentModal((pres) => !pres);
    } catch (error) {
      console.error(`can't find ModifyComment:` + error);
    }
  };
  const returnHistoryTime = (time) => {
    let beforeTime = new Date().getTime() - time;
    beforeTime = parseInt(beforeTime / 1000);
    if (beforeTime < 60) {
      // 초
      return '1분 전';
    } else if (
      (1 <= parseInt(beforeTime / 60)) &
      (parseInt(beforeTime / 60) < 60)
    ) {
      // 분
      return `${parseInt(beforeTime / 60)}분 전`;
    } else if (
      (1 <= parseInt(beforeTime / 60 / 60)) &
      (parseInt(beforeTime / 60 / 60) < 24)
    ) {
      // 시
      return `${parseInt(beforeTime / 60 / 60)}시간 전`;
    } else if (
      (1 <= parseInt(beforeTime / 60 / 60 / 24)) &
      (parseInt(beforeTime / 60 / 60 / 24) < 31)
    ) {
      // 일
      return `${parseInt(beforeTime / 60 / 60 / 24)}일 전`;
    } else if (
      (1 <= parseInt(beforeTime / 60 / 60 / 24 / 31)) &
      (parseInt(beforeTime / 60 / 60 / 24 / 31) < 12)
    ) {
      // 월
      return `${parseInt(beforeTime / 60 / 60 / 24 / 31)}달 전`;
    } else {
      // 년
      return `${parseInt(beforeTime / 60 / 60 / 24 / 31 / 12)}년 전`;
    }
  };
  return (
    <>
      {/* {commentModal ? (
        <>
          <BackGroundCover>
            <CommentWrite
              beforeModify={beforeModify}
              handleModal={handleModal}
            ></CommentWrite>
          </BackGroundCover>
        </>
      ) : (
        ''
      )} */}
      <CommentStyle>
        <ChangeComment>
          {!user ? (
            ''
          ) : userComment.username === user.displayName ? (
            <ModifyButton onClick={modifyComment}>수정</ModifyButton>
          ) : userComment.userEmail === user?.email ? (
            <ModifyButton onClick={modifyComment}>수정</ModifyButton>
          ) : (
            ''
          )}

          {!user ? (
            ''
          ) : userComment.username === user.displayName ? (
            <DeleteButton onClick={deleteComment}>삭제</DeleteButton>
          ) : userComment.userEmail === user.email ? (
            <DeleteButton onClick={deleteComment}>삭제</DeleteButton>
          ) : (
            ''
          )}
        </ChangeComment>

        <UserAndScope>
          <UserProfile src={userProfileImg}></UserProfile>
          <UserName>
            {userComment.username ? userComment.username : '게스트'}
          </UserName>

          <ScopeContainer>
            <Scope
              isScope={true}
              size="20px"
              scope={userComment.userStar ? userComment.userStar : -1}
            ></Scope>
          </ScopeContainer>

          <TimeStamp>
            {userComment.commentTime
              ? returnHistoryTime(userComment.commentTime)
              : ''}
          </TimeStamp>
        </UserAndScope>

        <TagWrapper>
          {userComment.userTag
            ? userComment.userTag.map((tag) => {
                return (
                  <Tag
                    key={tag}
                    tagName={tag}
                    isSmall={true}
                    color="white"
                  ></Tag>
                );
              })
            : ''}
        </TagWrapper>
        {userComment.userComment ? (
          <CommentInput>{userComment.userComment}</CommentInput>
        ) : (
          ''
        )}

        <CommentImages>
          {userComment.userImg
            ? userComment.userImg.map((img, index) => {
                return (
                  <Uploaded key={index}>
                    <UploadedImgCover>
                      <EnlargeImg
                        data-index={index}
                        onClick={(e) => {
                          handleImageEnlarge(images[e.target.dataset.index]);
                        }}
                        src={enlargeImg}
                      ></EnlargeImg>
                    </UploadedImgCover>
                    <UploadedImg src={img}></UploadedImg>
                  </Uploaded>
                );
              })
            : ''}
        </CommentImages>

        <Divide></Divide>
      </CommentStyle>
    </>
  );
};

function mapStateToProps(state, ownProps) {
  return { ...state, ownProps };
}

function mapDispatchToProps(dispatch) {
  return {
    currentCafeComment: (comment) =>
      dispatch(actionCreators.currentCafeComment(comment)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
