import React, { useReducer, useMemo } from 'react';
import { Props } from '../../models/props';
import { AppAction } from '../../app/state/app.action.types';
import { AppState } from '../../app/state/app.reducer';
import { useAppContext } from '../../app/state/app.store';

type ContextReducer<ContextState, ContextAction> = React.Reducer<ContextState, ContextAction>;

type ApplyEffects<ContextAction> = (
    dispatch: React.Dispatch<ContextAction>,
    globalDispatch: React.Dispatch<AppAction>,
    globalState: AppState
) => (action: ContextAction) => void;

type WithContextProps<ContextState, ContextAction> = {
    initialState: React.ReducerState<ContextReducer<ContextState, ContextAction>>;
    reducer: ContextReducer<ContextState, ContextAction>;
    applyEffects: ApplyEffects<ContextAction>;
};

export const withContext = <ContextState, ContextAction>({
    initialState,
    reducer,
    applyEffects,
}: WithContextProps<ContextState, ContextAction>) => () => {
    const Context = React.createContext<{
        state: ContextState;
        dispatch: React.Dispatch<ContextAction>;
    }>({
        state: initialState,
        dispatch: () => {},
    });

    const [state, dispatch] = useReducer<ContextReducer<ContextState, ContextAction>>(reducer, initialState);

    const { state: globalState, dispatch: globalDispatch } = useAppContext();

    const enhancedDispatch = applyEffects(dispatch, globalDispatch, globalState);

    const contextValue = useMemo(() => {
        return { state, dispatch: enhancedDispatch };
    }, [state, enhancedDispatch]);

    const ContextProvider = (props: Props) => (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    );

    return {
        ContextProvider,
        ContextConsumer: Context.Consumer,
        state: contextValue.state,
        dispatch: contextValue.dispatch,
    };
};
