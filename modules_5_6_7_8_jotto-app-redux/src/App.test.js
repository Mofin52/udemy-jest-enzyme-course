import React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import App, { UnconnectedApp } from "./App";
import { resetGame } from "./actions";

const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("redux properties", () => {
  test("has access to success state", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("has access to secretWord state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test("has access to guessedWords state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test("has access to givenUp state", () => {
    const givenUp = false;
    const wrapper = setup({ givenUp });
    const givenUpProp = wrapper.instance().props.givenUp;
    expect(givenUpProp).toEqual(givenUp);
  });
  test("getSecretWord action creator is a function on the props", () => {
    const wrapper = setup();
    const getSecretWordAction = wrapper.instance().props.getSecretWord;
    expect(getSecretWordAction).toBeInstanceOf(Function);
  });
});

test("getSecretWord runs on App mount", () => {
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: [],
  };

  // setup app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});

test("resetGame is passed to a reset game action as an onClick prop", () => {
  const store = storeFactory({ success: true });
  const wrapper = shallow(<App store={store} />)
    .dive()
    .dive();
  const resetBtnElement = findByTestAttr(
    wrapper,
    "reset-btn-component"
  ).getElement();

  expect(resetBtnElement.props.onClick).toEqual(
    wrapper.instance().props.resetGame
  );
});
