import { HomeAction, HomeActionTypes } from "./home.actions.types";

export const addtoplaylist = (
  playlist_id: string,
  track: string
): HomeAction => {
  return {
    type: HomeActionTypes.ADD_TO_PLAYLIST,
    payload: { playlist_id, track },
  };
};

export const addtoplaylistsuccess = (): HomeAction => {
  return {
    type: HomeActionTypes.ADD_TO_PLAYLIST_SUCCESS,
  };
};

export const bpmChange = (value: number[]): HomeAction => {
  return {
    type: HomeActionTypes.BPM_CHANGE,
    payload: value,
  };
};

export const searchvalue = (searchvalue: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_VALUE,
    payload: searchvalue,
  };
};

export const search_tracks = (searchvalue: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_TRACKS,
    payload: searchvalue,
  };
};

export const search_tracks_success = (result: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_TRACKS_SUCCESS,
    payload: result,
  };
};

export const search_artists = (searchvalue: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ARTISTS,
    payload: searchvalue,
  };
};

export const search_artists_tracks = (artistid: string): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ARTISTS_TRACKS,
    payload: artistid,
  };
};

export const search_artists_tracks_success = (result: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ARTISTS_TRACKS_SUCCESS,
    payload: result,
  };
};

export const search_album_tracks = (albumid: string): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ALBUMS_TRACKS,
    payload: albumid,
  };
};

export const search_album_tracks_success = (result: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ALBUMS_TRACKS_SUCCESS,
    payload: result,
  };
};

export const search_artists_success = (result: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ARTISTS_SUCCESS,
    payload: result,
  };
};

export const search_albums = (searchvalue: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ALBUMS,
    payload: searchvalue,
  };
};

export const search_albums_success = (result: any): HomeAction => {
  return {
    type: HomeActionTypes.SEARCH_ALBUMS_SUCCESS,
    payload: result,
  };
};

export const selected_playlist = (playlist_id: string): HomeAction => {
  return {
    type: HomeActionTypes.SELECTED_PLAYLIST,
    payload: playlist_id,
  };
};

export const selected_album = (album_id: string): HomeAction => {
  return {
    type: HomeActionTypes.SELECTED_ALBUM,
    payload: album_id,
  };
};
