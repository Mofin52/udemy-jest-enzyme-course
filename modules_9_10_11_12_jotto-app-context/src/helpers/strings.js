const languageStrings = {
  en: {
    congrats: "Congratulations! You guessed the word!",
    submit: "Submit",
    guessPrompt: "Try to guess the secret word!",
    guessInputPlaceholder: "enter guess",
    guessColumnHeader: "Guessed Words",
    guessedWords: "Guesses",
    matchingLettersColumnHeader: "Matching letters",
  },
  ru: {
    congrats: "Поздравляем! Вы угадали слово!",
    submit: "Отправить",
    guessPrompt: "Побробуйте угадать секретное слово",
    guessInputPlaceholder: "введите предположение",
    guessColumnHeader: "Отправленные слова",
    guessedWords: "Догадки",
    matchingLettersColumnHeader: "Совпадаюшие буквы",
  },
};

function getStringByLanguage(
  languageCode,
  stringKey,
  strings = languageStrings
) {
  // fallback to english if string or language does not exist
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);
    languageCode = "en";
  }
  return strings[languageCode][stringKey];
}

// for future mocking
export default { getStringByLanguage };
