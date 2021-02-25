import React from "react";
import { mount } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import { Input } from "./Input";
import LanguageContext from "./contexts/languageContext";

const setup = (secretWord = "party", language) => {
  language = language || "en";
  return mount(
    <LanguageContext.Provider value={language}>
      <Input {...{ secretWord }} />
    </LanguageContext.Provider>
  );
};

test("Input renders without error", () => {
  const wrapper = setup();
  const input = findByTestAttr(wrapper, "component-input");
  expect(input.length).toBe(1);
});

test("does not throws warnings with expected props", () => {
  checkProps(Input, { secretWord: "party" });
});

describe("language support", () => {
  test("correctly renders submit text in english", () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, "submit-button");
    expect(btn.text()).toBe("Submit");
  });
  test("correctly renders guess placeholder in english", () => {
    const wrapper = setup();
    const btn = findByTestAttr(wrapper, "submit-button");
    expect(btn.text()).toBe("Submit");
  });
  test("correctly renders submit text in russian", () => {
    const wrapper = setup("party");
    const input = findByTestAttr(wrapper, "input-box").at(0);
    expect(input.props().placeholder).toBe("enter guess");
  });
  test("correctly renders guess placeholder in english", () => {
    const wrapper = setup("party", "ru");
    const input = findByTestAttr(wrapper, "input-box").at(0);
    expect(input.props().placeholder).toBe("введите предположение");
  });
});

describe("state controlled input field", () => {
  let wrapper;
  const mockSetCurrentGuess = jest.fn();
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup();
  });
  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate("change", { target: { value: "train" } });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });
  test("currentGuess get cleared when submit button is clicked", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault: () => {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});
