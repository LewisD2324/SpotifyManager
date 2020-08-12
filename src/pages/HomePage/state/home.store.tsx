import { withContext } from "../../../packages/withContext/withContext";
import { HomeState, HomeReducer } from "./home.reducer";
import { HomeAction } from "./home.actions.types";
import { applyHomeEffects } from "./home.effects";
import { Props } from "../../../models/props";
import { initialState } from "./home.reducer";

export const useHome = withContext<HomeState, HomeAction>({
  initialState,
  reducer: HomeReducer,
  applyEffects: applyHomeEffects,
});

export type HomeContextType = {
  ContextProvider: (props: Props) => JSX.Element;
  ContextConsumer: React.Consumer<{
    state: HomeState;
    dispatch: React.Dispatch<HomeAction>;
  }>;
  state: HomeState;
  dispatch: (action: HomeAction) => void;
};
