import React from "react";
import { shallow, mount } from "enzyme";
import LanguageContext from "./contexts/languageContext";
import SuccessContext from "./contexts/successContext";

import { findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = ({ success, language }) => {
  language = language || "en";
  success = success || false;
  return mount(
    <LanguageContext.Provider value={language}>
      <SuccessContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </SuccessContext.SuccessProvider>
    </LanguageContext.Provider>
  );
};

describe("LanguagePicker", () => {
  test("correctly renders congrats string in english", () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
  });
  test("correctly renders congrats string in russian", () => {
    const wrapper = setup({ success: true, language: "ru" });
    expect(wrapper.text()).toBe("Поздравляем! Вы угадали слово!");
  });
});

test("renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});
test("renders no text when `success` is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});
test("renders non-empty congrats message when `success` is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
