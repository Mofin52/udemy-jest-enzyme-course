import React from "react";
import { setCustomWordMode } from "./actions";
import { connect } from "react-redux";

export const UnconnectedCustomWordButton = ({
  guessedWords,
  customWordMode,
  setCustomWordMode,
}) => {
  return (
    guessedWords.length === 0 &&
    !customWordMode && (
      <button
        data-test={"custom-word-button"}
        onClick={() => setCustomWordMode(true)}
      >
        Set your own word
      </button>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    guessedWords: state.guessedWords,
    customWordMode: state.customWordMode,
  };
};

export default connect(mapStateToProps, { setCustomWordMode })(
  UnconnectedCustomWordButton
);
