import { withContext } from '../../../packages/withContext/withContext';
import { MyPlaylistsState, MyPlaylistsReducer, initialState } from './myplaylists.reducer';
import { applyMyPlaylistsEffects } from './myplaylists.effects';
import { Props } from '../../../models/props';
import { MyPlaylistsAction } from './myplaylists.actions.types';

export const useMyPlaylists = withContext<MyPlaylistsState, MyPlaylistsAction>({
    initialState,
    reducer: MyPlaylistsReducer,
    applyEffects: applyMyPlaylistsEffects,
});

export type MyPlaylistsContextType = {
    ContextProvider: (props: Props) => JSX.Element;
    ContextConsumer: React.Consumer<{
        state: MyPlaylistsState;
        dispatch: React.Dispatch<MyPlaylistsAction>;
    }>;
    state: MyPlaylistsState;
    dispatch: (action: MyPlaylistsAction) => void;
};
