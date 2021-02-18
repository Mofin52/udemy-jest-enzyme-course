import React, { useState } from "react";
import { connect } from "react-redux";
import {
  setCustomWordMode,
  setFormIsSubmitted,
  setSecretWord,
} from "./actions";

export const UnconnectedCustomWordForm = ({
  customWordMode,
  guessedWords,
  formIsSubmitted,
  setSecretWord,
  setCustomWordMode,
  setFormIsSubmitted,
}) => {
  const [inputVal, setInputVal] = useState("");

  return (
    customWordMode &&
    !formIsSubmitted &&
    guessedWords.length === 0 && (
      <form data-test={"custom-word-form"}>
        <input
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          type={"text"}
          data-test={"custom-word-form-input"}
        />
        <button
          data-test={"custom-word-form-submit"}
          onClick={() => {
            setFormIsSubmitted(true);
            setSecretWord(inputVal);
          }}
        >
          Submit
        </button>
        <button
          data-test={"custom-word-form-cancel"}
          onClick={() => {
            setCustomWordMode(false);
          }}
        >
          Cancel
        </button>
      </form>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    customWordMode: state.customWordMode,
    guessedWords: state.guessedWords,
    formIsSubmitted: state.formIsSubmitted,
  };
};

export default connect(mapStateToProps, {
  setFormIsSubmitted,
  setSecretWord,
  setCustomWordMode,
})(UnconnectedCustomWordForm);
