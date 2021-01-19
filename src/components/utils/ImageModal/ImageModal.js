import styled from 'styled-components';
import unEnlarge from './unEnlarge.png';

const BackGroundCover = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  margin: auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.61);
  z-index: 10;
`;
const ImageContainer = styled.div`
  position: fixed;
  opacity: 0.99;
  top: 5%;
  right: 10%;
  width: 80%;
  height: 90%;
  background-color: black;
  z-index: 20;
`;

const Image = styled.img`
  max-width: 80%;
  max-height: 80%;
  min-width: 500px;
  min-height: 500px;

  // vertically 중앙정렬
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const UnEnlargeIcon = styled.img`
  display: block;
  width: 2.5%;

  position: relative;
  top: 3%;
  left: 94%;
`;

export const ImageModal = (props) => {
  return (
    <>
      <BackGroundCover onClick={props.unEnlarge}></BackGroundCover>
      <ImageContainer>
        <Image src={props.image}></Image>
        <UnEnlargeIcon
          onClick={props.unEnlarge}
          src={unEnlarge}
        ></UnEnlargeIcon>
      </ImageContainer>
    </>
  );
};
