import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Box } from "bushido-strap";

const Playfield = () => {
  const dispatch = useDispatch();
  const { matrix, tetrad, tetradLocked } = useSelector(
    (state: any) => state.playfield
  );
  const { frameRate } = useSelector((state: any) => state.game);

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

  useListenKeyPress((direction: any) => {
    dispatch(moveTetrad(direction));
  });

  return (
    <Box w="100vw" h="56.25vw" maxW="calc(100% / 3)" maxH="99.7vh">
      {matrix.matrix.map((row: any, y: number) => (
        <Row key={y} row={row} yCoord={y} />
      ))}
    </Box>
  );
};

export default Playfield;
