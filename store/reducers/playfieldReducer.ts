import { NUM_COLS, NUM_ROWS } from "../../constants";
import { Tetrad, Matrix } from "../../datatypes";
// import Matrix from "../../datatypes";
import {
  COLLAPSE_ROWS,
  DELETE_ROW,
  MOVE_TETRAD,
  SPAWN_TETRAD,
  TETRAD_LOCKED,
} from "../index";

const initialState = {
  matrix: new Matrix(NUM_ROWS, NUM_COLS),
  tetrad: new Tetrad(),
  tetradLocked: false,
  deletedRows: [],
};

const playfieldReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SPAWN_TETRAD: {
      return {
        ...state,
        matrix: action.payload.matrix,
        tetrad: action.payload.tetrad,
        tetradLocked: false,
      };
    }
    case MOVE_TETRAD: {
      return {
        ...state,
        matrix: action.payload.matrix,
        tetrad: action.payload.tetrad,
      };
    }
    case TETRAD_LOCKED:
      return {
        ...state,
        matrix: action.payload.matrix,
        tetradLocked: true,
      };
    case DELETE_ROW:
      return {
        ...state,
        matrix: action.payload.matrix,
        deletedRows: [...state.deletedRows, action.payload.deletedRow],
      };
    case COLLAPSE_ROWS:
      return {
        ...state,
        matrix: action.payload.matrix,
        deletedRows: [],
      };
    default:
      return state;
  }
};

export default playfieldReducer;
