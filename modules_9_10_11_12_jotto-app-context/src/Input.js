import React from "react";
import PropTypes from "prop-types";

export const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");
  return (
    <div data-test={"component-input"}>
      <form action="" className={"form-inline"}>
        <input
          data-test={"input-box"}
          className={"mb2 mx-sm-3"}
          type={"text"}
          placeholder={"enter guess"}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          type={"submit"}
          data-test={"submit-button"}
          className={"btn btn-primary mb-2"}
          onClick={(event) => {
            // TODO: update guessedWords
            // TODO: check against secretWord and update success if needed
            event.preventDefault();
            setCurrentGuess("");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};
