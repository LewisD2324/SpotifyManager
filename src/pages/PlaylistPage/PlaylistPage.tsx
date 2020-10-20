import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { get_playlist, selected_playlist } from '../../app/state/app.actions';
import { useAppContext } from '../../app/state/app.store';
import Playlists from '../../components/Playlists/Playlists';
import TrackList from '../../components/TrackList/TrackList';
import { Playlist } from '../../models/playlist';
import * as actions from './state/myplaylists.actions';
import { useMyPlaylists } from './state/myplaylists.store';

const PlaylistPage = () => {
    const { dispatch, state, ContextProvider } = useMyPlaylists();
    const appContext = useAppContext();

    const [showsongs, setshowsongs] = useState(false);

    useEffect(() => {
        appContext.dispatch(get_playlist(appContext.state.userinfo.id));
    }, []);

    const handleOnClickPlaylist = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  
        appContext.dispatch(selected_playlist(e.currentTarget.id));

        const selectedPlaylist = appContext.state.playlists.filter((playlist: Playlist) => playlist.id === e.currentTarget.id);

        dispatch(actions.get_playlist_tracks(e.currentTarget.id, selectedPlaylist[0].tracks.total));

        setshowsongs(true);
    };

    const handleRemoveFromPlaylist = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        await dispatch(actions.removefromplaylist(appContext.state.selected_playlist, e.currentTarget.id));
        toast('Removed From Playlist');

        const selectedPlaylist = appContext.state.playlists.filter(
            (playlist: Playlist) => playlist.id === appContext.state.selected_playlist
        );


        await dispatch(
            actions.get_playlist_tracks(appContext.state.selected_playlist, selectedPlaylist[0].tracks.total)
        );
    };

    const handleDeletePlaylist = () => {
        //  dispatch(deleteplaylist(state.selected_playlist));
        toast('Playlist Unfollowed');
    };

    return (
        <ContextProvider>
            <div data-testid="playlist-page">
                <div
                    style={{
                        backgroundImage: 'linear-gradient(-45deg, purple, #53025359)',

                        height: '300px',
                    }}
                ></div>
                {appContext.state.playlists.length === 0 ? (
                    <CircularProgress />
                ) : (
                    <Playlists
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
