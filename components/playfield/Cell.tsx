import React from "react";
import styled from "styled-components";
import { Flex, theme } from "bushido-strap";

export const Cell = (props: any) => {
  // console.log('props', props);
  return (
    <Container
      isLocked={props.isLocked}
      isActive={props.isActive}
      color={props.color}
      w="10%"
      h="100%"
      border={`1px solid ${theme.whiteAlpha8}`}
      hvrBorder={`1px solid ${theme.whiteAlpha8}`}
    >
      {/* <span>{`(${props.coordinate.x}, ${props.coordinate.y})`}</span>
        <span>{`${props.isActive ? "A" : "_"} · ${
          props.isLocked ? "L" : "_"
        }`}</span> */}
    </Container>
  );
};

const Container = styled(Flex)`
  background-color: ${props =>
    (props.isLocked || props.isActive) && props.color};
  color: ${props => (props.isLocked || props.isActive ? "white" : "black")};
`;
