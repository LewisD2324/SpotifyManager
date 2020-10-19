import React, { useEffect, useState } from "react";
import * as actions from "./state/myplaylists.actions";
import Playlist from "../../components/Playlists/Playlists";
import NavBar from "../../components/NavBar/NavBar";
import TrackList from "../../components/TrackList/TrackList";
import { ToastContainer, toast } from "react-toastify";
import { Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMyPlaylists } from "./state/myplaylists.store";
import { useAppContext } from "../../app/state/app.store";
import { get_playlist, selected_playlist } from "../../app/state/app.actions";

const PlaylistPage = () => {
  const { dispatch, state, ContextProvider } = useMyPlaylists();
  const appContext = useAppContext();
  console.log(appContext.state);
  const [showsongs, setshowsongs] = useState(false);

  useEffect(() => {
    appContext.dispatch(get_playlist(appContext.state.userinfo.id));
  }, []);

  const handleOnClickPlaylist = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    //  setshowPlaylistControls(e.currentTarget.id);
    appContext.dispatch(selected_playlist(e.currentTarget.id));

    const selectedPlaylist = appContext.state.playlists.filter(
      (x: any) => x.id === e.currentTarget.id
    );

    dispatch(
      actions.get_playlist_tracks(
        e.currentTarget.id,
        selectedPlaylist[0].tracks.total
      )
    );

    setshowsongs(true);
  };

  const handleRemoveFromPlaylist = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    await dispatch(
      actions.removefromplaylist(
        appContext.state.selected_playlist,
        e.currentTarget.id
      )
    );
    toast("Removed From Playlist");

    const selectedPlaylist = appContext.state.playlists.filter(
      (x: any) => x.id === appContext.state.selected_playlist
    );

    console.log(selectedPlaylist);

    await dispatch(
      actions.get_playlist_tracks(
        appContext.state.selected_playlist,
        selectedPlaylist[0].tracks.total
      )
    );
  };

  const handleDeletePlaylist = () => {
    //  dispatch(deleteplaylist(state.selected_playlist));
    toast("Playlist Unfollowed");
  };

  return (
    <ContextProvider>
      <div data-testid="playlist-page">
        <div
          style={{
            backgroundImage: "linear-gradient(-45deg, purple, #53025359)",

            height: "300px",
          }}
        ></div>
        {appContext.state.playlists.length === 0 ? (
          <CircularProgress />
        ) : (
          <Playlist
            playlists={appContext.state.playlists}
            onClick={handleOnClickPlaylist}
            deletePlaylist={handleDeletePlaylist}
            //   showPlaylistControls={showPlaylistControls}
          />
        )}
        {showsongs ? (
          <TrackList
            tracks={state.tracks}
            removefromplaylist={handleRemoveFromPlaylist}
            showPlaylistTrackControls={true}
          />
        ) : null}
      </div>
    </ContextProvider>
  );
};

export default PlaylistPage;
