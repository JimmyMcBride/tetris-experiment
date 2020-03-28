import { G } from "../../constants";
import { CALCULATE_SCORE, START_GAME } from "../index";
const initialState = {
  gameStarted: false,
  frameRate: G[0],
  rowsCleared: 0,
  level: 0,
  score: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        gameStarted: true,
      };
    case CALCULATE_SCORE:
      return {
        ...state,
        rowsCleared: action.payload.rowsCleared,
        level: action.payload.level,
        score: action.payload.score,
        frameRate: G[action.payload.level],
      };
    default:
      return state;
  }
};

export default gameReducer;
