import { SpotifyAction } from "./../actions/spotifyactions";
import { SpotifyActionTypeKeys } from "../actions/spotifyactionTypeKeys";

export interface AppState {
  userinfo: any;
  playlists: any;
  searchvalue: string;
  tracks: any;
  filtered_tracks: any;
  artists: any;
  albums: any;
  selected_playlist: string;
  playlist_tracks: any;
  album_tracks: any;
  track_audio_features: any;

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
  filtered_tracks: [],
  artists: [],
  albums: [],
  selected_playlist: "",
  playlist_tracks: [],
  album_tracks: [],
  track_audio_features: [],
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
        filtered_tracks: action.payload,
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
        filtered_tracks: action.payload,
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
    case SpotifyActionTypeKeys.GET_TRACK_AUDIO_FEATURES_SUCCESS:
      //  const tracks = { ...state.tracks };
      // for (const key in tracks) {
      //   const audioFeature = action.payload.find(
      //     (x: any) => x.id === tracks[key].id
      //   );

      //   tracks[key].push(audioFeature);
      // }
      // console.log(tracks);
      // tracks.forEach((track: any) => {
      //   action.payload.foreach((audioFeature: any) => {
      //     if (track.id === audioFeature) tracks.push(audioFeature);
      //   });
      // });

      // console.log(tracks);
      return {
        ...state,
        track_audio_features: action.payload,
      };
    case SpotifyActionTypeKeys.BPM_CHANGE:
      const tracks = { ...state.tracks };
      // const maxBPM = Math.max(action.payload[0], action.payload[1]);
      // const minBPM = Math.min(action.payload[0], action.payload[1]);

      // const filtered_audio_features = state.track_audio_features.audio_features.filter(
      //   (x: any) => {
      //     x.tempo >= minBPM && x.tempo <= maxBPM;
      //   }
      // );
      // console.log(filtered_audio_features);
      //   for (var i=0; i<state.tracks.length; i++) {
      //     if(value >= array[i]){
      //         if(value < array[i+1]){
      //             console.log('Found it between ' + array[i] + ' and ' + array[i+1]);
      //         }
      //     }
      // }

      return {
        ...state,
        track_audio_features: action.payload,
      };

    default:
      return state;
  }
};
