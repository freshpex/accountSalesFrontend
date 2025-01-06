import { ActionTypes } from '../../../store/types';

export const logout = () => ({
  type: ActionTypes.LOGOUT
});

export const logoutSuccess = () => ({
  type: ActionTypes.LOGOUT_SUCCESS
});

export const logoutError = (error) => ({
  type: ActionTypes.LOGOUT_ERROR,
  payload: error
});
