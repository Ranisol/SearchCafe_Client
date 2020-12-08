import styled from 'styled-components';
import SearchImg from './Search.png';
import { useState } from 'react';

const SearchBarStyle = styled.div`
  background: white;
  color: white;
  width: 27rem;
  height: 3rem;
  border-radius: 30px;
  border: initial;
  box-shadow: 1px 1px 1px 0.1px #666666;
  transition: 0.3s;
  display: inline-block;
  :focus {
    outline: 0;
  }
  :hover {
  }
`;
const SearchBarImg = styled.img`
  width: 30px;
  height: 30px;
  position: relative;
  left: 20px;
  top: 7px;
`;

const SearchBarInput = styled.input`
  position: relative;
  left: 15%;

  height: 30px;
  font-size: 1rem;
`;

const SearchBarButton = styled.button`
  background: #5a403a;
  position: relative;
  font-size: 0.9rem;
  left: 24%;
  color: white;
  width: 6rem;
  height: 3.05rem;
  border-radius: 30px;
  border: initial;
  :focus {
    outline: 0;
  }
`;

const SearchBar = (props) => {
  const [input, setInput] = useState('');
  const [enter, setEnter] = useState();
  
  const get = (event) => {
    if(event.key === 'Enter') {
      console.log("Work");
    }
  }
  return (
    <SearchBarStyle>
      <SearchBarImg src={SearchImg}></SearchBarImg>
      <SearchBarInput
        onChange={(e) => setInput(e.target.value)}
      ></SearchBarInput>
      <SearchBarButton onClick={() => props.setKeyword(input)} onKeyPress={(event) => get(event)}>
        찾기
      </SearchBarButton>
    </SearchBarStyle>
  );
};

export default SearchBar;
