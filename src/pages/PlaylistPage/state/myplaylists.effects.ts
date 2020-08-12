import axios from "axios";
import { AppAction } from "../../../app/state/app.action.types";
import { AppState } from "../../../app/state/app.reducer";
import * as actions from "./myplaylists.actions";
import {
  MyPlaylistsAction,
  MyPlaylistsActionTypes,
} from "./myplaylists.actions.types";

export const applyMyPlaylistsEffects = (
  dispatch: React.Dispatch<MyPlaylistsAction>,
  globalDispatch: React.Dispatch<AppAction>,
  globalState: AppState
) => async (action: MyPlaylistsAction) => {
  switch (action.type) {
    case MyPlaylistsActionTypes.REMOVE_FROM_PLAYLIST:
      try {
        const playlistaddbody = {
          playlist_id: action.payload.playlist_id,
          track: action.payload.track,
        };

        console.log(playlistaddbody);
        const response = await axios.post(
          "/api/removefromplaylist",
          playlistaddbody
        );
        // const updatedPlaylistTracks = state.playlists.filter((item: any) => {
        //   item.id !== playlistaddbody.track;
        // });
        dispatch(actions.removefromplaylistsuccess());
        console.log(response.data);
      } catch {
        console.log("error REMOVE_FROM_PLAYLIST");
      }
      break;
    case MyPlaylistsActionTypes.GET_PLAYLIST_TRACKS:
      try {
        const body = {
          playlist_id: action.payload.playlist_id,
          totaltracks: action.payload.totaltracks,
        };

        console.log(body);
        const response = await axios.post("/api/playlisttracks", body);
        dispatch(actions.get_playlist_tracks_success(response.data));
        console.log(response.data);
      } catch {
        console.log("error GET_PLAYLIST_TRACKS");
      }
      break;
    default:
      dispatch(action);
  }
};
