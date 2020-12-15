import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
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
  border: 1px solid black;
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
  bottom: 30px;
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
  bottom: 50px;

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
  margin-left: 11px;
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
  margin: 10px 10px 15px 10px;
`;
const Limit = styled.div`
  position: relative;
  left: 14.5%;
  bottom: 10px;
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
  color: ${(props) => (props.error ? 'red' : '#7f7f7f')};
`;

const UploadImgContainer = styled.div``;
const Uploaded = styled.span`
  display: inline-block;
  width: 122px;
  height: 122px;
  margin: 10px 10px 0px 10px;
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
  '바다가 보이는',
];

const CommentWrite = ({ currentCafe, comment, user, handleModal }) => {
  const [selectedTags, setTags] = useState([]);
  const [scope, setScope] = useState(-1);
  const [submitComment, setSubmitComment] = useState('');
  const [images, setImages] = useState([]);
  const [imagesRowData, setImagesRowData] = useState([]);
  const [imageModal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [limitImgError, setLimitImgError] = useState(false);
  const [limitCommentError, setLimitCommentError] = useState(false);

  useMemo(() => {
    if (submitComment.length > 300) {
      setSubmitComment(submitComment.slice(0, 300));
      setLimitCommentError(true);

      let timer = setTimeout(() => {
        setLimitCommentError(false);
      }, 1500);
    }
  }, [submitComment]);
  const submitCommentWrite = async () => {
    async function upLoadTaskPromise(image) {
      const upLoadTask = storageService
        .ref(`commentImage/${image.name}`)
        .put(image);
      return new Promise((res, rej) => {
        upLoadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.log(error);
            rej();
          },
          async () => {
            let url = await storageService
              .ref('commentImage')
              .child(image.name)
              .getDownloadURL();
            res(url);
          }
        );
      });
    }
    console.log('before', images);
    for (let i = 0; i < imagesRowData.length; i++) {
      let name = `${user.email}'s ${
        comment[comment.length - 1].commentId + 1
      }nth comment's ${i}nth image`;
      let url = await upLoadTaskPromise(imagesRowData[i]);
      setImages((pres) => {
        pres[i] = url;
        return pres;
      });
    }
    console.log(setLimitImgError);
    console.log('after', images);
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
      });
    handleModal();
  };

  const upLoadTaskHandler = (inputImage) => {
    if (images.length > 2) {
      setLimitImgError(true);
      let imgTimer = setTimeout(() => {
        setLimitImgError(false);
      }, 1500);
      return;
    }
    setImages((preImages) => [...preImages, loading]);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImages((preImages) => {
        preImages.splice(preImages.length - 1, 1, result);
        return [...preImages];
      });
      setImagesRowData((pres) => [...pres, inputImage]);
    };
    reader.readAsDataURL(inputImage);
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
    setImagesRowData((pres) => {
      pres.splice(index, 1);
      return [...pres];
    });
    console.log(images, imagesRowData);
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
          <Scope setScope={setScope}></Scope>
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
              ></Tag>
            </span>
          ))}
        </TagWrapper>
        <CommentInput
          onChange={(e) => {
            setSubmitComment(e.target.value);
          }}
        ></CommentInput>
      </CommentContainer>
      <LimitComment error={limitCommentError}>
        {submitComment.length}/300
      </LimitComment>
      <CommentImgWrapper>
        <UploadImg>
          <UploadImgInput
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) {
                upLoadTaskHandler(e.target.files[0]);
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
      </CommentImgWrapper>
      <Limit error={limitImgError}>{images.length}/3</Limit>
      <ButtonWrapper>
        <span onClick={submitCommentWrite}>
          <Button name="작성하기"></Button>
        </span>
        <span onClick={handleModal}>
          <Button hoverColor="#4f4f4f" color="#afafaf" name="취소">
            나가기
          </Button>
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
  console.log(state);
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
    userProfileHandler: (profile) =>
      dispatch(actionCreators.changeUserProfile(profile)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentWrite);

// useEffect(() => {
//   getData();
// }, []);
// const getData = async () => {
//   const data = await storageService.ref().child('cafeImage');
//   console.log(data);
// };

// const [isFile, setIsFile] = useState();
// const onFileChange = (e) => {
//   const {
//     target: { files },
//   } = e;
//   const theFile = files[0];
//   const reader = new FileReader();
//   reader.onloadend = (e) => {
//     const {
//       currentTarget: { result },
//     } = e;
//     setIsFile(result);
//   };
//   reader.readAsDataURL(theFile);
// };
// const onSubmit = async (event) => {
//   event.preventDefault();
//   const fileRef = storageService.ref().child(`cafeImage/practice`);
//   const response = await fileRef.putString(isFile, 'data_url');
//   const publirUrl = await response.ref.getDownloadURL();
//   console.log(publirUrl);
// };

// function mapStateToProps(state, ownProps) {
//   return { state };
// }

// export default connect(mapStateToProps)(CommentWrite);
