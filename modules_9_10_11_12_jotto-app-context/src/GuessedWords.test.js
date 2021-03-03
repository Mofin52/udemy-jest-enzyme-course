import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import GuessedWords from "./GuessedWords";
import GuessedWordsContext from "./contexts/guessedWordsContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = (guessedWords = []) => {
  const mockUseGuessedWords = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockUseGuessedWords;
  return shallow(<GuessedWords />);
};

describe("if there are no words guessed", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test("renders instructions to guess a word", () => {
    const instructions = findByTestAttr(wrapper, "guess-instructions");
    expect(instructions.text().length).not.toBe(0);
  });
});
describe("if there are words guessed", () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "component-guessed-words");
    expect(component.length).toBe(1);
  });
  test('renders "guessed words" section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, "guessed-words");
    expect(guessedWordsNode.length).toBe(1);
  });
  test("correct number of guessed words", () => {
    const guessedWordNodes = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordNodes.length).toBe(guessedWords.length);
  });
});

describe("languagePicker", () => {
  test("renders guess instructions in english by default", () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("Try to guess the secret word!");
  });
  test("renders guess instructions in russian", () => {
    const mockUseContext = jest.fn().mockReturnValue("ru");
    React.useContext = mockUseContext;
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, "guess-instructions");
    expect(guessInstructions.text()).toBe("Побробуйте угадать секретное слово");
  });
});
