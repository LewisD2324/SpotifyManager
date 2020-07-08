import { AppAction, GlobalActionTypes } from "./app.action.types";

export type AppState = {
  isAuthticated: boolean;
};

export const appInitialState: AppState = {
  isAuthticated: false,
};

export const AppReducer: React.Reducer<AppState, AppAction> = (
  state = appInitialState,
  action
) => {
  switch (action.type) {
    case GlobalActionTypes.LOGIN_SUCCESS:
      return { ...state, isAuthticated: state.isAuthticated = true };
    case GlobalActionTypes.LOGIN_ERROR:
      return { ...state, isAuthticated: state.isAuthticated = false };
    default:
      return state;
  }
};
