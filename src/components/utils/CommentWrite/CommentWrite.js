import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ImageModal } from '../ImageModal/ImageModal';
import Scope from '../Scope/index';
import Tag from '../Tag/index';
import { connect } from 'react-redux';
import Blank from './images/BlankImg.png';
import enlargeImg from './images/enlarge.png';
import removeImg from './images/remove.png';
import loading from './images/loading.svg';
import { storageService } from '../../../firebase/mainbase';

const CommentWriteStyle = styled.div`
  display: block;
  margin: auto;
  min-width: 400px;
  max-width: 1000px;

  width: 60%;
  position: relative;
  top: 10%;
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
  margin-top: 25px;
  display: inline-block;
`;
const ScopeContainer = styled.span`
  margin-left: 10px;
`;
const TagWrapper = styled.div`
  position: relative;
  margin-top: 15px;
  margin-left: 6%;
`;
const CommentInput = styled.textarea`
  resize: none;
  margin-left: 6%;
  width: 80%;
  height: 200px;
  margin-top: 20px;
`;
const CommentImgWrapper = styled.div`
  min-width: 400px;
  width: 70%;
  height: 30%;
  margin-bottom: 40px;
  position: relative;
  display: block;
  left: 5%;
  @media (max-width: 1750px) {
    display: inline-block;
  }
  @media (max-width: 980px) {
    left: 10%;
  }
`;
const ButtonWrapper = styled.span`
  display: flex;
  margin: 5px 0px 20px 0px;
  flex-direction: column;

  position: absolute;
  bottom: 2%;
  left: 100%;
`;
const CommentSubmitButton = styled.button`
  width: 110px;
  height: 40px;
  /* @media (max-width: 1750px) {
    position: absolute;
    bottom: 30%;
    margin: 30px;
    left: 95%;
  }
  @media (max-width: 1695px) {
    position: absolute;
    bottom: 30%;
    margin: 30px;
    left: 90%;
  }
  @media (max-width: 1290px) {
    position: absolute;
    bottom: 500px;
    left: 80%;
  }
  @media (max-width: 980px) {
    position: relative;
    left: 160px;
    float: none;
  } */
`;
const CommentOutButton = styled(CommentSubmitButton)`
  margin-top: 30px;
`;
const UploadImg = styled.label`
  display: inline-block;
  width: 120px;
  height: 120px;
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
  width: 122px;
  height: 122px;
  margin-top: 11px;
  margin-left: 11px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.2s linear, opacity 0.2s linear;
`;
const RemoveImg = styled.img`
  width: 25px;
  position: absolute;
  margin-left: 90px;
  margin-top: 5px;
`;
const EnlargeImg = styled.img`
  width: 20px;
  position: absolute;
  margin-top: 93px;
  margin-left: 9px;
`;

const UploadedImg = styled.img`
  border: 1px solid #d1d1d1;
  display: inline-block;
  width: 120px;
  height: 120px;
  margin: 10px 30px 15px 10px;
`;

const Uploaded = styled.span`
  display: inline-block;
  width: 122px;
  height: 122px;
  margin: 10px 30px 15px 10px;
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

const CommentWrite = (props) => {
  const [selectedTags, setTags] = useState([]);
  const [scope, setScope] = useState(-1);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([]);
  const [imageModal, setModal] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const upLoadTaskHandler = (inputImage) => {
    if (images.length > 2) {
      return;
    }
    setImages((preImages) => [...preImages, loading]);
    const upLoadTask = storageService
      .ref(`commentImage/${inputImage.name}`)
      .put(inputImage);
    upLoadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storageService
          .ref('commentImage')
          .child(inputImage.name)
          .getDownloadURL()
          .then((url) => {
            setImages((preImages) => {
              preImages.splice(preImages.length - 1, 1, url);
              return [...preImages];
            });
          });
      }
    );
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
          <Scope setScope={setScope}></Scope>
        </ScopeContainer>
      </UserAndScope>

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
          setComment(e.target.value);
        }}
      ></CommentInput>
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
            <Uploaded>
              <UploadedImgCover>
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
        <ButtonWrapper>
          <CommentSubmitButton>제출</CommentSubmitButton>
          <CommentOutButton onClick={props.handleModal}>
            나가기{' '}
          </CommentOutButton>
        </ButtonWrapper>
      </CommentImgWrapper>
      {imageModal ? (
        <ImageModal image={currentImg} unEnlarge={handleUnEnlarge}></ImageModal>
      ) : (
        ''
      )}
    </CommentWriteStyle>
  );
};

export default CommentWrite;
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
