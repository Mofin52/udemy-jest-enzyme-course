import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from "./secretWordReducer";
import givenUp from "./givenUpReducer";

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  givenUp,
});
