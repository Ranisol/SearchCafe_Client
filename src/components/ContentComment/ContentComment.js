import Comment from '../utils/Comment/index';
import CommentWrite from '../utils/CommentWrite/index';
import { cafeComment } from '../../cafeInfos';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { actionCreators } from '../../reducer/store';

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

const ContentComment = ({ comment }) => {
<<<<<<< HEAD
=======
  console.log(comment);
>>>>>>> 1f899da1fb01df2d349f90afe5542d81ed4e296d
  const [commentModal, setModal] = useState(false);
  const handleModal = () => {
    setModal((pres) => !pres);
  };

  return (
    <Detail3>
      <div className="Line2">REVEIW</div>
      <button onClick={handleModal}>리뷰작성</button>
      {commentModal ? (
        <>
          <BackGroundCover>
            <CommentWrite handleModal={handleModal}></CommentWrite>
          </BackGroundCover>
        </>
      ) : (
        ''
      )}
<<<<<<< HEAD
      {!comment
        ? ''
        : comment.map((userComment, index) => {
            return <Comment key={index} userComment={userComment}></Comment>;
          })}
=======
      {!comment ? (
        <h1>없다</h1>
      ) : (
        comment.map((userComment, index) => {
          console.log('userComment :' + userComment['cafeId']);
          return <Comment key={index} userComment={userComment}></Comment>;
        })
      )}
      {/* {cafeComment.filter((comment) => comment.cafeId === 0).length !== 0
        ? cafeComment
            .filter((comment) => comment.cafeId === 0)
            .map((userComment, index) => (
              <Comment key={index} userComment={userComment}></Comment>
            ))
        : ''} */}
>>>>>>> 1f899da1fb01df2d349f90afe5542d81ed4e296d
    </Detail3>
  );
};
function mapStateToProps(state, ownProps) {
  console.log(state);
<<<<<<< HEAD
  return { ...state };
=======
  return { ...state, ownProps };
>>>>>>> 1f899da1fb01df2d349f90afe5542d81ed4e296d
}

function mapDispatchToProps(dispatch) {
  return {
    userHandler: (user) => dispatch(actionCreators.currentUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentComment);
