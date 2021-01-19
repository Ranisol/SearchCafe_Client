import { useEffect, useMemo, useState } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import { actionCreators } from '../../../reducer/store';
import { ImageModal } from '../ImageModal/ImageModal';
import Scope from '../Scope/index';
import Tag from '../Tag/index';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import Blank from './images/BlankImg.png';
import enlargeImg from './images/enlarge.png';
import removeImg from './images/remove.png';
import loading from './images/loading.svg';
import { storageService, dbService } from '../../../firebase/mainbase';

const CommentWriteStyle = styled.div`
  display: block;
  margin: auto;
  min-width: 500px;
  max-width: 850px;
  border-radius: 20px;
  width: 55%;
  position: relative;
  top: 15%;
  height: auto;

  background-color: #fafafa;
  z-index: 2;
`;
const UserAndScope = styled.h3`
  display: inline;
  font-weight: initial;
  margin-left: 6%;
`;
const CommentTitle = styled.span`
  margin-top: 30px;
  margin-left: 20px;
  display: inline-block;
`;
const ScopeContainer = styled.span`
  margin-left: 10px;
  position: relative;
  top: 5px;
`;
const TagWrapper = styled.div`
  position: relative;
  margin-top: 5px;
  margin-left: 2%;
`;
const CommentContainer = styled.div`
  width: 88%;
  height: 220px;
  border: 1px solid #9d9d9d;
  margin: auto;
  margin-top: 15px;
  border-radius: 15px;
  background-color: #fdfdfd;
  position: relative;
  top: 20px;
`;
const CommentInput = styled.textarea`
  resize: none;
  margin-left: 2.5%;
  width: 95%;
  height: 140px;
  margin-top: 20px;
  border: initial;
  background-color: inherit;

  :focus {
    outline: 0;
  }
`;
const CommentImgWrapper = styled.div`
  min-width: 400px;
  width: 70%;
  height: 30%;
  bottom: 10px;
  position: relative;
  display: flex;

  left: 7%;
  @media (max-width: 1750px) {
    display: inline-block;
  }
  @media (max-width: 980px) {
    left: 10%;
  }
  @media (max-width: 840px) {
    margin: auto;

    left: 0%;
  }
`;

const ButtonWrapper = styled.span`
  display: flex;
  margin: 0px 0px 5px 0px;
  flex-direction: row;
  position: relative;
  left: 60%;
  bottom: 20px;

  @media (max-width: 1155px) {
    left: 50%;
  }
  @media (max-width: 970px) {
    left: 40%;
  }
  @media (max-width: 840px) {
    justify-content: center;
    left: 0%;
  }
`;
const CommentSubmitButton = styled.button`
  width: 110px;
  height: 40px;
`;
const CommentOutButton = styled(CommentSubmitButton)`
  margin-top: 30px;
`;
const UploadImg = styled.label`
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 20px 20px 15px 20px;
  border: 1px solid #d1d1d1;
  background-size: cover;
  background-image: url(${Blank});
  background-color: #f1f1f1;
  transition: 0.2s;
  :hover {
    background-color: #dfdfdf;
    transition: 0.2s;
  }
`;
const UploadImgInput = styled.input`
  display: none;
`;

const UploadedImgCover = styled.span`
  background-color: rgba(207, 204, 201, 0.61);
  position: absolute;
  width: 102px;
  height: 102px;
  margin-top: 11px;
  margin-left: 1px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s linear, opacity 0.2s linear;
`;
const RemoveImg = styled.img`
  width: 25px;
  position: absolute;
  margin-left: 75px;
  margin-top: 5px;
`;
const EnlargeImg = styled.img`
  width: 20px;
  position: absolute;
  margin-top: 75px;
  margin-left: 9px;
`;
const UploadedImg = styled.img`
  border: 1px solid #d1d1d1;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin: 10px 0px 10px 0px;
`;
const Limit = styled.div`
  position: relative;
  left: 18%;
  bottom: 20px;
  color: ${(props) => (props.error ? 'red' : '#7f7f7f')};
  @media (max-width: 1155px) {
    bottom: 185px;
    left: 150px;
  }
`;
const LimitComment = styled.div`
  margin-top: 2px;
  position: relative;
  left: 85%;
  top: 30px;
  color: ${(props) => (props.error ? 'red' : '#7f7f7f')};
`;

const UploadImgContainer = styled.div``;
const Uploaded = styled.span`
  display: inline-block;
  width: 122px;
  height: 122px;
  margin: 10px 2px 0px 2px;
  &:hover ${UploadedImgCover} {
    visibility: visible;
    opacity: 1;
  }
`;

const commentTags = [
  '커피가 맛있는',
  '디저트가 맛있는',
  '편안한',
  '작업하기 좋은',
  '대화하기 좋은',
];

const CommentWrite = ({
  currentCafe,
  comment,
  user,
  handleModal,
  currentCafeComment,
  beforeModify,
  userMyCommentHandler,
}) => {
  const [selectedTags, setTags] = useState([]);
  const [scope, setScope] = useState(-1);
  const [submitComment, setSubmitComment] = useState('');
  const [images, setImages] = useState([]);
  const [imageModal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [limitImgError, setLimitImgError] = useState(false);
  const [limitCommentError, setLimitCommentError] = useState(false);
  const [modifyObj, setModifyObj] = useState({});
  const [fillAllContent, setFillAllContent] = useState(false);
  useEffect(() => {
    if (beforeModify) {
      setModifyObj(beforeModify);
      setImages(beforeModify.userImg);
      setTags(beforeModify.userTag);
      setScope(beforeModify.userStar);
      setSubmitComment(beforeModify.userComment);
    }
  }, []);
  useEffect(() => {
    if ((scope !== -1) & (submitComment.length !== 0)) {
      setFillAllContent(true);
    } else {
      setFillAllContent(false);
    }
  }, [scope, submitComment]);

  useMemo(() => {
    if (submitComment.length > 300) {
      setSubmitComment(submitComment.slice(0, 300));
      setLimitCommentError(true);

      let timer = setTimeout(() => {
        setLimitCommentError(false);
      }, 1500);
    }
  }, [submitComment]);

  const updateCafeStarScore = async (cafeId) => {
    const data = await dbService
      .collection('CafeInformation')
      .where('id', '==', cafeId)
      .update({
        userComment:
          submitComment.length === 0 ? beforeModify.userComment : submitComment,
        userImg: images,
        userStar: scope ? scope : beforeModify.userStar,
        userTag: selectedTags,
      });
  };
  const submitCommentWrite = async () => {
    updateUserMyComment();
    await settingCommentData();
    handleModal();
    await refreshCommentData();
  };
  const submitModifyCommentWrite = async () => {
    await updateCommentData();
    await refreshCommentData();
    handleModal();
  };

  const refreshCommentData = async () => {
    try {
      let cafeCommentArr = [];
      const data = await dbService
        .collection('CafeComment')
        .orderBy('commentId', 'asc')
        .get();
      data.forEach((commentData) => {
        if (currentCafe.cafeid === commentData.data().cafeId) {
          cafeCommentArr.push(commentData.data());
        }
      });
      currentCafeComment(cafeCommentArr);
    } catch (error) {
      console.error('CafeComment get Error :' + error);
    }
  };

  const settingCommentData = async () => {
    // console.log(
    //   'Set Cafe Info :' + `${currentCafe.cafeid}&${comment.length + 1}`
    // );

    await dbService
      .collection('CafeComment')
      .doc(`${currentCafe.cafeid}&${comment.length + 1}`)
      .set({
        cafeId: currentCafe.cafeid,
        commentId: comment.length + 1,
        userComment: submitComment,
        userImg: images,
        userStar: scope,
        username: user.displayName,
        userEmail: user.email,
        userTag: selectedTags,
        commentTime: `${new Date().getTime()}`,
      });
    // 처음 올릴떄 처리
    if (comment.length + 1 === 1) {
      let averageStar = Math.round(scope / (comment.length + 1));
      // console.log('averageStar :' + averageStar);
      await dbService
        .collection('CafeInformation')
        .doc(`${currentCafe.cafeName}`)
        .update({
          cafeStar: averageStar,
        });
    } else {
      // 처음이 아닐때 평균값 처리
      const data = await dbService.collection('CafeComment').get();
      let accumulateStar = 0;
      let length = 0;
      data.forEach((doc) => {
        if (doc.data().cafeId === currentCafe.cafeid) {
          length++;
          accumulateStar += doc.data().userStar;
        }
      });
      let averageStar = Math.round(accumulateStar / length);
      // console.log('averageStar :' + averageStar);
      await dbService
        .collection('CafeInformation')
        .doc(`${currentCafe.cafeName}`)
        .update({
          cafeStar: averageStar,
        });
    }
  };
  const updateCommentData = async () => {
    await dbService
      .collection('CafeComment')
      .doc(`${beforeModify.cafeId}&${beforeModify.commentId}`)
      .update({
        userComment:
          submitComment.length === 0 ? beforeModify.userComment : submitComment,
        userImg: images,
        userStar: scope ? scope : beforeModify.userStar,
        userTag: selectedTags,
        commentTime: `${new Date().getTime()}`,
      });
    // 평균값
    const data = await dbService.collection('CafeComment').get();
    let accumulateStar = 0;
    let length = 0;
    data.forEach((doc) => {
      if (doc.data().cafeId === beforeModify.cafeId) {
        length++;
        accumulateStar += doc.data().userStar;
      }
    });
    //평균값 처리
    let averageStar = Math.round(accumulateStar / length);
    await dbService
      .collection('CafeInformation')
      .doc(`${currentCafe.cafeName}`)
      .update({
        cafeStar: averageStar,
      });
  };
  const updateUserMyComment = () => {
    if (!user.comment | (user.comment?.indexOf(currentCafe.cafeName) === -1)) {
      let tempMyComment = user.comment ? user.comment : [];
      tempMyComment.push(currentCafe.cafeName);
      userMyCommentHandler(tempMyComment);
      // console.log('userMycommentHandler ??', tempMyComment);
      dbService.collection('users').doc(user.uid).update({
        comment: tempMyComment,
      });
    }
  };
  const getUrlFromFirestore = async (inputImage) => {
    if (images.length > 2) {
      setLimitImgError(true);
      let imgTimer = setTimeout(() => {
        setLimitImgError(false);
      }, 1500);
      return;
    }
    setImages((preImages) => [...preImages, loading]);
    let nowDate = new Date();
    let imageName = `${
      inputImage.name
    } ${nowDate.getDate()}day ${nowDate.getHours()}hour ${nowDate.getSeconds()}second`;
    const upLoadTask = storageService
      .ref(`commentImage/${imageName}`)
      .put(inputImage);
    return new Promise((res, rej) => {
      upLoadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
          rej();
        },
        () => {
          storageService
            .ref('commentImage')
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              setImages((preImages) => {
                return [...preImages.slice(0, preImages.length - 1), url];
              });
            });
        }
      );
    });
  };

  const handleTags = (tag) => {
    if (selectedTags.indexOf(tag) === -1) {
      setTags((pres) => {
        let tempTags = pres;
        tempTags.push(tag);
        setTags(tempTags);
      });
    } else {
      setTags((pres) => {
        let tempTags = pres;
        tempTags.splice(pres.indexOf(tag), 1);
        setTags(tempTags);
      });
    }
  };
  const handleImageRemove = (index) => {
    setImages((pres) => {
      pres.splice(index, 1);
      return [...pres];
    });
  };
  const handleImageEnlarge = (index) => {
    setCurrentImg(images[index]);
    setModal((pres) => !pres);
  };
  const handleUnEnlarge = () => {
    setModal((pres) => !pres);
  };

  return (
    <CommentWriteStyle>
      <UserAndScope>
        <CommentTitle>카페에 대한 리뷰를 작성해주세요</CommentTitle>
        <ScopeContainer>
          <Scope
            setScope={setScope}
            modifyScope={beforeModify ? beforeModify.userStar : -1}
          ></Scope>
        </ScopeContainer>
      </UserAndScope>
      <CommentContainer>
        <TagWrapper>
          {commentTags.map((tag) => (
            <span
              key={tag}
              onClick={() => {
                handleTags(tag);
              }}
            >
              <Tag
                tagName={tag}
                isSmall={true}
                color="white"
                isButton={true}
                modifyTag={beforeModify ? beforeModify.userTag : ''}
              ></Tag>
            </span>
          ))}
        </TagWrapper>
        <CommentInput
          onChange={(e) => {
            setSubmitComment(e.target.value);
          }}
        >
          {beforeModify ? beforeModify.userComment : ''}
        </CommentInput>
      </CommentContainer>
      <LimitComment>{submitComment.length}/300</LimitComment>
      <CommentImgWrapper>
        <UploadImg>
          <UploadImgInput
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                getUrlFromFirestore(e.target.files[0]);
              }
            }}
          ></UploadImgInput>
        </UploadImg>

        {images.map((image, index) => {
          return (
            <Uploaded key={index}>
              <UploadedImgCover key={index}>
                <RemoveImg
                  data-index={index}
                  onClick={(e) => {
                    handleImageRemove(e.target.dataset.index);
                  }}
                  src={removeImg}
                ></RemoveImg>
                <EnlargeImg
                  data-index={index}
                  onClick={(e) => {
                    handleImageEnlarge(e.target.dataset.index);
                  }}
                  src={enlargeImg}
                ></EnlargeImg>
              </UploadedImgCover>
              <UploadedImg src={image} key={image.name}></UploadedImg>
            </Uploaded>
          );
        })}
        <ButtonWrapper></ButtonWrapper>
      </CommentImgWrapper>
      <Limit error={limitImgError}>{images.length}/3</Limit>
      <ButtonWrapper>
        <span
          onClick={
            !fillAllContent
              ? ''
              : beforeModify
              ? submitModifyCommentWrite
              : submitCommentWrite
          }
        >
          <Button
            color={!fillAllContent ? '#dfdfdf' : undefined}
            hoverColor={!fillAllContent ? 'dfdfdf' : undefined}
            name="작성하기"
          ></Button>
        </span>
        <span onClick={handleModal}>
          <Button hoverColor="#4f4f4f" color="#afafaf" name="취소"></Button>
        </span>
      </ButtonWrapper>
      {imageModal ? (
        <ImageModal image={currentImg} unEnlarge={handleUnEnlarge}></ImageModal>
      ) : (
        ''
      )}
    </CommentWriteStyle>
  );
};

function mapStateToProps(state, ownProps) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
    userProfileHandler: (profile) =>
      dispatch(actionCreators.changeUserProfile(profile)),
    currentCafeComment: (comment) =>
      dispatch(actionCreators.currentCafeComment(comment)),
    userMyCommentHandler: (cafes) => {
      dispatch(actionCreators.changeUserComment(cafes));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentWrite);

// const getUrlFromFirestore = (inputImage) => {
//   if (images.length > 2) {
//     setLimitImgError(true);
//     let imgTimer = setTimeout(() => {
//       setLimitImgError(false);
//     }, 1500);
//     return;
//   }
//   setImages((preImages) => [...preImages, loading]);
//   const reader = new FileReader();
//   reader.onloadend = (finishedEvent) => {
//     const {
//       currentTarget: { result },
//     } = finishedEvent;
//     setImages((preImages) => {
//       preImages.splice(preImages.length - 1, 1, result);
//       return [...preImages];
//     });
//     setImagesRowData((pres) => [...pres, inputImage]);
//   };
//   reader.readAsDataURL(inputImage);
// };
