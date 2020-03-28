/********************************************************
 *                        REDUCERS                      *
 ********************************************************/
import { combineReducers } from "redux";
import gameReducer from "./reducers/gameReducer";
import playfieldReducer from "./reducers/playfieldReducer";

export default combineReducers({
  playfield: playfieldReducer,
  game: gameReducer,
});

/********************************************************
 *                     ACTION CREATORS                   *
 ********************************************************/
export { startGame, calculateScore } from "./actions/gameActions";
export {
  spawnTetrad,
  moveTetrad,
  deleteFilledRow,
  checkIfBlocked,
  collapseEmptyRows,
} from "./actions/playfieldActions";

/********************************************************
 *                       ACTION TYPES                    *
 ********************************************************/
export { START_GAME, CALCULATE_SCORE } from "./actions/gameActions";

export {
  SPAWN_TETRAD,
  MOVE_TETRAD,
  TETRAD_LOCKED,
  DELETE_ROW,
  COLLAPSE_ROWS,
} from "./actions/playfieldActions";
