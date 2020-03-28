import { Tetrad } from "../types/Tetrad";
import * as tetradData from "./data.json";
/*
  Based on the original Tetris NES, Random Generator Algorithm:
  0 - 6 represent the seven tetrads
  7 represents a "re-roll"
  if an 7 or the previous tetrad is rolled,
  re-roll
  otherwise return the next tetrad
  NOTE: omitted the 7 re-roll as it's arbitrary
*/
const types = ["I", "O", "T", "S", "Z", "J", "L"];

export const getRandomTetrad = lastType => {
  let nextNumber, nextType;
  let tetrads = deepCopy(tetradData.default);

  do {
    nextNumber = Math.floor(Math.random() * 7);
    nextType = types[nextNumber];
  } while (nextType === lastType);

  return new Tetrad(
    tetrads[nextType].type,
    tetrads[nextType].color,
    tetrads[nextType].prevCoordinates,
    tetrads[nextType].coordinates,
    tetrads[nextType].orientation,
    tetrads[nextType].rotationalMatrices
  );
};

export const deepCopy = object => {
  return JSON.parse(JSON.stringify(object));
};
