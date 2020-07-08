import React, { useEffect, useState } from "react";
import * as actions from "../../actions/spotifyactions";
import { useSpotifyContext } from "../../store/spotifystore";
import Playlist from "../../components/Playlists/Playlists";
import NavBar from "../../components/NavBar/NavBar";
import SongList from "../../components/SongList/SongList";
import PlayListSongs from "../../components/PlaylistSongs/PlaylistSongs";
import { ToastContainer, toast } from "react-toastify";
const PlaylistPage = () => {
  const { dispatch, state } = useSpotifyContext();
  console.log(state);

  const [showsongs, setshowsongs] = useState(false);

  useEffect(() => {
    dispatch(actions.get_playlist());
  }, []);

  const handleOnClickPlaylist = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    dispatch(actions.selected_playlist(e.currentTarget.id));
    console.log(state.selected_playlist);
    let totaltracks = 0;
    state.playlists
      .filter((x: any) => x.id == e.currentTarget.id)
      .map((x: any) => (totaltracks = x.tracks.total));

    console.log(totaltracks);

    dispatch(actions.get_playlist_tracks(e.currentTarget.id, totaltracks));

    setshowsongs(true);
  };

  const handleRemoveFromPlaylist = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    dispatch(
      actions.removefromplaylist(state.selected_playlist, e.currentTarget.id)
    );
    toast("Removed From Playlist");

    let totaltracks = 0;
    state.playlists
      .filter((x: any) => x.id == state.selected_playlist)
      .map((x: any) => (totaltracks = x.tracks.total));

    dispatch(actions.get_playlist_tracks(state.selected_playlist, totaltracks));
  };

  const rendersongs = () => {
    if (showsongs) {
      return (
        <PlayListSongs
          tracks={state.playlist_tracks}
          removefromplaylist={handleRemoveFromPlaylist}
        />
      );
    } else return null;
  };

  return (
    <div>
      <NavBar />
      <Playlist playlists={state.playlists} onClick={handleOnClickPlaylist} />
      {rendersongs()}
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default PlaylistPage;
