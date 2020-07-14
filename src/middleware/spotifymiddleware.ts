import * as actions from "./../actions/spotifyactions";
import { SpotifyAction } from "../actions/spotifyactions";
import React from "react";
import axios from "axios";
import { AppState } from "../reducers/spotifyreducer";
import { SpotifyActionTypeKeys } from "../actions/spotifyactionTypeKeys";

export const spotifymiddleware = (
  dispatch: React.Dispatch<SpotifyAction>,
  state: AppState
) => async (action: SpotifyAction) => {
  switch (action.type) {
    case SpotifyActionTypeKeys.USER_INFO:
      try {
        const response = await axios.get("/api/userinfo");
        dispatch(actions.userinfosucess(response.data));
        console.log(response.data);
      } catch {
        console.log("error USER_INFO");
      }
      break;
    case SpotifyActionTypeKeys.GET_PLAYLIST:
      try {
        const userId = {
          userId: action.payload,
        };
        const response = await axios.post("/api/getplaylist", userId);
        const playlists = response.data;
        dispatch(actions.get_playlist_success(playlists));
        console.log(playlists);
      } catch {
        console.log("error playlist");
      }
      break;
    case SpotifyActionTypeKeys.SEARCH_TRACKS:
      try {
        var search = {
          search: action.payload,
        };
        console.log(search);
        const response = await axios.post("/api/searchsongs", search);
        dispatch(actions.search_tracks_success(response.data));
        console.log(response.data);
      } catch {
        console.log("error SEARCH_TRACKS");
      }
      break;
    case SpotifyActionTypeKeys.SEARCH_ARTISTS:
      try {
        var search = {
          search: action.payload,
        };
        const response = await axios.post("/api/searchartists", search);
        console.log(response.data);
        dispatch(actions.search_artists_success(response.data));
      } catch {
        console.log("error SEARCH_ARTISTS");
      }
      break;
    case SpotifyActionTypeKeys.SEARCH_ARTISTS_TOP_TRACKS:
      try {
        var artistid = {
          artistid: action.payload,
        };
        const response = await axios.post("/api/artisttracks", artistid);
        dispatch(actions.search_artists_top_tracks_success(response.data));
        console.log(response.data);
      } catch {
        console.log("error SEARCH_ARTISTS_TOP_TRACKS");
      }
      break;
    case SpotifyActionTypeKeys.SEARCH_ARTISTS_TRACKS:
      try {
        const search = {
          search: action.payload,
        };
        const response = await axios.post("/api/allartisttracks", search);
        dispatch(actions.search_artists_tracks_success(response.data));
        console.log(response.data);
      } catch {
        console.log("error SEARCH_ARTISTS_TRACKS");
      }
      break;
    case SpotifyActionTypeKeys.SEARCH_ALBUMS_TRACKS:
      try {
        const albumid = {
          albumid: action.payload,
        };
        const response = await axios.post("/api/searchalbumtracks", albumid);
        dispatch(actions.search_album_tracks_success(response.data));
        console.log(response.data);
      } catch {
        console.log("error SEARCH_ALBUMS_TRACKS");
      }
      break;
    case SpotifyActionTypeKeys.SEARCH_ALBUMS:
      try {
        const search = {
          search: action.payload,
        };
        const response = await axios.post("/api/searchalbums", search);
        dispatch(actions.search_albums_success(response.data));
        console.log(response.data);
      } catch {
        console.log("error SEARCH_ALBUMS");
      }
      break;
    case SpotifyActionTypeKeys.ADD_TO_PLAYLIST:
      try {
        const playlistaddbody = {
          playlist_id: action.payload.playlist_id,
          track: action.payload.track,
        };

        console.log(playlistaddbody);
        const response = await axios.post(
          "/api/addtoplaylist",
          playlistaddbody
        );
        dispatch(actions.addtoplaylistsuccess());
        console.log(response.data);
      } catch {
        console.log("error ADD_TO_PLAYLIST");
      }
      break;
    case SpotifyActionTypeKeys.REMOVE_FROM_PLAYLIST:
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
    case SpotifyActionTypeKeys.GET_PLAYLIST_TRACKS:
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
    case SpotifyActionTypeKeys.REFRESH_TOKEN:
      try {
        const response = await axios.get("/api/refresh_token");
        // dispatch(actions.refreshtoken_success());
        console.log(response.data);
      } catch {
        console.log("error REFRESH_TOKEN");
      }
      break;
    default:
      dispatch(action);
  }
};
