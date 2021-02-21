import React from "react";
import { shallow } from "enzyme";
import { checkProps, findByTestAttr } from "../test/testUtils";
import { Input } from "./Input";

const setup = (secretWord = "party") => {
  return shallow(<Input {...{ secretWord }} />);
};

test("Input renders without error", () => {
  const wrapper = setup();
  const input = findByTestAttr(wrapper, "component-input");
  expect(input.length).toBe(1);
});

test("does not throws warnings with expected props", () => {
  checkProps(Input, { secretWord: "party" });
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
