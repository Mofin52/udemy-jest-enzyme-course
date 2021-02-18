import React from "react";
import { shallow } from "enzyme";
import CustomWordButton, {
  UnconnectedCustomWordButton,
} from "./CustomWordButton";
import { findByTestAttr, storeFactory } from "../test/testUtils";

const setup = (store) => {
  const wrapper = shallow(<CustomWordButton store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("render", () => {
  test("does not render if guessedWords length > 0", () => {
    const store = storeFactory({
      guessedWords: [{ guessedWord: "train", letterMatchCount: 3 }],
    });
    const wrapper = setup(store);
    const button = findByTestAttr(wrapper, "custom-word-button");
    expect(button.length).toBe(0);
  });
  test("does render if guessedWords length = 0", () => {
    const store = storeFactory({
      guessedWords: [],
    });
    const wrapper = setup(store);
    const button = findByTestAttr(wrapper, "custom-word-button");
    expect(button.length).toBe(1);
  });
  test("does not render if customWordMode = true", () => {
    const store = storeFactory({
      customWordMode: true,
    });
    const wrapper = setup(store);
    const button = findByTestAttr(wrapper, "custom-word-button");
    expect(button.length).toBe(0);
  });
});

describe("redux props", () => {
  let wrapperProps;
  const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
  const customWordMode = false;
  beforeEach(() => {
    const store = storeFactory({ guessedWords, customWordMode });
    wrapperProps = shallow(<CustomWordButton store={store} />)
      .dive()
      .getElement().props;
  });
  test("has access to guessedWords redux state", () => {
    expect(wrapperProps.guessedWords).toEqual(guessedWords);
  });
  test("has access to customWordMode redux state", () => {
    expect(wrapperProps.customWordMode).toEqual(customWordMode);
  });
  test("has access to setCustomWordMode redux action", () => {
    expect(wrapperProps.setCustomWordMode).toBeInstanceOf(Function);
  });
});

describe("onclick behaviour", () => {
  test("when button is clicked sets custom word Mode to true", () => {
    const store = storeFactory({ customWordMode: false, guessedWords: [] });
    const wrapper = setup(store);
    findByTestAttr(wrapper, "custom-word-button").simulate("click");
    const newState = store.getState();
    expect(newState.customWordMode).toBe(true);
  });
  test("setCustomWordMode runs once when button is clicked", () => {
    const setCustomWordMock = jest.fn();
    const wrapper = shallow(
      <UnconnectedCustomWordButton
        setCustomWordMode={setCustomWordMock}
        guessedWords={[]}
      />
    );
    findByTestAttr(wrapper, "custom-word-button").simulate("click");
    expect(setCustomWordMock.mock.calls.length).toBe(1);
  });
});
