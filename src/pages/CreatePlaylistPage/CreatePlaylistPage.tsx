import React from "react";
import CreatePlaylistForm from "../../components/CreatePlaylistForm/CreatePlaylistForm";
import NavBar from "../../components/NavBar/NavBar";
import { useSpotifyContext } from "../../store/spotifystore";
import { createplaylist } from "../../actions/spotifyactions";
import { toast } from "react-toastify";
import { Redirect } from "@reach/router";

const CreatePlaylistPage = () => {
  const { dispatch, state } = useSpotifyContext();

  const handleSubmit = (playlistName: string, description: string) => {
    dispatch(createplaylist(state.userinfo.id, playlistName, description));
    toast.success("Playlist Created");
    <Redirect from="/CreatePlaylist" to="/Landing" />;
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <CreatePlaylistForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePlaylistPage;
