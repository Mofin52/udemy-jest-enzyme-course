import React from "react";
import "./App.css";
import hookActions from "./actions/hookActions";
import LanguageContext from "./contexts/languageContext";
import SuccessContext from "./contexts/successContext";
import GuessedWordsContext from "./contexts/guessedWordsContext";
import LanguagePicker from "./LanguagePicker";
import { Input } from "./Input";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";

function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
  });

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });
  const setLanguage = (language) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  if (!state.secretWord) {
    return (
      <div className={"container"} data-test={"spinner"}>
        <div className={"spinner-border"} role={"status"}>
          <span className={"sr-only"}>Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    );
  }

  return (
    <div data-test={"component-app"}>
      <h1>Jotto Game</h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <GuessedWordsContext.GuessedWordsProvider>
          <SuccessContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </SuccessContext.SuccessProvider>
          <GuessedWords />
        </GuessedWordsContext.GuessedWordsProvider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
