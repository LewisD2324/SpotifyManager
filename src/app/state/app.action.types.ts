export enum GlobalActionTypes {
  USER_INFO = "USER_INFO",
  USER_INFO_SUCCESS = "USER_INFO_SUCCESS",
  GET_PLAYLIST = "GET_PLAYLIST",
  GET_PLAYLIST_SUCCESS = "GET_PLAYLIST_SUCCESS",
  CREATE_PLAYLIST = "CREATE_PLAYLIST",
  CREATE_PLAYLIST_SUCCESS = "CREATE_PLAYLIST_SUCCESS",
  DELETE_PLAYLIST = "DELETE_PLAYLIST",
  DELETE_PLAYLIST_SUCCESS = "DELETE_PLAYLIST_SUCCESS",
  SELECTED_PLAYLIST = "SELECTED_PLAYLIST",
}

type UserInfoAction = {
  type: GlobalActionTypes.USER_INFO;
};

type UserInfoSuccessAction = {
  type: GlobalActionTypes.USER_INFO_SUCCESS;
  payload: any;
};

type GetPlaylistAction = {
  type: GlobalActionTypes.GET_PLAYLIST;
  payload: string;
};

type GetPlaylistSuccessAction = {
  type: GlobalActionTypes.GET_PLAYLIST_SUCCESS;
  payload: any;
};

type CreatePlaylistAction = {
  type: GlobalActionTypes.CREATE_PLAYLIST;
  payload: {
    user_id: string;
    playlistName: string;
    description: string;
  };
};

type CreatePlaylistSuccessAction = {
  type: GlobalActionTypes.CREATE_PLAYLIST_SUCCESS;
};

type DeletePlaylistAction = {
  type: GlobalActionTypes.DELETE_PLAYLIST;
  payload: string;
};

type DeletePlaylistSuccessAction = {
  type: GlobalActionTypes.DELETE_PLAYLIST_SUCCESS;
};

type SelectedPlaylistAction = {
  type: GlobalActionTypes.SELECTED_PLAYLIST;
  payload: string;
};

export type AppAction =
  | UserInfoAction
  | UserInfoSuccessAction
  | GetPlaylistAction
  | GetPlaylistSuccessAction
  | CreatePlaylistAction
  | CreatePlaylistSuccessAction
  | DeletePlaylistAction
  | DeletePlaylistSuccessAction
  | SelectedPlaylistAction;
