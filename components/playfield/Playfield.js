import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { DOWN } from "../../constants";
import { useInterval, useListenKeyPress } from "../../hooks";
import {
  calculateScore,
  checkIfBlocked,
  collapseEmptyRows,
  moveTetrad,
  spawnTetrad,
} from "../../store";
import Row from "./Row";

const Playfield = () => {
  const dispatch = useDispatch();
  const { matrix, tetrad, tetradLocked } = useSelector(
    state => state.playfield
  );
  const { frameRate } = useSelector(state => state.game);

  useEffect(() => {
    if (tetradLocked) {
      dispatch(calculateScore());
      dispatch(collapseEmptyRows());
      dispatch(spawnTetrad(tetrad.type));
    }
  }, [tetradLocked, tetrad, dispatch]);

  useInterval(() => {
    dispatch(checkIfBlocked());
    dispatch(moveTetrad(DOWN));
  }, frameRate);

  useListenKeyPress(direction => {
    dispatch(moveTetrad(direction));
  });

  return (
    <Container>
      {matrix.matrix.map((row, y) => (
        <Row key={y} row={row} yCoord={y} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 56.25vw;
  max-width: calc(100% / 3);
  max-height: 99.7vh;
  // margin: auto;
  background-color: #d0d0df;
`;

export default Playfield;
