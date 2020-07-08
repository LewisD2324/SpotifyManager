import React, { useState, useEffect } from "react";
import * as actions from "../../actions/spotifyactions";
import { useSpotifyContext } from "../../store/spotifystore";
import Search from "../../components/Search/Search";
import SearchSwitches from "../../components/SearchSwitches/SearchSwitches";
import Playlist from "../../components/Playlists/Playlists";
import SongList from "../../components/SongList/SongList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/NavBar/NavBar";
import AlbumSongs from "../../components/AlbumSongs/AlbumSongs";

const LandingPage: React.FC = () => {
  const { dispatch, state } = useSpotifyContext();

  const [artistcheck, setartistcheck] = useState(false);
  const [trackcheck, settrackcheck] = useState(true);
  const [albumscheck, setalbumscheck] = useState(false);

  const [showtracks, setshowtracks] = useState(false);

  const [showartisttracks, setshowartisttracks] = useState(false);

  const [showalbums, setshowalbums] = useState(false);

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
    dispatch(actions.get_playlist());
  }, []);

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
        <SongList tracks={state.tracks} addtoplaylist={handleAddtoPlaylist} />
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
    console.log(e.currentTarget.id);
    dispatch(actions.selected_playlist(e.currentTarget.id));
    e.currentTarget.style.backgroundColor = "#f00";
  };

  return (
    <div>
      <header>
        <NavBar />
        <button onClick={() => dispatch(actions.refreshtoken())}>
          refresh
        </button>
      </header>
      <p>Playlists</p>
      <Playlist playlists={state.playlists} onClick={handleOnClickPlaylist} />
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
      <ToastContainer autoClose={1000} />
      {rendersongs()}
      {renderalbums()}
    </div>
  );
};

export default LandingPage;
