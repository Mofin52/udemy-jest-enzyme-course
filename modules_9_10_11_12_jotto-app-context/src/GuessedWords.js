import React from "react";
import LanguageContext from "./contexts/languageContext";
import GuessedWordsContext from "./contexts/guessedWordsContext";
import stringsModule from "./helpers/strings";

const GuessedWords = () => {
  let contents;
  const [guessedWords] = GuessedWordsContext.useGuessedWords();
  const language = React.useContext(LanguageContext);
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>
          {stringsModule.getStringByLanguage(language, "guessColumnHeader")}
        </h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {stringsModule.getStringByLanguage(language, "guessedWords")}
              </th>
              <th>
                {stringsModule.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
};

export default GuessedWords;
