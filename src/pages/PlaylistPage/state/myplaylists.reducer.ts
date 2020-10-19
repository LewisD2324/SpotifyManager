import { MyPlaylistsAction, MyPlaylistsActionTypes } from './myplaylists.actions.types';

type Reducer = React.Reducer<MyPlaylistsState, MyPlaylistsAction>;

export type MyPlaylistsState = {
    tracks: any;
};

export const initialState: MyPlaylistsState = {
    tracks: [],
};

export const MyPlaylistsReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case MyPlaylistsActionTypes.GET_PLAYLIST_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.payload,
            };
        default:
            return state;
    }
};
