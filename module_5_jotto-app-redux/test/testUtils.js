import checkPropTypes from "check-prop-types";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../src/reducers";
import { middlewares } from "../src/configureStore";

export const findByTestAttr = (wrapper, value) =>
  wrapper.find(`[data-test="${value}"]`);

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};

export const storeFactory = (initialState) => {
  const createStoreWithMiddleWare = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleWare(rootReducer, initialState);
};
