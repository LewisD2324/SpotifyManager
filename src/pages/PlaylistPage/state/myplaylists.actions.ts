import { Track } from '../../../models/track';
import { MyPlaylistsAction, MyPlaylistsActionTypes } from './myplaylists.actions.types';
export const get_playlist_tracks = (playlist_id: string, totaltracks: number): MyPlaylistsAction => {
    return {
        type: MyPlaylistsActionTypes.GET_PLAYLIST_TRACKS,
        payload: { playlist_id, totaltracks },
    };
};

export const get_playlist_tracks_success = (tracks: Track[]): MyPlaylistsAction => {
    return {
        type: MyPlaylistsActionTypes.GET_PLAYLIST_TRACKS_SUCCESS,
        payload: tracks,
    };
};

export const removefromplaylist = (playlist_id: string, track: string): MyPlaylistsAction => {
    return {
        type: MyPlaylistsActionTypes.REMOVE_FROM_PLAYLIST,
        payload: { playlist_id, track },
    };
};

export const removefromplaylistsuccess = (): // updatedPlaylistTracks: any
MyPlaylistsAction => {
    return {
        type: MyPlaylistsActionTypes.REMOVE_FROM_PLAYLIST_SUCCESS,
        // payload: updatedPlaylistTracks,
    };
};
