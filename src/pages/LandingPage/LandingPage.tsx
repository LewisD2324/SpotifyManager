import React, { useState, useEffect } from "react";
import * as actions from "../../actions/spotifyactions";
import { useSpotifyContext } from "../../store/spotifystore";
import Search from "../../components/Search/Search";
import SearchSwitches from "../../components/SearchSwitches/SearchSwitches";
import Playlist from "../../components/Playlists/Playlists";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/NavBar/NavBar";
import AlbumSongs from "../../components/AlbumSongs/AlbumSongs";
import styled from "styled-components";
import TrackControls from "../../components/TrackControls/TrackControls";
import TrackList from "../../components/TrackList/TrackList";

const LandingPage: React.FC = () => {
  const { dispatch, state } = useSpotifyContext();

  const [artistcheck, setartistcheck] = useState(false);
  const [trackcheck, settrackcheck] = useState(true);
  const [albumscheck, setalbumscheck] = useState(false);

  const [showtracks, setshowtracks] = useState(true);

  const [showartisttracks, setshowartisttracks] = useState(false);

  const [showalbums, setshowalbums] = useState(false);

  const [isLoading, setisLoading] = useState(true);

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.searchvalue(e.currentTarget.value));
  };
  const handleOnSelect = (e: any) => {
    dispatch(actions.searchvalue(e.target.value));
  };

  useEffect(() => {
    if (trackcheck) {
      dispatch(actions.search_tracks(state.searchvalue));
    } else if (artistcheck) {
      dispatch(actions.search_artists(state.searchvalue));
    } else if (albumscheck) {
      dispatch(actions.search_albums(state.searchvalue));
    }
  }, [state.searchvalue]);

  useEffect(() => {
    if (state.userinfo !== null) {
      dispatch(actions.get_playlist(state.userinfo.id));
      setisLoading(false);
    }
  }, [state.userinfo]);

  useEffect(() => {
    if (state.tracks !== null) {
      const track_ids = state.tracks.map((track: any) => track.id);
      dispatch(actions.get_track_audio_features(track_ids));
    }
  }, [state.tracks]);

  useEffect(() => {
    dispatch(actions.userinfo());
  }, []);

  const handleSwitchChange = (e: any) => {
    if (e.target.name === "artistcheck") {
      setartistcheck(e.target.checked);
      settrackcheck(false);
      setalbumscheck(false);

      setshowtracks(false);
      setshowalbums(false);
      setshowartisttracks(true);
    } else if (e.target.name === "trackscheck") {
      settrackcheck(e.target.checked);
      setartistcheck(false);
      setalbumscheck(false);

      setshowartisttracks(false);
      setshowalbums(false);
      setshowtracks(true);
    } else if (e.target.name === "albumscheck") {
      setalbumscheck(e.target.checked);
      settrackcheck(false);
      setartistcheck(false);

      setshowartisttracks(false);
      setshowtracks(false);
      setshowalbums(true);
    }
  };

  const handleSearchClick = () => {
    if (trackcheck) {
      dispatch(actions.search_tracks(state.searchvalue));
    } else if (artistcheck) {
      dispatch(actions.search_artists_tracks(state.searchvalue));
    } else if (albumscheck) {
      dispatch(actions.search_albums(state.searchvalue));
    }
    // setshowsongs(true);
  };

  const handleAddtoPlaylist = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    //TODO need an error to say "you need to select a playlist"

    console.log(state.selected_playlist, e.currentTarget.id);
    dispatch(
      actions.addtoplaylist(state.selected_playlist, e.currentTarget.id)
    );
    Notify();
  };

  const Notify = () => {
    toast("Added to Playlist");
  };

  const rendersongs = () => {
    if (showtracks || showartisttracks) {
      return (
        <TrackList
          tracks={state.tracks}
          addtoplaylist={handleAddtoPlaylist}
          showPlaylistTrackControls={false}
        />
      );
    } else {
      return null;
    }
  };

  const handleSearchAlbumTracks = (albumid: string) => {
    dispatch(actions.search_album_tracks(albumid));
  };

  const renderalbums = () => {
    if (showalbums) {
      return (
        <AlbumSongs
          tracks={state.album_tracks}
          albums={state.albums}
          searchalbumtracks={(albumid: string) => {
            handleSearchAlbumTracks(albumid);
          }}
        />
      );
    } else {
      return null;
    }
  };

  const handleSuggestions = () => {
    if (trackcheck) {
      return state.tracks.map((x: any) => x.name);
    } else if (artistcheck) {
      return state.artists.map((x: any) => x.name);
    } else if (albumscheck) {
      return state.albums.map((x: any) => x.name);
    }
  };

  const handleOnClickPlaylist = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    console.log(e.currentTarget);
    dispatch(actions.selected_playlist(e.currentTarget.id));
    e.currentTarget.style.backgroundColor = "#f00";
  };

  const handleBPMChange = (event: React.ChangeEvent<{}>, value: number[]) => {
    console.log(value);
  };

  const handleDeletePlaylist = () => {};

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div style={{ display: "flex", marginLeft: "auto" }}>
        <Search
          handleChangeValue={handleSearchValue}
          searchclick={handleSearchClick}
          suggestions={handleSuggestions()}
          handleOnSelect={handleOnSelect}
        />
        <SearchSwitches
          artistchecked={artistcheck}
          trackschecked={trackcheck}
          albumschecked={albumscheck}
          handleSwitchChange={handleSwitchChange}
        />
      </div>
      <p style={{ marginLeft: "40px" }}>Add To Your Playlist</p>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <Playlist
          playlists={state.playlists}
          onClick={handleOnClickPlaylist}
          deletePlaylist={handleDeletePlaylist}
        />
      )}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {showtracks || showartisttracks ? (
          <TrackList
            tracks={state.tracks}
            addtoplaylist={handleAddtoPlaylist}
            showPlaylistTrackControls={false}
          />
        ) : null}
        <TrackControls onBPMChange={handleBPMChange} />

        {/* {rendersongs()} */}

        {renderalbums()}
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default LandingPage;
