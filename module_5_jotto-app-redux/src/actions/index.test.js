import moxios from "moxios";
import { storeFactory } from "../../test/testUtils";
import { getSecretWord, resetGame } from "./index";

describe("getSecretWord action creator", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("adds response word to state", () => {
    const secretWord = "party";
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(secretWord);
    });
  });
});

describe("game reset", () => {
  let store;
  let newState;
  beforeEach(() => {
    moxios.install();
    store = storeFactory({
      success: true,
      guessedWords: [{ guessWord: "train", letterMatchCount: 3 }],
    });
    store.dispatch(resetGame());
    newState = store.getState();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("resets guessed words when dispatch resetGame", () => {
    expect(newState.guessedWords).toEqual([]);
  });
  test("sets success to false when dispatch resetGame", () => {
    expect(newState.success).toBe(false);
  });
  test("sets new secret word when dispatch resetGame", () => {
    const newSecretWord = "perci";
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newSecretWord,
      });
    });
    return store.dispatch(resetGame()).then(() => {
      const newState = store.getState();
      expect(newState.secretWord).toBe(newSecretWord);
    });
  });
});
