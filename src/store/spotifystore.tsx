import React, { createContext, useReducer, useMemo, useContext } from "react";
import {
  spotifyreducer,
  initialState,
  AppState,
} from "../reducers/spotifyreducer";
import { spotifymiddleware } from "../middleware/spotifymiddleware";
import { SpotifyAction } from "../actions/spotifyactions";

// const spotifycontext = createContext(initialState);

export const spotifycontext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<SpotifyAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<React.Reducer<AppState, SpotifyAction>>(
    spotifyreducer,
    initialState
  );

  const enhancedDispatch = spotifymiddleware(dispatch, state);

  const contextValue = useMemo(() => {
    return { state, dispatch: enhancedDispatch };
  }, [state, enhancedDispatch]);

  return (
    <spotifycontext.Provider value={contextValue}>
      {children}
    </spotifycontext.Provider>
  );
};

export const useSpotifyContext = () => useContext(spotifycontext);

export { StateProvider };
