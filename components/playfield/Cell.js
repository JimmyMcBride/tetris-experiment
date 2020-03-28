import React from "react";
import styled from "styled-components";

export const Cell = props => {
  // console.log('props', props);
  return (
    <Container
      isLocked={props.isLocked}
      isActive={props.isActive}
      color={props.color}
    >
      <span>{`(${props.coordinate.x}, ${props.coordinate.y})`}</span>
      <span>{`${props.isActive ? "A" : "_"} · ${
        props.isLocked ? "L" : "_"
      }`}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  border: 1px solid white;
  background-color: ${props =>
    (props.isLocked || props.isActive) && props.color};
  color: ${props => (props.isLocked || props.isActive ? "white" : "black")};
  span {
    font-size: 1vw;
  }
`;
