import { DOWN } from "../../constants";
import { getRandomTetrad } from "../../datatypes/helper";
export const SPAWN_TETRAD = "SPAWN_TETRAD";
export const MOVE_TETRAD = "MOVE_TETRAD";
export const TETRAD_LOCKED = "TETRAD_LOCKED";
export const DELETE_ROW = "DELETE_ROW";
export const COLLAPSE_ROWS = "COLLAPSE_ROWS";

export const spawnTetrad = (lastType = "") => (dispatch: any, state: any) => {
  let { matrix, tetrad } = state().playfield;
  console.log(matrix);
  tetrad = getRandomTetrad(lastType);
  matrix = matrix.activateCoordinates(tetrad);

  dispatch({
    type: SPAWN_TETRAD,
    payload: {
      matrix: matrix,
      tetrad: tetrad,
    },
  });
};

export const moveTetrad = (direction = DOWN) => (dispatch: any, state: any) => {
  let { matrix, tetrad } = state().playfield;

  if (tetrad.canMove(direction, matrix)) {
    tetrad.move(direction);

    matrix = matrix.activateCoordinates(tetrad);

    dispatch({
      type: MOVE_TETRAD,
      payload: {
        matrix: matrix,
        tetrad: tetrad,
      },
    });
  }
};

export const checkIfBlocked = (direction = DOWN) => (
  dispatch: any,
  state: any
) => {
  let { matrix, tetrad } = state().playfield;

  if (!tetrad.canMove(direction, matrix)) {
    matrix.lockCoordinates(tetrad);

    dispatch({
      type: TETRAD_LOCKED,
      payload: {
        matrix: matrix,
      },
    });
  }
};

export const deleteFilledRow = (rowCoord: any) => (
  dispatch: any,
  state: any
) => {
  let { matrix } = state().playfield;

  if (matrix.rowFilled(rowCoord)) {
    matrix.deleteRow(rowCoord);

    dispatch({
      type: DELETE_ROW,
      payload: {
        matrix: matrix,
        deletedRow: rowCoord,
      },
    });
  }
};

export const collapseEmptyRows = () => (dispatch: any, state: any) => {
  let { matrix, deletedRows } = state().playfield;

  if (deletedRows.length) {
    matrix.collapseEmptyRows(deletedRows);

    dispatch({
      type: COLLAPSE_ROWS,
      payload: {
        matrix: matrix,
      },
    });
  }
};
