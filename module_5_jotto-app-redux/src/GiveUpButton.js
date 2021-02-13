import React from "react";
import { giveUp } from "./actions";
import { connect } from "react-redux";

const UnconnectedGiveUpButton = (props) => {
  return props.givenUp ? (
    <>
      <div data-test={"give-up-message"}>
        Do not be upset, the secret word was
      </div>
      <div data-test="secret-word">{props.secretWord}</div>
    </>
  ) : props.guessedWords.length ? (
    <button onClick={props.giveUp} data-test={"give-up-button"}>
      I give up!
    </button>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    givenUp: state.givenUp,
    secretWord: state.secretWord,
    guessedWords: state.guessedWords,
  };
};

export { UnconnectedGiveUpButton };

export default connect(mapStateToProps, { giveUp })(UnconnectedGiveUpButton);
