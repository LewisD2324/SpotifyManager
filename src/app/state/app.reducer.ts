import { Playlist } from '../../models/playlist';
import { AppAction, GlobalActionTypes } from './app.action.types';

export type AppState = {
    userinfo: any;
    playlists: Playlist[];
    selected_playlist_id: string;
};

export const appInitialState: AppState = {
    userinfo: '',
    playlists: [],
    selected_playlist_id: '',
};

export const AppReducer: React.Reducer<AppState, AppAction> = (state = appInitialState, action) => {
    switch (action.type) {
        case GlobalActionTypes.USER_INFO_SUCCESS:
            return {
                ...state,
                userinfo: action.payload,
            };
        case GlobalActionTypes.GET_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlists: action.payload,
            };
        case GlobalActionTypes.SELECTED_PLAYLIST:
            return {
                ...state,
                selected_playlist: action.payload,
            };
        default:
            return state;
    }
};
