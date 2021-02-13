import { getLetterMatchCount } from "../helpers";
import axios from "axios";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD",
  RESET_GAME: "RESET_GAME",
};

export function guessWord(guessedWord) {
  return function (dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);
    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount },
    });
    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS,
      });
    }
  };
}

function getWordPromise(dispatch) {
  return axios.get("http://secretwordserver.ru").then((response) => {
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: response.data,
    });
  });
}

export function getSecretWord() {
  return function (dispatch, getState) {
    return getWordPromise(dispatch);
  };
}

export function resetGame() {
  return function (dispatch, getState) {
    dispatch({
      type: actionTypes.RESET_GAME,
    });
    return getWordPromise(dispatch);
  };
}
