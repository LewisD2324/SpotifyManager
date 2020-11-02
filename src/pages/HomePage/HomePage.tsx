import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContextType } from '../../app/state/app.store';
import Albums from '../../components/Albums/Albums';
import Playlists from '../../components/Playlists/Playlists';
import Search from '../../components/Search/Search';
import TrackControls from '../../components/TrackControls/TrackControls';
import TrackList from '../../components/TrackList/TrackList';
import { Album } from "../../models/album";
import { Artist } from "../../models/artist";
import { Toggle } from "../../models/toggle";
import { Track } from "../../models/track";
import { toggleValues } from "../../utils/constants/toggleValues";
import * as actions from './state/home.actions';
import { HomeContextType } from './state/home.store';
interface HomePageProps {
    appContext : AppContextType;
    homeContext: HomeContextType
}
const HomePage: React.FC<HomePageProps> = ({appContext, homeContext}) => {
    
    const {
        state,
        dispatch,
    } = homeContext;

    const [searchToggles, setSearchToggles] = useState<Toggle[]>(toggleValues);
 
    const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
            if (searchToggles[0].checked) {
                dispatch(actions.search_tracks(value));
            } else if (searchToggles[1].checked) {
                dispatch(actions.search_artists(value));
            } else if (searchToggles[2].checked) {
                dispatch(actions.search_albums(value));
                console.log(state.albums);
            } 
        dispatch(actions.searchvalue(value));
    };

    const handleSwitchChange = (event: any) => {
        const { name, value, id, checked } = event.target;
        dispatch(actions.clear_tracks());
        
        let newArr = searchToggles.map((searchToggle, i) => {
            if (parseInt(id) === i) {
              return { ...searchToggle, 'checked': checked, };
            } else {
              return { ...searchToggle, 'checked': !checked, };
            }
          });
          setSearchToggles(newArr);
    };

    const handleSearchClick = () => {
        if (searchToggles[0].checked) {
            dispatch(actions.search_tracks(state.searchvalue));
        } else if (searchToggles[1].checked) {
            dispatch(actions.search_artists_tracks(state.searchvalue));
        } else if (searchToggles[2].checked) {
            dispatch(actions.search_albums(state.searchvalue));
        }
    };

    const handleAddtoPlaylist = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        //TODO need an error to say "you need to select a playlist"

        await dispatch(actions.addtoplaylist(state.selected_playlist, e.currentTarget.id));
        toast('Added to Playlist');
    };

    const handleSearchAlbumTracks = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        const { id } = e.currentTarget;
        await dispatch(actions.selected_album(id));
        await dispatch(actions.search_album_tracks(id));
    };

    const handleSuggestions = () => {
        if (searchToggles[0].checked) {
            return state.tracks.map((x: Track) => x.name);
        } else if (searchToggles[1].checked) {
            return state.artists.map((x: Artist) => x.name);
        } else if (searchToggles[2].checked) {
            return state.albums.map((x: Album) => x.name);
        }
    };

    const handleOnClickPlaylist = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        dispatch(actions.selected_playlist(e.currentTarget.id));
        e.currentTarget.style.backgroundColor = '#f00';
    };

    const handleBPMChange = (event: React.ChangeEvent<{}>, value: number[]) => {
        dispatch(actions.bpmChange(value));
    };

    const handleDeletePlaylist = () => {
        toast('Playlist Unfollowed');
    };

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
                            handleChangeValue={handleSearchOnChange}
                            searchclick={handleSearchClick}
                            suggestions={handleSuggestions()}
                            searchToggles={searchToggles}
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
                <Playlists
                    playlists={appContext.state.playlists}
                    onClick={handleOnClickPlaylist}
                    deletePlaylist={handleDeletePlaylist}
                />
            )}
            <div style={{ display: 'flex' }}>
                {searchToggles[2].checked ? <Albums albums={state.albums} onClick={handleSearchAlbumTracks} /> : null}
                <div style={{ position: 'absolute', left: '450px' }}>
                    {searchToggles[0].checked || searchToggles[1].checked ? (
                        <TrackList
                            tracks={state.filtered_tracks}
                            addtoplaylist={handleAddtoPlaylist}
                            showPlaylistTrackControls={false}
                        />
                    ) : searchToggles[2].checked ? (
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

export default React.memo(HomePage);
