import React from "react";
import { shallow } from "enzyme";
import CustomWordForm, { UnconnectedCustomWordForm } from "./CustomWordForm";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import CustomWordButton from "./CustomWordButton";
import { setCustomWordMode } from "./actions";

const setup = (initialState) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<CustomWordForm store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  test("does render if customWordMode = true", () => {
    const wrapper = setup({ customWordMode: true, guessedWords: [] });
    const form = findByTestAttr(wrapper, "custom-word-form");
    expect(form.length).toBe(1);
  });
  test("does not render if customWordMode = false", () => {
    const wrapper = setup({ customWordMode: false, guessedWords: [] });
    const form = findByTestAttr(wrapper, "custom-word-form");
    expect(form.length).toBe(0);
  });
  test("does not render if guessedWords length is > 0", () => {
    const wrapper = setup({
      customWordMode: true,
      guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
    });
    const form = findByTestAttr(wrapper, "custom-word-form");
    expect(form.length).toBe(0);
  });
  test("does not render if form is submitted", () => {
    const wrapper = setup({
      customWordMode: true,
      formIsSubmitted: true,
    });
    const form = findByTestAttr(wrapper, "custom-word-form");
    expect(form.length).toBe(0);
  });
  test("form contains input element", () => {
    const wrapper = setup({
      customWordMode: true,
    });
    const input = findByTestAttr(wrapper, "custom-word-form-input");
    expect(input.length).toBe(1);
  });
  test("form contains submit button", () => {
    const wrapper = setup({
      customWordMode: true,
    });
    const submit = findByTestAttr(wrapper, "custom-word-form-submit");
    expect(submit.length).toBe(1);
  });
  test("form contains cancel button", () => {
    const wrapper = setup({
      customWordMode: true,
    });
    const cancel = findByTestAttr(wrapper, "custom-word-form-submit");
    expect(cancel.length).toBe(1);
  });
});

describe("redux state access", () => {
  let wrapperProps;
  const customWordMode = true;
  const guessedWords = [];
  const formIsSubmitted = false;
  beforeEach(() => {
    const store = storeFactory({
      customWordMode,
      guessedWords,
      formIsSubmitted,
    });
    wrapperProps = shallow(<CustomWordForm store={store} />)
      .dive()
      .getElement().props;
  });
  test("form has access to setCustomWordMode action", () => {
    expect(wrapperProps.setCustomWordMode).toBeInstanceOf(Function);
  });
  test("form has access to setSecretWord action", () => {
    expect(wrapperProps.setSecretWord).toBeInstanceOf(Function);
  });
  test("form has access to setFormIsSubmitted action", () => {
    expect(wrapperProps.setFormIsSubmitted).toBeInstanceOf(Function);
  });
  test("form has access to customWordMode piece of state", () => {
    expect(wrapperProps.customWordMode).toBe(customWordMode);
  });
  test("form has access to guessedWords piece of state", () => {
    expect(wrapperProps.guessedWords).toEqual(guessedWords);
  });
  test("form has access to formIsSubmitted piece of state", () => {
    expect(wrapperProps.formIsSubmitted).toEqual(formIsSubmitted);
  });
});

describe("submit behaviour", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    store = storeFactory({
      guessedWords: [],
      customWordMode: true,
      formIsSubmitted: false,
    });
    wrapper = shallow(<CustomWordForm store={store} />)
      .dive()
      .dive();
  });
  test("sets form submitted state to true when submit button is clicked", () => {
    findByTestAttr(wrapper, "custom-word-form-submit").simulate("click");
    const newState = store.getState();
    expect(newState.formIsSubmitted).toBe(true);
  });
  test("sets input value as a secret word when submit button is clicked", () => {
    const newSecretWord = "train";
    const input = findByTestAttr(wrapper, "custom-word-form-input");
    input.simulate("change", { target: { value: newSecretWord } });
    findByTestAttr(wrapper, "custom-word-form-submit").simulate("click");
    const newState = store.getState();
    expect(newState.secretWord).toBe(newSecretWord);
  });
});

describe("cancel behaviour", () => {
  let wrapper;
  let store;
  const secretWord = "party";
  beforeEach(() => {
    store = storeFactory({
      guessedWords: [],
      customWordMode: true,
      formIsSubmitted: false,
      secretWord: secretWord,
    });
    wrapper = shallow(<CustomWordForm store={store} />)
      .dive()
      .dive();
  });
  test("sets input value as a secret word when submit button is clicked", () => {
    const newSecretWord = "train";
    const input = findByTestAttr(wrapper, "custom-word-form-input");
    input.simulate("change", { target: { value: newSecretWord } });
    findByTestAttr(wrapper, "custom-word-form-cancel").simulate("click");
    const newState = store.getState();
    expect(newState.secretWord).toBe(secretWord);
  });
  test("sets customWordMode to false if cancel button is clicked", () => {
    findByTestAttr(wrapper, "custom-word-form-cancel").simulate("click");
    const newState = store.getState();
    expect(newState.formIsSubmitted).toBe(false);
  });
});

describe("callbacks count", () => {
  const setFormIsSubmittedMock = jest.fn();
  const setCustomWordModeMock = jest.fn();
  const setSecretWordMock = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <UnconnectedCustomWordForm
        guessedWords={[]}
        formIsSubmitted={false}
        customWordMode={true}
        setSecretWord={setSecretWordMock}
        setFormIsSubmitted={setFormIsSubmittedMock}
        setCustomWordMode={setCustomWordModeMock}
      />
    );
  });
  test("setFormIsSubmitted runs once when submit button is clicked", () => {
    findByTestAttr(wrapper, "custom-word-form-submit").simulate("click");
    expect(setFormIsSubmittedMock.mock.calls.length).toBe(1);
  });
  test("setSecretWord runs once when submit button is clicked", () => {
    findByTestAttr(wrapper, "custom-word-form-submit").simulate("click");
    expect(setSecretWordMock.mock.calls.length).toBe(1);
  });
  test("setCustomWordMode runs once when submit cancel is clicked", () => {
    findByTestAttr(wrapper, "custom-word-form-cancel").simulate("click");
    expect(setCustomWordModeMock.mock.calls.length).toBe(1);
  });
});
