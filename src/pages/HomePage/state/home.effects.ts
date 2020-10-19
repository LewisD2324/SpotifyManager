import axios from 'axios';
import { HomeAction, HomeActionTypes } from './home.actions.types';
import { AppAction } from '../../../app/state/app.action.types';
import { AppState } from '../../../app/state/app.reducer';
import * as actions from './home.actions';

export const applyHomeEffects = (
    dispatch: React.Dispatch<HomeAction>,
    globalDispatch: React.Dispatch<AppAction>,
    globalState: AppState
) => async (action: HomeAction) => {
    switch (action.type) {
        case HomeActionTypes.SEARCH_TRACKS:
            try {
                const search = {
                    search: action.payload,
                };
                const response = await axios.post('/api/searchsongs', search);
                const tracks = response.data;
                dispatch(actions.search_tracks_success(tracks));
            } catch {
                console.log('error SEARCH_TRACKS');
            }
            break;
        case HomeActionTypes.SEARCH_ARTISTS:
            try {
                const search = {
                    search: action.payload,
                };
                const response = await axios.post('/api/searchartists', search);
                dispatch(actions.search_artists_success(response.data));
            } catch {
                console.log('error SEARCH_ARTISTS');
            }
            break;
        case HomeActionTypes.SEARCH_ARTISTS_TRACKS:
            try {
                const search = {
                    search: action.payload,
                };
                const response = await axios.post('/api/allartisttracks', search);
                dispatch(actions.search_artists_tracks_success(response.data));
                console.log(response.data);
            } catch {
                console.log('error SEARCH_ARTISTS_TRACKS');
            }
            break;
        case HomeActionTypes.SEARCH_ALBUMS_TRACKS:
            try {
                const albumid = {
                    albumid: action.payload,
                };
                const response = await axios.post('/api/searchalbumtracks', albumid);
                dispatch(actions.search_album_tracks_success(response.data));
            } catch {
                console.log('error SEARCH_ALBUMS_TRACKS');
            }
            break;
        case HomeActionTypes.SEARCH_ALBUMS:
            try {
                const search = {
                    search: action.payload,
                };
                const response = await axios.post('/api/searchalbums', search);
                dispatch(actions.search_albums_success(response.data));
            } catch {
                console.log('error SEARCH_ALBUMS');
            }
            break;
        case HomeActionTypes.ADD_TO_PLAYLIST:
            try {
                const playlistaddbody = {
                    playlist_id: action.payload.playlist_id,
                    track: action.payload.track,
                };
                const response = await axios.post('/api/addtoplaylist', playlistaddbody);
                dispatch(actions.addtoplaylistsuccess());
            } catch {
                console.log('error ADD_TO_PLAYLIST');
            }
            break;
        default:
            dispatch(action);
    }
};
