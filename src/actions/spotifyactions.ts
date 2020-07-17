import { Action } from "../models/action";

import { SpotifyActionTypeKeys } from "./spotifyactionTypeKeys";

export type SpotifyAction = Action<SpotifyActionTypeKeys>;

export const userinfo = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.USER_INFO,
  };
};

export const userinfosucess = (userinfo: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.USER_INFO_SUCCESS,
    payload: userinfo,
  };
};

export const addtoplaylist = (
  playlist_id: string,
  track: string
): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.ADD_TO_PLAYLIST,
    payload: { playlist_id, track },
  };
};

export const addtoplaylistsuccess = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.ADD_TO_PLAYLIST_SUCCESS,
  };
};

export const createplaylist = (
  user_id: string,
  playlistName: string,
  description: string
): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.CREATE_PLAYLIST,
    payload: { user_id, playlistName, description },
  };
};

export const createplaylistsuccess = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.CREATE_PLAYLIST_SUCCESS,
  };
};

export const deleteplaylist = (playlist_id: string): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.DELETE_PLAYLIST,
    payload: { playlist_id },
  };
};

export const deleteplaylistsuccess = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.DELETE_PLAYLIST_SUCCESS,
  };
};

export const removefromplaylist = (
  playlist_id: string,
  track: string
): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.REMOVE_FROM_PLAYLIST,
    payload: { playlist_id, track },
  };
};

export const removefromplaylistsuccess = (): // updatedPlaylistTracks: any
SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.REMOVE_FROM_PLAYLIST_SUCCESS,
    // payload: updatedPlaylistTracks,
  };
};

export const searchvalue = (searchvalue: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_VALUE,
    payload: searchvalue,
  };
};

export const search_tracks = (searchvalue: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_TRACKS,
    payload: searchvalue,
  };
};

export const search_tracks_success = (result: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_TRACKS_SUCCESS,
    payload: result,
  };
};

export const search_artists = (searchvalue: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ARTISTS,
    payload: searchvalue,
  };
};

export const search_artists_tracks = (artistid: string): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ARTISTS_TRACKS,
    payload: artistid,
  };
};

export const search_artists_tracks_success = (result: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ARTISTS_TRACKS_SUCCESS,
    payload: result,
  };
};

export const search_album_tracks = (albumid: string): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ALBUMS_TRACKS,
    payload: albumid,
  };
};

export const search_album_tracks_success = (result: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ALBUMS_TRACKS_SUCCESS,
    payload: result,
  };
};

export const search_artists_top_tracks = (artistid: string): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ARTISTS_TOP_TRACKS,
    payload: artistid,
  };
};

export const search_artists_top_tracks_success = (
  result: any
): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ARTISTS_TOP_TRACKS_SUCCESS,
    payload: result,
  };
};

export const search_artists_success = (result: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ARTISTS_SUCCESS,
    payload: result,
  };
};

export const search_albums = (searchvalue: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ALBUMS,
    payload: searchvalue,
  };
};

export const search_albums_success = (result: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SEARCH_ALBUMS_SUCCESS,
    payload: result,
  };
};

export const get_playlist = (userId: string): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.GET_PLAYLIST,
    payload: userId,
  };
};

export const selected_playlist = (playlist_id: string): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.SELECTED_PLAYLIST,
    payload: playlist_id,
  };
};

export const get_playlist_tracks = (
  playlist_id: string,
  totaltracks: number
): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.GET_PLAYLIST_TRACKS,
    payload: { playlist_id, totaltracks },
  };
};

export const get_playlist_tracks_success = (tracks: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.GET_PLAYLIST_TRACKS_SUCCESS,
    payload: tracks,
  };
};

export const get_track_audio_features = (
  track_ids: string[]
): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.GET_TRACK_AUDIO_FEATURES,
    payload: { track_ids },
  };
};

export const get_track_audio_features_success = (
  trackAudioFeatures: any
): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.GET_TRACK_AUDIO_FEATURES_SUCCESS,
    payload: trackAudioFeatures,
  };
};

export const get_playlist_success = (playlists: any): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.GET_PLAYLIST_SUCCESS,
    payload: playlists,
  };
};

export const login = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.LOG_IN,
  };
};

export const loginsuccess = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.LOGIN_SUCCESS,
  };
};

export const refreshtoken = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.REFRESH_TOKEN,
  };
};

export const refreshtoken_success = (): SpotifyAction => {
  return {
    type: SpotifyActionTypeKeys.REFRESH_TOKEN_SUCCESS,
  };
};
