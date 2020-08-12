export enum HomeActionTypes {
  SEARCH_VALUE = "SEARCH_VALUE",
  SEARCH_TRACKS = "SEARCH_TRACKS",
  SEARCH_TRACKS_SUCCESS = "SEARCH_TRACKS_SUCCESS",
  SEARCH_ARTISTS = "SEARCH_ARTISTS",
  SEARCH_ARTISTS_TRACKS = "SEARCH_ARTISTS_TRACKS",
  SEARCH_ARTISTS_SUCCESS = "SEARCH_ARTISTS_SUCCESS",
  SEARCH_ARTISTS_TRACKS_SUCCESS = "SEARCH_ARTISTS_TRACKS_SUCCESS",

  ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST",
  ADD_TO_PLAYLIST_SUCCESS = "ADD_TO_PLAYLIST_SUCCESS",
  SELECTED_PLAYLIST = "SELECTED_PLAYLIST",
  SELECTED_ALBUM = "SELECTED_ALBUM",

  SEARCH_ALBUMS = "SEARCH_ALBUMS",
  SEARCH_ALBUMS_SUCCESS = "SEARCH_ALBUMS_SUCCESS",
  SEARCH_ALBUMS_TRACKS = "SEARCH_ALBUMS_TRACKS",
  SEARCH_ALBUMS_TRACKS_SUCCESS = "SEARCH_ALBUMS_TRACKS_SUCCESS",

  BPM_CHANGE = "BPM_CHANGE",
}

type SearchValueAction = {
  type: HomeActionTypes.SEARCH_VALUE;
  payload: string;
};

type SearchTracksAction = {
  type: HomeActionTypes.SEARCH_TRACKS;
  payload: string;
};
type SearchTracksSuccessAction = {
  type: HomeActionTypes.SEARCH_TRACKS_SUCCESS;
  payload: any;
};

type SearchArtistsAction = {
  type: HomeActionTypes.SEARCH_ARTISTS;
  payload: string;
};

type SearchArtistsSuccessAction = {
  type: HomeActionTypes.SEARCH_ARTISTS_SUCCESS;
  payload: any;
};

type SearchArtistsTracksAction = {
  type: HomeActionTypes.SEARCH_ARTISTS_TRACKS;
  payload: string;
};

type SearchArtistsTracksSuccessAction = {
  type: HomeActionTypes.SEARCH_ARTISTS_TRACKS_SUCCESS;
  payload: any;
};

type AddToPlaylistAction = {
  type: HomeActionTypes.ADD_TO_PLAYLIST;
  payload: {
    playlist_id: string;
    track: string;
  };
};

type AddToPlaylistSuccessAction = {
  type: HomeActionTypes.ADD_TO_PLAYLIST_SUCCESS;
};

type SelectedPlaylistAction = {
  type: HomeActionTypes.SELECTED_PLAYLIST;
  payload: string;
};

type SelectedAlbumAction = {
  type: HomeActionTypes.SELECTED_ALBUM;
  payload: string;
};

type SearchAlbumsAction = {
  type: HomeActionTypes.SEARCH_ALBUMS;
  payload: string;
};

type SearchAlbumsSuccessAction = {
  type: HomeActionTypes.SEARCH_ALBUMS_SUCCESS;
  payload: any;
};

type SearchAlbumTracksAction = {
  type: HomeActionTypes.SEARCH_ALBUMS_TRACKS;
  payload: string;
};

type SearchAlbumTracksSuccessAction = {
  type: HomeActionTypes.SEARCH_ALBUMS_TRACKS_SUCCESS;
  payload: any;
};

type BPMChangeAction = {
  type: HomeActionTypes.BPM_CHANGE;
  payload: number[];
};

export type HomeAction =
  | SearchValueAction
  | SearchTracksAction
  | SearchTracksSuccessAction
  | SearchArtistsAction
  | SearchArtistsSuccessAction
  | SearchArtistsTracksAction
  | SearchArtistsTracksSuccessAction
  | AddToPlaylistAction
  | AddToPlaylistSuccessAction
  | SelectedPlaylistAction
  | SelectedAlbumAction
  | SearchAlbumsAction
  | SearchAlbumsSuccessAction
  | SearchAlbumTracksAction
  | SearchAlbumTracksSuccessAction
  | BPMChangeAction;
