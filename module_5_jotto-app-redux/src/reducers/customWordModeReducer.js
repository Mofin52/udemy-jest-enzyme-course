import { actionTypes } from "../actions";

const customWordModeReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SET_CUSTOM_GAME_MODE:
      return action.payload;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};

export default customWordModeReducer;
