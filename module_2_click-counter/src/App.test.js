import React from "react";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @return {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 *
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders decrement button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("clicking on increment button increments counter display", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

// Challenges

test("renders error message wrapper", () => {
  const wrapper = setup();
  const errorWrapper = findByTestAttr(wrapper, "error-message");
  expect(errorWrapper.length).toBe(1);
});

test("error message wrapper is empty on render", () => {
  const wrapper = setup();
  const errorWrapper = findByTestAttr(wrapper, "error-message");
  expect(errorWrapper.text()).toBe("");
});

test("clicking on decrement button decrements counter display", () => {
  const wrapper = setup();
  const incrButton = findByTestAttr(wrapper, "increment-button");
  incrButton.simulate("click");
  expect(findByTestAttr(wrapper, "count").text()).toBe("1");

  const decrButton = findByTestAttr(wrapper, "decrement-button");
  decrButton.simulate("click");
  expect(findByTestAttr(wrapper, "count").text()).toBe("0");
});

test("counter does not go below zero", () => {
  const wrapper = setup();
  const decrButton = findByTestAttr(wrapper, "decrement-button");
  decrButton.simulate("click");
  expect(findByTestAttr(wrapper, "count").text()).toBe("0");
});

test("error message is set correctly on going below zero", () => {
  const wrapper = setup();
  const decrButton = findByTestAttr(wrapper, "decrement-button");
  decrButton.simulate("click");
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.text()).toBe("Counter can't go below zero");
});

test("error message gets cleared after increment button is clicked", () => {
  const wrapper = setup();
  const decrButton = findByTestAttr(wrapper, "decrement-button");
  decrButton.simulate("click");
  const incrButton = findByTestAttr(wrapper, "increment-button");
  incrButton.simulate("click");
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.text()).toBe("");
});

test("counter gets incremented as usual after clearing an error", () => {
  const wrapper = setup();
  const decrButton = findByTestAttr(wrapper, "decrement-button");
  decrButton.simulate("click");
  const incrButton = findByTestAttr(wrapper, "increment-button");
  incrButton.simulate("click");
  const counter = findByTestAttr(wrapper, "count");
  expect(counter.text()).toBe("1");
});
