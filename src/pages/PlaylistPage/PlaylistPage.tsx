import React, { useEffect, useState } from "react";
import * as actions from "../../actions/spotifyactions";
import { useSpotifyContext } from "../../store/spotifystore";
import Playlist from "../../components/Playlists/Playlists";
import NavBar from "../../components/NavBar/NavBar";
import SongList from "../../components/SongList/SongList";
import PlayListSongs from "../../components/PlaylistSongs/PlaylistSongs";
import { ToastContainer, toast } from "react-toastify";
import { Paper } from "@material-ui/core";

const PlaylistPage = () => {
  const { dispatch, state } = useSpotifyContext();
  console.log(state);

  const [showsongs, setshowsongs] = useState(false);

  useEffect(() => {
    dispatch(actions.get_playlist(state.userinfo.id));
  }, []);

  // useEffect(() => {
  //   if (state.selected_playlist !== "" && state.playlists.length > 0) {
  //     const selectedPlaylist = state.playlists.filter(
  //       (x: any) => x.id === state.selected_playlist
  //     );
  //     dispatch(
  //       actions.get_playlist_tracks(
  //         state.selected_playlist,
  //         selectedPlaylist[0].tracks.total
  //       )
  //     );
  //   }
  // }, [state.selected_playlist, state.playlist_tracks]);

  const handleOnClickPlaylist = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    dispatch(actions.selected_playlist(e.currentTarget.id));
    console.log(state.selected_playlist);

    const selectedPlaylist = state.playlists.filter(
      (x: any) => x.id === e.currentTarget.id
    );

    console.log(selectedPlaylist[0].tracks.total);

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
      actions.removefromplaylist(state.selected_playlist, e.currentTarget.id)
    );
    toast("Removed From Playlist");

    const selectedPlaylist = state.playlists.filter(
      (x: any) => x.id === state.selected_playlist
    );

    console.log(selectedPlaylist);

    await dispatch(
      actions.get_playlist_tracks(
        state.selected_playlist,
        selectedPlaylist[0].tracks.total
      )
    );
  };

  return (
    <div>
      <NavBar />
      <Playlist playlists={state.playlists} onClick={handleOnClickPlaylist} />
      {showsongs ? (
        <PlayListSongs
          tracks={state.playlist_tracks}
          removefromplaylist={handleRemoveFromPlaylist}
        />
      ) : null}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default PlaylistPage;
