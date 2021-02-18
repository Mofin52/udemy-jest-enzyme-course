import { getLetterMatchCount } from "../helpers";
import axios from "axios";

export const actionTypes = {
  CORRECT_GUESS: "CORRECT_GUESS",
  GUESS_WORD: "GUESS_WORD",
  SET_SECRET_WORD: "SET_SECRET_WORD",
  RESET_GAME: "RESET_GAME",
  GIVE_UP: "GIVE_UP",
  SET_CUSTOM_GAME_MODE: "SET_CUSTOM_GAME_MODE",
  FORM_IS_SUBMITTED: "FORM_IS_SUBMITTED",
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

export function giveUp() {
  return { type: actionTypes.GIVE_UP };
}

export function setCustomWordMode(payload) {
  return { type: actionTypes.SET_CUSTOM_GAME_MODE, payload };
}

export function setSecretWord(payload) {
  return { type: actionTypes.SET_SECRET_WORD, payload: payload };
}

function getWordPromise(dispatch) {
  return axios.get("http://secretwordserver.ru").then((response) => {
    dispatch(setSecretWord(response.data));
  });
}

export function getSecretWord() {
  return function (dispatch, getState) {
    return getWordPromise(dispatch);
  };
}

export function setFormIsSubmitted(payload) {
  return { type: actionTypes.FORM_IS_SUBMITTED, payload };
}

export function resetGame() {
  return function (dispatch, getState) {
    dispatch({
      type: actionTypes.RESET_GAME,
    });
    return getWordPromise(dispatch);
  };
}
