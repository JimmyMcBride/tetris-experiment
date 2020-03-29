import { spawnTetrad } from "../index";
export const START_GAME = "START_GAME";
export const CALCULATE_SCORE = "CALCULATE_SCORE";

export const startGame = () => (dispatch: any) => {
  dispatch({ type: START_GAME });
  dispatch(spawnTetrad());
};

export const calculateScore = () => (dispatch: any, state: any) => {
  const numRows = state().playfield.deletedRows.length;
  let { rowsCleared, level, score } = state().game;

  const points =
    numRows === 0
      ? 0
      : numRows === 1
      ? 40
      : numRows === 2
      ? 100
      : numRows === 3
      ? 300
      : 1200;

  rowsCleared += numRows;
  score += points * (level + 1);
  level += rowsCleared >= level * 10 + 10 ? 1 : 0;

  dispatch({
    type: CALCULATE_SCORE,
    payload: {
      rowsCleared,
      level,
      score,
    },
  });
};
