import React, { useReducer, useMemo, useContext } from "react";
import { AppState, appInitialState, AppReducer } from "./app.reducer";
import { Props } from "../../models/props";
import { AppAction } from "../state/app.action.types";
import { applyAppEffects } from "./app.effects";

export const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: appInitialState,
  dispatch: () => {},
});

export const AppProvider = (props: Props): JSX.Element => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, AppAction>>(
    AppReducer,
    appInitialState
  );

  const enhancedDispatch = applyAppEffects(dispatch, state);

  const contextValue = useMemo(() => {
    return { state, dispatch: enhancedDispatch };
  }, [state, enhancedDispatch]);

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
};
