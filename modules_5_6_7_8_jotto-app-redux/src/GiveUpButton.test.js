import React from "react";
import GiveUpButton, { UnconnectedGiveUpButton } from "./GiveUpButton";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";

const setup = ({ guessedWords, givenUp, secretWord = "party" }) => {
  const store = storeFactory({ givenUp, guessedWords, secretWord });
  const wrapper = shallow(<GiveUpButton store={store} />).dive();
  return wrapper;
};

describe("GiveUpButton render", () => {
  describe("not given up", () => {
    test("does not render when guessedWords length is 0", () => {
      const wrapper = setup({ guessedWords: [], givenUp: false }).dive();
      const button = findByTestAttr(wrapper, "give-up-button");
      expect(button.length).toBe(0);
    });
    test("does render when guessedWords length is greater than 0 ", () => {
      const wrapper = setup({
        guessedWords: [
          { guessedWord: "train", letterMatchCount: "3", givenUp: false },
        ],
      }).dive();
      const button = findByTestAttr(wrapper, "give-up-button");
      expect(button.length).toBe(1);
    });
    test("does not show encouraging message", () => {
      const wrapper = setup({
        guessedWords: [
          { guessedWord: "train", letterMatchCount: "3", givenUp: false },
        ],
      }).dive();
      const message = findByTestAttr(wrapper, "give-up-message");
      expect(message.length).toBe(0);
    });
    test("does not show secret word", () => {
      const wrapper = setup({
        guessedWords: [
          { guessedWord: "train", letterMatchCount: "3", givenUp: false },
        ],
      }).dive();
      const message = findByTestAttr(wrapper, "give-up-message");
      expect(message.length).toBe(0);
    });
  });

  describe("given up", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({
        guessedWords: [{ guessedWord: "train", letterMatchCount: "3" }],
        givenUp: true,
        secretWord: "party",
      }).dive();
    });
    test("does not render when given up", () => {
      const button = findByTestAttr(wrapper, "give-up-button");
      expect(button.length).toBe(0);
    });
    test("when givenUp is true, shows encouraging message", () => {
      const message = findByTestAttr(wrapper, "give-up-message");
      expect(message.length).toBe(1);
    });
    test("does show secret word", () => {
      const secretWord = findByTestAttr(wrapper, "secret-word");
      expect(secretWord.length).toBe(1);
    });
    test("does show actual secret word", () => {
      const secretWord = findByTestAttr(wrapper, "secret-word");
      expect(secretWord.text()).toBe("party");
    });
  });

  test("calls giveUp action prop when clicked", () => {
    const giveUpMock = jest.fn();
    const wrapper = shallow(
      <UnconnectedGiveUpButton
        giveUp={giveUpMock}
        givenUp={false}
        guessedWords={[{ letterMatchCount: 3, guessedWord: "train" }]}
      />
    );
    const button = findByTestAttr(wrapper, "give-up-button");
    button.simulate("click");
    expect(giveUpMock.mock.calls.length).toEqual(1);
  });
});

describe("redux props", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      guessedWords: [{ guessedWord: "train", letterMatchCount: "3" }],
      givenUp: true,
      secretWord: "party",
    });
  });
  test("has access to givenUp prop", () => {
    expect(wrapper.prop("givenUp")).toBe(true);
  });
  test("has access to secretWord prop", () => {
    expect(wrapper.prop("secretWord")).toBe("party");
  });
  test("has access to guessedWords prop", () => {
    expect(wrapper.prop("guessedWords")).toEqual([
      { guessedWord: "train", letterMatchCount: "3" },
    ]);
  });
  test("has access to giveUp action prop", () => {
    expect(wrapper.prop("giveUp")).toBeInstanceOf(Function);
  });
});
