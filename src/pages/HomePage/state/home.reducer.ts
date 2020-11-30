import { Album } from '../../../models/album';
import { Artist } from '../../../models/artist';
import { Track } from '../../../models/track';
import { HomeAction, HomeActionTypes } from './home.actions.types';

type Reducer = React.Reducer<HomeState, HomeAction>;

export type HomeState = {
    searchvalue: string;
    tracks: Track[];
    filtered_tracks: Track[];
    artists: Artist[];
    albums: Album[];
    selected_playlist_id: string;
    selected_album: string;
};

export const initialState: HomeState = {
    selected_playlist_id: '',
    selected_album: '',
    searchvalue: '',
    artists: [],
    albums: [],
    tracks: [],
    filtered_tracks: [],
};

export const HomeReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case HomeActionTypes.SEARCH_VALUE:
            return {
                ...state,
                searchvalue: action.payload,
            };
        case HomeActionTypes.SEARCH_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.payload,
                filtered_tracks: action.payload,
            };
        case HomeActionTypes.SEARCH_ARTISTS_SUCCESS:
            return {
                ...state,
                artists: action.payload,
            };
        case HomeActionTypes.SEARCH_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.payload,
            };
        case HomeActionTypes.SEARCH_ARTISTS_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.payload,
                filtered_tracks: action.payload,
            };
        case HomeActionTypes.SEARCH_ALBUMS_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: action.payload,
                filtered_tracks: action.payload,
            };
        case HomeActionTypes.CLEAR_TRACKS:
            return {
                ...state,
                tracks: [],
                filtered_tracks: [],
            };
        case HomeActionTypes.SELECTED_PLAYLIST:
            return {
                ...state,
                selected_playlist: action.payload,
            };
        case HomeActionTypes.SELECTED_ALBUM:
            return {
                ...state,
                selected_album: action.payload,
            };
        case HomeActionTypes.BPM_CHANGE:
            const maxBPM = Math.max(action.payload[0], action.payload[1]);
            const minBPM = Math.min(action.payload[0], action.payload[1]);

            //TODO - this will break if audio_features is undefined
            const filtered_tracks = state.tracks.filter(
                (track: Track) => track.audio_feature.tempo >= minBPM && track.audio_feature.tempo <= maxBPM
            );

            return {
                ...state,
                filtered_tracks: filtered_tracks,
            };

        default:
            return state;
    }
};
