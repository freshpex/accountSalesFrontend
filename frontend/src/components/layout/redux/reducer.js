import { TOGGLE_SIDEBAR } from './actions';

const initialState = {
  isSidebarOpen: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};

export default layoutReducer;
