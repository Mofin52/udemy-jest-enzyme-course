import { actionTypes } from "../actions";

const errorReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
