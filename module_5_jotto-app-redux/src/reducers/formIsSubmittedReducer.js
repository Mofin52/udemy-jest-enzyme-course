import { actionTypes } from "../actions";

const formIsSubmittedReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.FORM_IS_SUBMITTED:
      return action.payload;
    default:
      return state;
  }
};

export default formIsSubmittedReducer;
