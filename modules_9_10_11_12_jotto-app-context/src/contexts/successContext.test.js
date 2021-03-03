import React from "react";
import { shallow, mount } from "enzyme";

import successContext from "./successContext";

// A dummy component that is required just to call useSuccess for test purposes
const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

test("useSuccess throws error when not wrapped in SuccessProvider", () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow("useSuccess must be used within a SuccessProvider");
});

test("useSuccess does not throw error when wrapped in SuccessProvider", () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow();
});
