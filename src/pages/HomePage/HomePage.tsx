import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as actions from './state/home.actions';
import Search from '../../components/Search/Search';
import SearchSwitches from '../../components/SearchSwitches/SearchSwitches';
import Playlist from '../../components/Playlists/Playlists';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../../components/NavBar/NavBar';
import styled from 'styled-components';
import TrackControls from '../../components/TrackControls/TrackControls';
import TrackList from '../../components/TrackList/TrackList';
import Albums from '../../components/Albums/Albums';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHome } from './state/home.store';
import { useAppContext } from '../../app/state/app.store';
import { get_playlist, userinfo } from '../../app/state/app.actions';
const HomePage: React.FC = () => {
    const { dispatch, state } = useHome();
    const appContext = useAppContext();

    const [artistcheck, setartistcheck] = useState(false);
    const [trackcheck, settrackcheck] = useState(true);
    const [albumscheck, setalbumscheck] = useState(false);

    const [showtracks, setshowtracks] = useState(true);

    const [showartisttracks, setshowartisttracks] = useState(false);

    const [showalbums, setshowalbums] = useState(false);

    const [showalbumtracks, setshowalbumtracks] = useState(false);

    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        if (value !== '') {
            if (trackcheck) {
                dispatch(actions.search_tracks(value));
            } else if (artistcheck) {
                dispatch(actions.search_artists(value));
            } else if (albumscheck) {
                dispatch(actions.search_albums(value));
                console.log(state.albums);
            }
        }
        dispatch(actions.searchvalue(value));
    };

    useEffect(() => {
        if (appContext.state.userinfo !== null) {
            appContext.dispatch(get_playlist(appContext.state.userinfo.id));
        }
    }, [appContext.state.userinfo]);

    useEffect(() => {
        //TO-DO fix this dependancy
        appContext.dispatch(userinfo());
    }, []);

    const handleSwitchChange = (e: any) => {
        if (e.target.name === 'artistcheck') {
            dispatch(actions.clear_tracks());
            setartistcheck(e.target.checked);
            settrackcheck(false);
            setalbumscheck(false);

            setshowalbumtracks(false);
            setshowtracks(false);
            setshowalbums(false);
            setshowartisttracks(true);
        } else if (e.target.name === 'trackscheck') {
            dispatch(actions.clear_tracks());
            settrackcheck(e.target.checked);
            setartistcheck(false);
            setalbumscheck(false);

            setshowalbumtracks(false);
            setshowartisttracks(false);
            setshowalbums(false);
            setshowtracks(true);
        } else if (e.target.name === 'albumscheck') {
            dispatch(actions.clear_tracks());
            setalbumscheck(e.target.checked);
            settrackcheck(false);
            setartistcheck(false);

            setshowalbumtracks(false);
            setshowartisttracks(false);
            setshowtracks(false);
            setshowalbums(true);
        }
    };
    console.log(state.tracks);
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

    const handleAddtoPlaylist = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        //TODO need an error to say "you need to select a playlist"

        console.log(state.selected_playlist, e.currentTarget.id);
        await dispatch(actions.addtoplaylist(state.selected_playlist, e.currentTarget.id));
        toast('Added to Playlist');
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

    const handleSearchAlbumTracks = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const { id } = e.currentTarget;
        setshowalbumtracks(false);
        await dispatch(actions.selected_album(id));
        await dispatch(actions.search_album_tracks(id));
        setshowalbumtracks(true);
    };

    const renderalbums = () => {
        if (showalbums) {
            return <Albums albums={state.albums} onClick={handleSearchAlbumTracks} />;
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

    const handleOnClickPlaylist = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        dispatch(actions.selected_playlist(e.currentTarget.id));
        e.currentTarget.style.backgroundColor = '#f00';
    }, []);

    const handleBPMChange = useCallback((event: React.ChangeEvent<{}>, value: number[]) => {
        console.log(value);
        dispatch(actions.bpmChange(value));
    }, []);

    const handleDeletePlaylist = useCallback(() => {
        toast('Playlist Unfollowed');
    }, []);

    return (
        <div data-testid="home-page">
            <div
                style={{
                    backgroundImage: 'linear-gradient(-45deg, purple, #53025359)',

                    height: '300px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <div>
                        <Search
                            handleChangeValue={handleSearchValue}
                            searchclick={handleSearchClick}
                            suggestions={handleSuggestions()}
                            artistchecked={artistcheck}
                            trackschecked={trackcheck}
                            albumschecked={albumscheck}
                            handleSwitchChange={handleSwitchChange}
                        />
                    </div>
                    <div style={{ marginTop: '186px' }}></div>
                </div>
            </div>
            <p style={{ marginLeft: '40px' }}>Add To Your Playlist</p>
            {appContext.state.playlists.length === 0 ? (
                <CircularProgress />
            ) : (
                <Playlist
                    playlists={appContext.state.playlists}
                    onClick={handleOnClickPlaylist}
                    deletePlaylist={handleDeletePlaylist}
                />
            )}
            <div style={{ display: 'flex' }}>
                {showalbums ? <Albums albums={state.albums} onClick={handleSearchAlbumTracks} /> : null}
                <div style={{ position: 'absolute', left: '450px' }}>
                    {showtracks || showartisttracks ? (
                        <TrackList
                            tracks={state.filtered_tracks}
                            addtoplaylist={handleAddtoPlaylist}
                            showPlaylistTrackControls={false}
                        />
                    ) : showalbumtracks ? (
                        <TrackList
                            tracks={state.filtered_tracks}
                            addtoplaylist={handleAddtoPlaylist}
                            showPlaylistTrackControls={false}
                            album_image={state.albums.find((album: any) => album.id === state.selected_album)}
                        />
                    ) : null}
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    right: '7px',
                    top: '620px',
                    marginRight: '40px',
                }}
            >
                <TrackControls onBPMChange={handleBPMChange} />
            </div>
        </div>
    );
};

export default HomePage;
