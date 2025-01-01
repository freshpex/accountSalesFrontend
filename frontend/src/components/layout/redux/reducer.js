import { ActionTypes } from '../../../store/types';

const initialState = {
  isSidebarOpen: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};

export default layoutReducer;
