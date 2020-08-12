export enum MyPlaylistsActionTypes {
  REMOVE_FROM_PLAYLIST = "REMOVE_FROM_PLAYLIST",
  REMOVE_FROM_PLAYLIST_SUCCESS = "REMOVE_FROM_PLAYLIST_SUCCESS",
  GET_PLAYLIST_TRACKS = "GET_PLAYLIST_TRACKS",
  GET_PLAYLIST_TRACKS_SUCCESS = "GET_PLAYLIST_TRACKS_SUCCESS",
}

type RemoveFromPlaylistAction = {
  type: MyPlaylistsActionTypes.REMOVE_FROM_PLAYLIST;
  payload: {
    playlist_id: string;
    track: string;
  };
};

type RemoveFromPlaylistSuccessAction = {
  type: MyPlaylistsActionTypes.REMOVE_FROM_PLAYLIST_SUCCESS;
};

type GetPlaylistTrackAction = {
  type: MyPlaylistsActionTypes.GET_PLAYLIST_TRACKS;
  payload: {
    playlist_id: string;
    totaltracks: number;
  };
};

type GetPlaylistTracksSuccessAction = {
  type: MyPlaylistsActionTypes.GET_PLAYLIST_TRACKS_SUCCESS;
  payload: any;
};

export type MyPlaylistsAction =
  | RemoveFromPlaylistAction
  | RemoveFromPlaylistSuccessAction
  | GetPlaylistTrackAction
  | GetPlaylistTracksSuccessAction;
