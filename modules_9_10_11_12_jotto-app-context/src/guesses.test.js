import React from "react";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import GuessedWordsContext from "./contexts/guessedWordsContext";
import SuccessContext from "./contexts/successContext";
import { Input } from "./Input";
import GuessedWords from "./GuessedWords";

function setup(secretWord = "party", guessedWordsStrings = []) {
  const wrapper = mount(
    <GuessedWordsContext.GuessedWordsProvider>
      <SuccessContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </SuccessContext.SuccessProvider>
    </GuessedWordsContext.GuessedWordsProvider>
  );
  const inputBox = findByTestAttr(wrapper, "input-box");
  const submitButton = findByTestAttr(wrapper, "submit-button");
  guessedWordsStrings.forEach((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate("change", mockEvent);
    submitButton.simulate("click");
  });
  return [wrapper, inputBox, submitButton];
}

describe("test word guesses", () => {
  let wrapper;
  let inputBox;
  let submitButton;
  describe("empty guessedWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup("party", []);
    });
    test("guessedWords shows correct guesses after incorrect guess", () => {
      const mockEvent = { target: { value: "agile" } };
      inputBox.simulate("change", mockEvent);
      submitButton.simulate("click");
      const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
      expect(guessedWordRows.length).toBe(1);
    });
  });
  describe("non-empty guessedWords", () => {
    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup("party", ["agile"]);
    });
    describe("correct guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "party" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("Input component contains no children", () => {
        const inputComponent = findByTestAttr(wrapper, "component-input");
        expect(inputComponent.children().length).toBe(0);
      });
      test("GuessedWords table row count reflects updated guess", () => {
        const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordRows.length).toBe(2);
      });
    });
    describe("incorrect guess", () => {
      beforeEach(() => {
        const mockEvent = { target: { value: "train" } };
        inputBox.simulate("change", mockEvent);
        submitButton.simulate("click");
      });
      test("Input box remains", () => {
        expect(inputBox.exists()).toBe(true);
      });
      test("GuessedWords table row count reflects updated guess", () => {
        const guessedWordRows = findByTestAttr(wrapper, "guessed-word");
        expect(guessedWordRows.length).toBe(2);
      });
    });
  });
});
