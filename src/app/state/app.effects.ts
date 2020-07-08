import { AppAction, GlobalActionTypes } from "./app.action.types";
import { AppState } from "./app.reducer";
import axios from "axios";
import * as actions from "../state/app.actions";
export const applyAppEffects = (
  dispatch: React.Dispatch<AppAction>,
  state: AppState
) => async (action: AppAction) => {
  switch (action.type) {
    case GlobalActionTypes.LOGIN_IN:
      try {
        //   const loginbody = await axios.get("/login");
        const loginbody = await axios.get("http://localhost:8888/login");

        dispatch(actions.LogInSuccess());
        console.log(loginbody);
      } catch {
        dispatch(actions.LogInError());
        console.log("error LOGIN_IN");
      }
      break;
    default:
      dispatch(action);
  }
};
