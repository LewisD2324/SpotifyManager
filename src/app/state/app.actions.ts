import { GlobalActionTypes, AppAction } from "./app.action.types";

export const userinfo = (): AppAction => {
  return {
    type: GlobalActionTypes.USER_INFO,
  };
};

export const userinfosuccess = (userinfo: any): AppAction => {
  return {
    type: GlobalActionTypes.USER_INFO_SUCCESS,
    payload: userinfo,
  };
};

export const createplaylist = (
  user_id: string,
  playlistName: string,
  description: string
): AppAction => {
  return {
    type: GlobalActionTypes.CREATE_PLAYLIST,
    payload: { user_id, playlistName, description },
  };
};

export const selected_playlist = (playlist_id: string): AppAction => {
  return {
    type: GlobalActionTypes.SELECTED_PLAYLIST,
    payload: playlist_id,
  };
};

export const createplaylistsuccess = (): AppAction => {
  return {
    type: GlobalActionTypes.CREATE_PLAYLIST_SUCCESS,
  };
};

export const deleteplaylist = (playlist_id: string): AppAction => {
  return {
    type: GlobalActionTypes.DELETE_PLAYLIST,
    payload: playlist_id,
  };
};

export const deleteplaylistsuccess = (): AppAction => {
  return {
    type: GlobalActionTypes.DELETE_PLAYLIST_SUCCESS,
  };
};

export const get_playlist = (userId: string): AppAction => {
  return {
    type: GlobalActionTypes.GET_PLAYLIST,
    payload: userId,
  };
};

export const get_playlist_success = (playlists: any): AppAction => {
  return {
    type: GlobalActionTypes.GET_PLAYLIST_SUCCESS,
    payload: playlists,
  };
};
