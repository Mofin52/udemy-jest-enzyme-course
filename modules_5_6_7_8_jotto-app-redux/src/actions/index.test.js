import moxios from "moxios";
import { storeFactory } from "../../test/testUtils";
import {
  getSecretWord,
  resetGame,
  giveUp,
  setCustomWordMode,
  setFormIsSubmitted,
} from "./index";

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

  test("sets error if server returns 4** status code", () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({ status: 404 });
    });

    return store.dispatch(getSecretWord()).catch((err) => {
      const newState = store.getState();
      expect(newState.error).toBe(true);
    });
  });
  test("sets error if server returns 5** status code", () => {
    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({ status: 504 });
    });

    return store.dispatch(getSecretWord()).catch((err) => {
      const newState = store.getState();
      expect(newState.error).toBe(true);
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
  test("sets givenUp state to false when dispatch resetGame", () => {
    expect(newState.givenUp).toBe(false);
  });
  test("sets customGameMode state to false when dispatch resetGame", () => {
    expect(newState.customWordMode).toBe(false);
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

describe("giveUp tests", () => {
  test("sets given up state to true", () => {
    const store = storeFactory({
      givenUp: false,
    });
    store.dispatch(giveUp());
    const newState = store.getState();
    expect(newState.givenUp).toBe(true);
  });
});

describe("setCustomWordMode", () => {
  test("sets customWordMode to action's payload", () => {
    const store = storeFactory({
      customWordMode: false,
    });
    store.dispatch(setCustomWordMode(true));
    const newState = store.getState();
    expect(newState.customWordMode).toBe(true);
  });
});

describe("setFormIsSubmitted", () => {
  test("sets formIsSubmitted to action's payload", () => {
    const store = storeFactory({ formIsSubmitted: false });
    store.dispatch(setFormIsSubmitted(true));
    const newState = store.getState();
    expect(newState.formIsSubmitted).toBe(true);
  });
});
