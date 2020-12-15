import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { get_playlist, selected_playlist } from '../../app/state/app.actions';
import { useAppContext } from '../../app/state/app.store';
import Playlists from '../../components/Playlists/Playlists';
import TrackList from '../../components/TrackList/TrackList';
import { Playlist } from '../../models/playlist';
import * as actions from './state/myplaylists.actions';
import { useMyPlaylists } from './state/myplaylists.store';

// interface PlaylistPageProps {
//     appContext: AppContextType;
//     myPlaylistsContext: MyPlaylistsContextType;
// }

const PlaylistPage: React.FC = () => {
    const appContext = useAppContext();
    const { state, dispatch, ContextProvider } = useMyPlaylists();

    const [showsongs, setshowsongs] = useState(false);

    useEffect(() => {
        appContext.dispatch(get_playlist(appContext.state.userinfo.id));
    }, []);

    const handleOnClickPlaylist = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        appContext.dispatch(selected_playlist(e.currentTarget.id));

        const selectedPlaylist = appContext.state.playlists.filter(
            (playlist: Playlist) => playlist.id === e.currentTarget.id
        );

        dispatch(actions.get_playlist_tracks(e.currentTarget.id, selectedPlaylist[0].tracks.total));

        setshowsongs(true);
    };

    const handleRemoveFromPlaylist = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        await dispatch(actions.removefromplaylist(appContext.state.selected_playlist_id, e.currentTarget.id));
        toast('Removed From Playlist');

        const selectedPlaylist = appContext.state.playlists.filter(
            (playlist: Playlist) => playlist.id === appContext.state.selected_playlist_id
        );

        await dispatch(
            actions.get_playlist_tracks(appContext.state.selected_playlist_id, selectedPlaylist[0].tracks.total)
        );
    };

    const handleDeletePlaylist = () => {
        //  dispatch(deleteplaylist(state.selected_playlist));
        toast('Playlist Unfollowed');
    };

    const SearchContainer = styled.div`
        background-image: linear-gradient(-45deg, purple, #53025359);
        height: 300px;
    `;

    return (
        <ContextProvider>
            <div data-testid="playlist-page">
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
