import { ActionTypes } from "../../store/types";

const initialState = {
  isLoggingOut: false,
  error: null,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggingOut: true,
        error: null,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
      };
    case ActionTypes.LOGOUT_ERROR:
      return {
        ...state,
        isLoggingOut: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
