import React, { useContext } from "react";
import PropTypes from "prop-types";
import LanguageContext from "./contexts/languageContext";
import SuccessContext from "./contexts/successContext";
import GuessedWordsContext from "./contexts/guessedWordsContext";
import stringsModule from "./helpers/strings";
import { getLetterMatchCount } from "./helpers";

export const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState("");
  const [success, setSuccess] = SuccessContext.useSuccess();
  const [guessedWords, setGuessedWords] = GuessedWordsContext.useGuessedWords();
  const language = useContext(LanguageContext);

  if (success) {
    return null;
  }

  return (
    <div data-test={"component-input"}>
      <form action="" className={"form-inline"}>
        <input
          data-test={"input-box"}
          className={"mb2 mx-sm-3"}
          type={"text"}
          placeholder={stringsModule.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
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
            const letterMatchCount = getLetterMatchCount(
              currentGuess,
              secretWord
            );
            const newGuessedWords = [
              ...guessedWords,
              { guessedWord: currentGuess, letterMatchCount },
            ];
            setGuessedWords(newGuessedWords);
            if (currentGuess === secretWord) {
              setSuccess(true);
            }
            // clear input box
            setCurrentGuess("");
          }}
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};
