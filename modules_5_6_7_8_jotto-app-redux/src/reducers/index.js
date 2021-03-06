import { combineReducers } from "redux";
import success from "./successReducer";
import guessedWords from "./guessedWordsReducer";
import secretWord from "./secretWordReducer";
import givenUp from "./givenUpReducer";
import customWordMode from "./customWordModeReducer";
import formIsSubmitted from "./formIsSubmittedReducer";
import error from "./errorReducer";

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  givenUp,
  customWordMode,
  formIsSubmitted,
  error,
});
