import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const Polygon = styled.polygon`
  fill: ${(props) => props.color};
  transition: 0.4s;
  border: 1px solid black;
`;

const ScopeStyle = styled.button`
  background-color: inherit;
  outline: none;
  border: initial;
  display: inherit;
  z-index: 1;
`;

const Star = (props) => {
  let index = props.index;
  return (
    <svg
      onClick={props.click}
      onMouseOver={props.onhover}
      onMouseLeave={props.unhover}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 12 12"
    >
      <Polygon
        color={props.color}
        points="6 8.5200001 2.47328849 10.854102 3.60333748 6.77872286 0.293660902 4.14589803 4.51878111 3.96127709 6 0 7.48121889 3.96127709 11.7063391 4.14589803 8.39666252 6.77872286 9.52671151 10.854102"
      ></Polygon>
    </svg>
  );
};

const Scope = (props) => {
  const propsSetScope = props.setScope ? props.setScope : () => {};
  const [isHovering, setHover] = useState(-1);
  let size = '21px';
  const [scope, setScope] = useState(-1);
  const [stars, setStars] = useState([]);
  const [fixedStars, setFixedStars] = useState([]);

  useEffect(() => {
    if (props.modifyScope) {
      setScope(props.modifyScope - 1);
      if ((props.modifyScope === -1) | (props.modifyScope === '')) {
        setScope(-1);
      }
    }
  }, []);
  // 변하는 scope
  useEffect(() => {
    let tempStar = [];
    for (let i = 0; i <= isHovering; i++) {
      tempStar.push(
        <Star
          onhover={() => {
            setHover(i);
          }}
          unhover={() => {
            setHover(-1);
          }}
          click={() => {
            setScope(i);
            propsSetScope(i + 1);
          }}
          key={i}
          index={i}
          size={size}
          color="#f5b342"
        ></Star>
      );
    }
    for (let i = isHovering + 1; i < 5; i++) {
      tempStar.push(
        <Star
          onhover={() => setHover(i)}
          unhover={() => setHover(-1)}
          color="#dddddd"
          key={i}
          index={i}
          size={size}
        ></Star>
      );
    }
    setStars(tempStar);
  }, [isHovering, scope]);

  // 고정된 scope
  useEffect(() => {
    let tempStars = [];
    for (let i = 0; i <= scope; i++) {
      tempStars.push(
        <Star
          click={() => {
            if (scope === -1) {
              setScope(i);
            }
          }}
          key={i}
          index={i}
          size={size}
          color="#f59642"
        ></Star>
      );
    }
    for (let i = scope + 1; i < 5; i++) {
      tempStars.push(
        <Star color="#dddddd" key={i} index={i} size={size}></Star>
      );
    }
    setFixedStars(tempStars);
  }, [scope]);

  if (props.isScope) {
    let PropsScope = props.scope;
    if ((PropsScope > 5) | (PropsScope < 0)) {
      PropsScope = 0;
    }
    let contentsScope = [];
    for (let i = 0; i <= PropsScope - 1; i++) {
      contentsScope.push(
        <Star key={i} index={i} size={props.size} color="#f59642"></Star>
      );
    }
    for (let i = PropsScope; i < 5; i++) {
      contentsScope.push(
        <Star color="#dddddd" key={i} index={i} size={props.size}></Star>
      );
    }
    return <span>{contentsScope}</span>;
  }

  if (scope !== -1) {
    return (
      <ScopeStyle
        onClick={() => {
          setScope(-1);
          propsSetScope(-1);
        }}
      >
        {fixedStars}
      </ScopeStyle>
    );
  } else {
    return <ScopeStyle>{stars}</ScopeStyle>;
  }
};

export default Scope;
