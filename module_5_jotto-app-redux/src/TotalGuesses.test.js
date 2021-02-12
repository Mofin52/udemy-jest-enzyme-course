import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../test/testUtils";
import { TotalGuesses } from "./TotalGuesses";

const setup = () => {
  return shallow(<TotalGuesses guesses={3} />);
};

describe("total guesses", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test("renders without error", () => {
    const component = findByTestAttr(wrapper, "total-guesses");
    expect(component.length).toBe(1);
  });
  test("renders correct number of guesses", () => {
    const component = findByTestAttr(wrapper, "total-guesses-value");
    expect(component.text()).toBe("3");
  });
  test("does not renders anything if guesses is 0", () => {
    const emptyWrapper = shallow(<TotalGuesses guesses={0} />);
    const component = findByTestAttr(emptyWrapper, "total-guesses");
    expect(component.length).toBe(0);
  });
});
