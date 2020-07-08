import { GlobalActionTypes, AppAction } from "./app.action.types";

export const LogIn = (): AppAction => ({
  type: GlobalActionTypes.LOGIN_IN,
});

export const LogInError = (): AppAction => ({
  type: GlobalActionTypes.LOGIN_ERROR,
});

export const LogInSuccess = (): AppAction => ({
  type: GlobalActionTypes.LOGIN_SUCCESS,
});
