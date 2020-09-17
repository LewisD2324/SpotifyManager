import { AppAction, GlobalActionTypes } from "./app.action.types";
import { AppState } from "./app.reducer";
import axios from "axios";
import * as actions from "../state/app.actions";
export const applyAppEffects = (
  dispatch: React.Dispatch<AppAction>,
  state: AppState
) => async (action: AppAction) => {
  switch (action.type) {
    case GlobalActionTypes.USER_INFO:
      try {
        const response = await axios.get("/api/userinfo");
        dispatch(actions.userinfosuccess(response.data));
      } catch {
        console.log("error USER_INFO");
      }
      break;
    case GlobalActionTypes.GET_PLAYLIST:
      try {
        const userId = {
          userId: action.payload,
        };
        const response = await axios.post("/api/getplaylist", userId);
        const playlists = response.data;
        dispatch(actions.get_playlist_success(playlists));
      } catch {
        console.log("error playlist");
      }
      break;
    case GlobalActionTypes.DELETE_PLAYLIST:
      try {
        const playlistaddbody = {
          playlist_id: action.payload,
        };

        console.log(playlistaddbody);
        const response = await axios.post(
          "/api/deleteplaylist",
          playlistaddbody
        );

        dispatch(actions.deleteplaylistsuccess());
      } catch {
        console.log("error DELETE_PLAYLIST");
      }
      break;
    case GlobalActionTypes.CREATE_PLAYLIST:
      try {
        const body = {
          user_id: action.payload.user_id,
          playlistName: action.payload.playlistName,
          description: action.payload.description,
        };

        const response = await axios.post("/api/createplaylist", body);
        //TODO - need to pass response to dispatch success
        dispatch(actions.createplaylistsuccess());
      } catch {
        console.log("error CREATE_PLAYLIST");
      }
      break;
    default:
      dispatch(action);
  }
};
