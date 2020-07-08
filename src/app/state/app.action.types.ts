export enum GlobalActionTypes {
  LOGIN_IN = "LOGIN_IN",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
}

type LogInAction = {
  type: GlobalActionTypes.LOGIN_IN;
};

type LogInSuccessAction = {
  type: GlobalActionTypes.LOGIN_SUCCESS;
};

type LogInErrorAction = {
  type: GlobalActionTypes.LOGIN_ERROR;
};

export type AppAction = LogInAction | LogInSuccessAction | LogInErrorAction;
