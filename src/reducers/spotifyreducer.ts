import { SpotifyAction } from "./../actions/spotifyactions";
import { SpotifyActionTypeKeys } from "../actions/spotifyactionTypeKeys";

export interface AppState {
  userinfo: any;
  playlists: any;
  searchvalue: string;
  tracks: any;
  artists: any;
  albums: any;
  selected_playlist: string;
  playlist_tracks: any;
  album_tracks: any;

  //  access_token: string | null;
}

export interface artists {
  track: any;
}

export interface tracks {
  track: any;
}

export const initialState: AppState = {
  userinfo: null,
  playlists: [],
  searchvalue: "",
  tracks: [],
  artists: [],
  albums: [],
  selected_playlist: "",
  playlist_tracks: [],
  album_tracks: [],
  //  access_token: null,
};

export const spotifyreducer: React.Reducer<AppState, SpotifyAction> = (
  state = initialState,
  action: SpotifyAction
): AppState => {
  console.log(action);
  switch (action.type) {
    case SpotifyActionTypeKeys.USER_INFO_SUCCESS:
      return {
        ...state,
        userinfo: action.payload,
      };
    case SpotifyActionTypeKeys.GET_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlists: action.payload,
      };
    case SpotifyActionTypeKeys.SEARCH_VALUE:
      return {
        ...state,
        searchvalue: action.payload,
      };
    case SpotifyActionTypeKeys.SEARCH_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
      };
    case SpotifyActionTypeKeys.SEARCH_ARTISTS_SUCCESS:
      return {
        ...state,
        artists: action.payload,
      };
    case SpotifyActionTypeKeys.SEARCH_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: action.payload,
      };
    case SpotifyActionTypeKeys.SEARCH_ARTISTS_TOP_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
      };
    case SpotifyActionTypeKeys.SEARCH_ARTISTS_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: action.payload,
      };
    case SpotifyActionTypeKeys.SEARCH_ALBUMS_TRACKS_SUCCESS:
      return {
        ...state,
        album_tracks: action.payload,
      };
    case SpotifyActionTypeKeys.GET_PLAYLIST_TRACKS_SUCCESS:
      return {
        ...state,
        playlist_tracks: action.payload,
      };
    case SpotifyActionTypeKeys.SELECTED_PLAYLIST:
      return {
        ...state,
        selected_playlist: action.payload,
      };

    default:
      return state;
  }
};
